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
            @click="handleBatchRemove"
            :disabled="!selections.length"
            >删除</el-button
          >
        </template>

        <!-- 操作列 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="primary" @click="handleEdit(row)" size="small"> 编辑</el-button>
            <el-button type="info" @click="handleDetails(row)" size="small">查看详情</el-button>
            <el-button type="danger" @click="handleSingleRemove(row)" size="small">删除</el-button>
          </el-space>
        </template>

        <!-- 封面图片列 -->
        <template #coverImage="{ row }">
          <img
            v-if="row.coverImage"
            :src="row.coverImage"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.coverImage)"
          />
          <div v-else style="color: #909399; font-size: 14px">暂无图片</div>
        </template>
      </ele-pro-table>

      <!-- 出版著作编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 出版著作详情弹窗 -->
      <publication-details v-model="showDetails" :data="current" />

      <!-- 图片预览 -->
      <ele-image-viewer
        v-model="showImageViewer"
        :urlList="viewerImages"
        :initialIndex="viewerIndex"
        :infinite="false"
      />
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
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

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
      width: 80,
      align: 'center',
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'bookTitle',
      label: '出版物题名',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'isbn',
      label: 'ISBN',
      sortable: 'custom',
      showOverflowTooltip: true,
      width: 180
    },
    {
      prop: 'artistName',
      label: '艺术家名称',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },

    {
      prop: 'publisher',
      label: '出版社',
      sortable: 'custom',
      width: 220,
      showOverflowTooltip: true
    },
    {
      prop: 'format',
      label: '开本',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'author',
      label: '编著',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'edition',
      label: '印次',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'coverImage',
      label: '出版物封面',
      width: 100,
      align: 'center',
      slot: 'coverImage'
    },
    {
      prop: 'price',
      label: '定价',
      width: 100,
      align: 'center',
      slot: 'price'
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
   * 处理批量删除出版著作
   */
  const handleBatchRemove = () => {
    if (!selections.value.length) {
      EleMessage.error('请选择要删除的著作')
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
        deletePublication(selections.value.map((d) => d.id))
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
   * 处理单个删除出版著作
   * @param row 要删除的出版著作数据
   */
  const handleSingleRemove = (row: Publication) => {
    ElMessageBox.confirm('确定要删除该出版著作吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deletePublication([row.id])
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

  /**
   * 打开图片预览
   * @param image 图片URL
   */
  const openPreview = (image: string) => {
    viewerImages.value = [image]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  /* ==================== 暴露方法 ==================== */
  defineExpose({
    reload: (where?: PublicationQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped>
  .cover-image-cell {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;

    .cover-image {
      width: 80px;
      height: 112px;
      object-fit: cover;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .no-image {
      color: #909399;
      font-size: 14px;
    }
  }
</style>
