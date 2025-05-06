<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
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
        cache-key="publicationTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd"
            >新增</el-button
          >
          <el-button
            type="primary"
            class="ele-btn-icon"
            :icon="DownloadOutlined"
            @click="handleExport"
            >导出</el-button
          >
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="() => handleRemove()"
            :disabled="!selections.length"
            >删除</el-button
          >
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" @click="handleEdit(row)" size="small"> 编辑</el-button>
            <el-button type="info" @click="handleDetails(row)" size="small">查看详情</el-button>
            <el-button type="danger" @click="() => handleRemove([row])" size="small"
              >删除</el-button
            >
          </el-space>
        </template>
      </ele-pro-table>

      <!-- 出版著作编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 出版著作详情弹窗 -->
      <publication-details v-model="showDetails" :data="current" />
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
  import { PlusOutlined, DeleteOutlined, DownloadOutlined } from '@/components/icons'
  import type { Publication, PublicationQueryParams } from '@/api/artist/published-work/model'
  import { getPublicationList, deletePublication } from '@/api/artist/published-work'
  import { getExportWorkbook } from '@/config/use-global-config'
  import { download } from '@/utils/common'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import PublicationDetails from './components/publication-details.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable> & { export: () => void }>()

  /* ==================== 状态管理 ==================== */
  const current = ref<Publication | undefined>(undefined) // 当前编辑的出版著作
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const selections = ref<Publication[]>([]) // 表格选中的行

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
      prop: 'bookTitle',
      label: '著作标题',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'artistName',
      label: '作者',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'publisher',
      label: '出版社',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'publishDate',
      label: '出版日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'isbn',
      label: 'ISBN',
      sortable: 'custom',
      width: 150,
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
    return getPublicationList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 导出配置 ==================== */
  const exportConfig = reactive<ExportConfig>({
    fileName: '出版著作',
    datasource: ({ where, orders, filters }) => {
      return getPublicationList({ ...where, ...orders, ...filters })
    },
    beforeExport: (params) => {
      const { fileName, closeModal } = params
      const workbook = getExportWorkbook(params)

      const getBuffer = async () => {
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
  const reload = (where?: PublicationQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加出版著作
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理编辑出版著作
   * @param row 出版著作数据
   */
  const handleEdit = (row: Publication) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 处理导出出版著作
   */
  const handleExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 处理删除出版著作
   * @param rows 要删除的出版著作数据，不传则删除选中的出版著作
   */
  const handleRemove = (rows?: Publication[]) => {
    const data = rows || selections.value
    if (!data.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的出版著作吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deletePublication(data.map((d) => d.id))
          .then((msg) => {
            loading.close()
            EleMessage.success(msg)
            reload()
          })
          .catch((e) => {
            loading.close()
            EleMessage.error(e.message)
          })
      })
      .catch(() => {})
  }

  /**
   * 处理查看详情
   * @param row 出版著作数据
   */
  const handleDetails = (row: Publication) => {
    current.value = row
    showDetails.value = true
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: PublicationQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
