<template>
  <search-form @search="handleSearch" ref="searchFormRef" style="margin-bottom: -14px" />
  <ele-pro-table
    ref="tableRef"
    row-key="id"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    :highlight-current-row="true"
    :style="{ paddingBottom: '16px' }"
    cache-key="inventoryCheckDiscrepancyTable"
    :tools="['reload', 'size', 'columns', 'maximized']"
    :stripe="true"
    @row-click="handleRowClick"
    :pagination="false"
    @selection-change="handleSelectionChange"
  >
    <template #toolbar>
      <el-button
        type="primary"
        class="ele-btn-icon"
        :icon="PlusOutlined"
        @click="handleBatchUpdateDiscrepancy"
        :disabled="!selections.length"
      >
        填写盘点差异说明
      </el-button>
    </template>
    <template #status="{ row }">
      <el-tag :type="getStatusType(row.status)" effect="light">
        {{ getStatusText(row.status) }}
      </el-tag>
    </template>
    <template #imageInfo="{ row }">
      <img
        v-if="row.imageInfo"
        :src="row.imageInfo"
        style="width: 60px; height: 60px; object-fit: cover; cursor: pointer"
        @click.stop="openPreview(row.imageInfo)"
      />
      <div v-else>暂无数据</div>
    </template>
    <template #operation="{ row }">
      <el-space :size="4">
        <el-button type="primary" @click="() => handleUpdateDiscrepancy(row)" size="small"
          >填写情况</el-button
        >
        <el-button type="info" @click="() => handleViewDetails(row)" size="small"
          >查看详情</el-button
        >
      </el-space>
    </template>
  </ele-pro-table>

  <ele-image-viewer
    v-model="showImageViewer"
    :urlList="viewerImages"
    :initialIndex="viewerIndex"
    :infinite="false"
  />

  <!-- 藏品详情弹窗 -->
  <collection-details v-model="showDetailsModal" :data="currentRow" />

  <!-- 差异说明弹窗 -->
  <discrepancy-modal v-model="showDiscrepancyModal" :ids="selectedIds" @done="reload" />
</template>

<script lang="ts" setup>
  import { ref, watch, reactive, computed } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getInventoryCheckDiscrepancyList } from '@/api/inventory-check/discrepancy'
  import type { InventoryCheckDiscrepancy } from '@/api/inventory-check/discrepancy/model'
  import { PlusOutlined } from '@/components/icons'
  import SearchForm from './search-form.vue'
  import CollectionDetails from './collection-details.vue'
  import DiscrepancyModal from './discrepancy-modal.vue'

  import { EleMessage } from 'ele-admin-plus/es'

  /* Props 定义 */
  const props = defineProps<{
    /** 计划ID */
    planId: string
  }>()

  /* 组件引用 */
  const searchFormRef = ref<InstanceType<typeof SearchForm>>()
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* 状态管理 */
  const selections = ref<InventoryCheckDiscrepancy[]>([])
  const selectedIds = computed(() => selections.value.map((item) => item.id))
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)
  const showDetailsModal = ref(false)
  const showDiscrepancyModal = ref(false)
  const currentRow = ref<InventoryCheckDiscrepancy>()

  // 搜索参数
  const searchParams = reactive<Record<string, any>>({})

  /* 表格列配置 */
  const columns: Columns = [
    {
      type: 'selection',
      columnKey: 'selection',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'id',
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 180,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      width: 180,
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '存放位置',
      sortable: 'custom',
      width: 120,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'explanation',
      label: '差异说明',
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 100,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      columnKey: 'operation',
      label: '操作',
      width: 220,
      align: 'center',
      slot: 'operation',
      fixed: 'right'
    }
  ]

  /* 数据源 */
  const datasource: DatasourceFunction = ({ where, orders }) => {
    return getInventoryCheckDiscrepancyList({
      ...where,
      ...orders,
      ...searchParams,
      planId: props.planId === '0' ? undefined : Number(props.planId)
    })
  }

  /* 处理搜索 */
  const handleSearch = (params: Record<string, any>) => {
    Object.assign(searchParams, params)
    reload(params)
  }

  /* 表格操作 */
  /** 重新加载数据 */
  const reload = (where?: Record<string, any>) => {
    tableRef.value?.reload?.({ page: 1, where: where || { ...searchParams } })
  }

  /** 处理行点击 */
  const handleRowClick = (row: InventoryCheckDiscrepancy) => {
    // 点击行时只切换选中状态
    tableRef.value?.toggleRowSelection(row)
  }

  /** 处理选择变化 */
  const handleSelectionChange = (rows: InventoryCheckDiscrepancy[]) => {
    selections.value = rows
  }

  /** 处理批量补充差异说明 */
  const handleBatchUpdateDiscrepancy = () => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    showDiscrepancyModal.value = true
  }

  /** 处理查看详情 */
  const handleViewDetails = (row: InventoryCheckDiscrepancy) => {
    currentRow.value = row
    showDetailsModal.value = true
  }

  /** 重置 */
  const reset = () => {
    searchFormRef.value?.resetFields()
    Object.keys(searchParams).forEach((key) => (searchParams[key] = undefined))
    reload()
  }

  /* 监听器 */
  watch(
    () => props.planId,
    () => {
      reset()
    }
  )

  /**
   * 获取状态类型
   */
  const getStatusType = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'primary' => {
    const statusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      '0': 'info', // 未盘
      '1': 'success', // 已盘到
      '2': 'danger', // 已盘亏
      '3': 'warning' // 已盘盈
    }
    return statusMap[status] || 'primary'
  }

  /**
   * 获取状态文本
   */
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      '0': '未盘',
      '1': '已盘点',
      '2': '已盘亏',
      '3': '已盘盈'
    }
    return statusMap[status] || '其他'
  }

  /**
   * 处理图片预览
   * @param url 图片 URL
   */
  const openPreview = (url: string) => {
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
  }

  /** 处理填写情况 */
  const handleUpdateDiscrepancy = (row: InventoryCheckDiscrepancy) => {
    // 设置选中行
    selections.value = [row]
    // 显示差异说明弹窗
    showDiscrepancyModal.value = true
  }

  // 监听selections变化，确保selectedIds更新
  watch(
    selections,
    (val) => {
      if (val.length === 0) {
        tableRef.value?.clearSelection()
      }
    },
    { deep: true }
  )

  /* 暴露方法给父组件 */
  defineExpose({
    search: reload,
    reset
  })
</script>

<style lang="scss" scoped>
  :deep(.el-table__row) {
    cursor: pointer;
  }
</style>
