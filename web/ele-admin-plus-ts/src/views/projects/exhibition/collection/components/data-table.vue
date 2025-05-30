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
      <el-tag :type="row.collectionStatus === 1 ? 'success' : 'info'" effect="light">
        {{ row.collectionStatus === 1 ? '正常' : '异常' }}
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
    warehouseId: number | undefined
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
      prop: 'warehouseName',
      label: '展区名称',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      showOverflowTooltip: true
    }
  ])

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
