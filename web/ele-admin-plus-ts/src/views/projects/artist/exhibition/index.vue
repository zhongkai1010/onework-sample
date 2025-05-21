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
        cache-key="exhibitionTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 工具栏按钮 -->
        <template #toolbar>
          <el-button type="primary" class="ele-btn-icon" :icon="PlusOutlined" @click="handleAdd">
            添加
          </el-button>
          <el-button
            type="danger"
            class="ele-btn-icon"
            :icon="DeleteOutlined"
            @click="() => handleRemove()"
            :disabled="!selections.length"
          >
            删除
          </el-button>
        </template>

        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="row.status === '正常' ? 'success' : 'danger'" effect="light">
            {{ row.status }}
          </el-tag>
        </template>

        <!-- 封面列 -->
        <template #cover="{ row }">
          <img
            v-if="row.coverImage"
            :src="row.coverImage"
            style="width: 100%; height: 100%; object-fit: cover; cursor: pointer"
            @click="openPreview(row.coverImage)"
          />
          <div v-else>暂无数据</div>
        </template>

        <!-- 图片信息列 -->
        <template #imageInfo="{ row }">
          <img
            v-if="row.imageInfo"
            :src="row.imageInfo"
            style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
            @click="openPreview(row.imageInfo)"
          />
          <div v-else> 暂无数据 </div>
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

      <!-- 展览编辑弹窗 -->
      <form-edit v-model="showEdit" :data="current" @done="reload" />

      <!-- 展览详情弹窗 -->
      <exhibition-details v-model="showDetails" :id="current?.id" />

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
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus/es'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { PlusOutlined, DeleteOutlined } from '@/components/icons'
  import type { Exhibition, ExhibitionQueryParams } from '@/api/artist/exhibition/model'
  import { getExhibitionList, deleteExhibition } from '@/api/artist/exhibition'
  import SearchForm from './components/search-form.vue'
  import FormEdit from './components/form-edit.vue'
  import ExhibitionDetails from './components/exhibition-details.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const current = ref<Exhibition | undefined>(undefined) // 当前编辑的展览
  const showEdit = ref(false) // 是否显示编辑弹窗
  const showDetails = ref(false) // 是否显示详情弹窗
  const selections = ref<Exhibition[]>([]) // 表格选中的行
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
      prop: 'coverImage',
      label: '封面',
      width: 100,
      align: 'center',
      slot: 'cover'
    },
    {
      prop: 'exhibitionTitle',
      label: '展览标题',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'exhibitionInstitution',
      label: '展览机构',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'exhibitionCity',
      label: '展览城市',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'exhibitionAddress',
      label: '展览地址',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'exhibitionStartDate',
      label: '开始日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'exhibitionEndDate',
      label: '结束日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'imageInfo',
      label: '图片信息',
      width: 80,
      align: 'center',
      slot: 'imageInfo'
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
    return getExhibitionList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 表格操作 ==================== */
  /**
   * 重新加载表格数据
   * @param where 查询条件
   */
  const reload = (where?: ExhibitionQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 处理添加展览
   */
  const handleAdd = () => {
    current.value = undefined
    showEdit.value = true
  }

  /**
   * 处理编辑展览
   * @param row 展览数据
   */
  const handleEdit = (row: Exhibition) => {
    current.value = row
    showEdit.value = true
  }

  /**
   * 处理删除展览
   * @param rows 要删除的展览数据，不传则删除选中的展览
   */
  const handleRemove = (rows?: Exhibition[]) => {
    const data = rows || selections.value
    if (!data.length) {
      return
    }
    ElMessageBox.confirm('确定要删除选中的展览吗？', '系统提示', {
      type: 'warning',
      draggable: true
    })
      .then(() => {
        const loading = EleMessage.loading({
          message: '请求中..',
          plain: true
        })
        deleteExhibition(data.map((d) => parseInt(d.id)))
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
   * 处理查看展览详情
   * @param row 展览数据
   */
  const handleView = (row: Exhibition) => {
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
    reload: (where?: ExhibitionQueryParams) => {
      tableRef.value?.reload?.({ page: 1, where })
    },
    selections
  })
</script>

<style lang="scss" scoped></style>
