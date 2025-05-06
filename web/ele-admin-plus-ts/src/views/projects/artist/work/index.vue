<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <!-- 搜索表单 -->
      <search-form ref="searchRef" @search="reload" />
      <!-- 数据表格 -->
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selections"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="artistWorkTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd">
            新增
          </el-button>
          <el-button type="success" class="ele-btn-icon" :icon="Download" @click="handleExport">
            导出
          </el-button>
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" @click="handleEdit(row)" size="small">编辑</el-button>
            <el-button type="danger" @click="() => handleRemove([row])" size="small"
              >删除</el-button
            >
            <el-button type="info" @click="handleView(row)" size="small">查看详情</el-button>
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 艺术家作品编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />
      <!-- 艺术家作品详情弹窗 -->
      <work-details v-model="showDetails" :data="current" />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type {
    DatasourceFunction,
    Columns,
    ExportConfig
  } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined } from '@/components/icons'
  import { Download } from '@element-plus/icons-vue'
  import type { ArtistWork, ArtistWorkQueryParams } from '@/api/artist/work/model'
  import { getArtistWorkList, deleteArtistWork } from '@/api/artist/work'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import WorkDetails from './components/work-details.vue'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import request from '@/utils/request'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable> & { export: () => void }>()

  /* ==================== 状态管理 ==================== */
  const current = ref<ArtistWork | undefined>(undefined) // 当前编辑的艺术家作品
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const selections = ref<ArtistWork[]>([]) // 表格选中的行

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'workTitle',
      label: '作品名称',
      sortable: 'custom',

      showOverflowTooltip: true
    },
    {
      prop: 'artistName',
      label: '艺术家名称',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'creationYear',
      label: '创作年代',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'dimensions',
      label: '尺寸',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '材质',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'theme',
      label: '题材',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'framing',
      label: '装裱',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 220,
      align: 'center',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getArtistWorkList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getArtistWorkList({ ...where, ...orders, ...filters })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '艺术家作品数据',
    datasource: exportSource,
    beforeExport: (params) => {
      const { fileName, closeModal, bodyCols, bodyData, headerData } = params
      const workbook = getExportWorkbook(params)
      const sheet = workbook.getWorksheet('Sheet1')

      const getBuffer = async () => {
        // 添加图片列图片
        const imageColIndex = bodyCols.findIndex((c) => c.dataKey === 'workImage')
        if (sheet != null && imageColIndex !== -1) {
          const imageBuffers = await Promise.all(
            bodyData.map(async (row) => {
              const url = row[imageColIndex].text as string | undefined
              if (!url) {
                return
              }
              const res = await request({ url, responseType: 'arraybuffer' })
              return res.data
            })
          )
          imageBuffers.forEach((buffer, index) => {
            const rowIndex = index + headerData.length
            if (buffer != null) {
              const imgId = workbook.addImage({ buffer, extension: 'png' })
              sheet.addImage(imgId, {
                tl: { col: imageColIndex + 0.4, row: rowIndex + 0.2 },
                ext: { width: 48, height: 48 }
              })
              sheet.getCell(rowIndex + 1, imageColIndex + 1).value = ''
            }
            sheet.getRow(rowIndex + 1).height = 42
            sheet.getColumn(imageColIndex + 1).width = 8
          })
        }
        // 输出workbook
        const data = await workbook.xlsx.writeBuffer()
        return data
      }

      getBuffer().then((data) => {
        download(data, `${fileName}.xlsx`)
        closeModal()
      })
      return false
    }
  })

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: ArtistWorkQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加艺术家作品
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理编辑艺术家作品
   * @param row 艺术家作品数据
   */
  const handleEdit = (row: ArtistWork) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 处理删除艺术家作品
   * @param rows 要删除的艺术家作品数据，不传则删除选中的艺术家作品
   */
  const handleRemove = (rows?: ArtistWork[]) => {
    const data = rows || selections.value
    if (!data.length) {
      EleMessage.warning('请选择要删除的艺术家作品')
      return
    }

    const names = data.map((item) => item.workTitle).join('、')
    const count = data.length
    const message =
      count === 1
        ? `确定要删除作品"${names}"吗？`
        : `确定要删除选中的 ${count} 个作品吗？\n${names}`

    ElMessageBox.confirm(message, '系统提示', {
      type: 'warning',
      draggable: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '正在删除...',
          plain: true
        })
        deleteArtistWork(data.map((d) => d.id))
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            reload()
            // 清空选中项
            selections.value = []
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /**
   * 处理导出艺术家作品
   */
  const handleExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 处理查看艺术家作品详情
   * @param row 艺术家作品数据
   */
  const handleView = (row: ArtistWork) => {
    current.value = row
    showDetails.value = true
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: ArtistWorkQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
