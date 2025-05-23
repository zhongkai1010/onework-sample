<template>
  <search-form @search="reload" ref="searchFormRef" style="margin-bottom: -14px" />
  <ele-pro-table
    ref="tableRef"
    row-key="id"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    :highlight-current-row="true"
    :style="{ paddingBottom: '16px' }"
    cache-key="warehouseCollectionTable"
    :tools="['reload', 'size', 'columns', 'maximized']"
    :stripe="true"
    v-model:selections="selections"
    @row-click="handleRowClick"
  >
    <template #toolbar>
      <el-button
        type="primary"
        class="ele-btn-icon"
        :icon="PlusOutlined"
        @click="handleUpdateWarehouse"
        :disabled="!selections.length"
      >
        位置变更
      </el-button>
    </template>
    <template #status="{ row }">
      <el-tag :type="getStatusType(row.collectionStatus)" effect="light">
        {{ getStatusText(row.collectionStatus) }}
      </el-tag>
    </template>
    <template #operation="{ row }">
      <el-space :size="4">
        <el-button type="primary" @click="handleViewDetails(row)" size="small">查看详情</el-button>
      </el-space>
    </template>
  </ele-pro-table>

  <!-- 藏品详情弹窗 -->
  <collection-details v-model="showDetails" :data="currentDetails" />

  <!-- 位置变更弹窗 -->
  <update-warehouse v-model="showUpdateWarehouse" :data="selections" @done="reload" />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getWarehouseCollectionPage } from '@/api/inventory/warehouse'
  import type { WarehouseCollection } from '@/api/inventory/warehouse/model'
  import { PlusOutlined } from '@/components/icons'
  import SearchForm from './search-form.vue'
  import CollectionDetails from './collection-details.vue'
  import UpdateWarehouse from './update-warehouse.vue'
  import { EleMessage } from 'ele-admin-plus/es'

  /* Props 定义 */
  const props = defineProps<{
    /** 仓库ID */
    warehouseId: number
  }>()

  /* 组件引用 */
  const searchFormRef = ref<InstanceType<typeof SearchForm>>()
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* 状态管理 */
  const showDetails = ref(false)
  const currentDetails = ref<WarehouseCollection>()
  const showUpdateWarehouse = ref(false)
  const selections = ref<WarehouseCollection[]>([])

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
      prop: 'collectionStatus',
      label: '藏品状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      width: 220,
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '仓库位置',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '年代',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '单位',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '完残程度',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '完残状况',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'location',
      label: '存放位置',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'rfidCode',
      label: '地址码',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      columnKey: 'operation',
      label: '操作',
      width: 100,
      align: 'center',
      slot: 'operation',
      fixed: 'right'
    }
  ]

  /* 数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getWarehouseCollectionPage({
      ...where,
      ...orders,
      ...pages,
      warehouseId: props.warehouseId
    })
  }

  /* 表格操作 */
  /** 重新加载数据 */
  const reload = (where?: Record<string, any>) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /** 处理行点击 */
  const handleRowClick = (row: WarehouseCollection) => {
    const index = selections.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selections.value = [row]
    } else {
      selections.value = []
    }
    // 同步表格选中状态
    tableRef.value?.toggleRowSelection(row, index === -1)
  }

  /** 处理查看详情 */
  const handleViewDetails = (row: WarehouseCollection) => {
    currentDetails.value = row
    showDetails.value = true
  }

  /** 处理位置变更 */
  const handleUpdateWarehouse = () => {
    if (!selections.value.length) {
      EleMessage.error('请至少选择一条数据')
      return
    }
    showUpdateWarehouse.value = true
  }

  /** 重置 */
  const reset = () => {
    searchFormRef.value?.resetFields()
    reload()
  }

  /* 监听器 */
  watch(
    () => props.warehouseId,
    () => {
      searchFormRef.value?.resetFields()
      reload()
    }
  )

  /**
   * 获取状态类型
   */
  const getStatusType = (status: number): 'success' | 'warning' | 'danger' | 'info' | 'primary' => {
    const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      0: 'danger', // 未审核
      1: 'success', // 在藏
      2: 'warning', // 待出库
      3: 'danger', // 已出库
      4: 'warning', // 待拨库
      5: 'danger', // 修复中
      6: 'warning', // 待注销
      7: 'primary' // 已注销
    }
    return statusMap[status] || 'primary'
  }

  /**
   * 获取状态文本
   */
  const getStatusText = (status: number): string => {
    const statusMap: Record<number, string> = {
      0: '未审核',
      1: '在藏',
      2: '待出库',
      3: '已出库',
      4: '待拨库',
      5: '修复中',
      6: '待注销',
      7: '已注销'
    }
    return statusMap[status] || '其他'
  }

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
