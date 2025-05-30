<template>
  <search-form ref="searchRef" @search="reload" />
  <ele-pro-table
    ref="tableRef"
    row-key="id"
    :columns="columns"
    :datasource="datasource"
    :show-overflow-tooltip="true"
    cache-key="groupCollectionTable"
    :tools="['reload', 'size', 'columns', 'maximized']"
    :stripe="true"
  >
    <template #status="{ row }">
      <el-tag :type="getStatusType(row.collectionStatus)" effect="light">
        {{ getStatusText(row.collectionStatus) }}
      </el-tag>
    </template>
  </ele-pro-table>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import SearchForm from './search-form.vue'
  import { getGroupCollections } from '@/api/data/group'

  /* Props 定义 */
  const props = defineProps<{
    /** 分组 id */
    groupId?: number
  }>()

  /* 组件引用 */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

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

  /* 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 80,
      align: 'center',
      fixed: 'left',
      label: '编号'
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
      prop: 'code',
      label: '藏品编号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      width: 220,
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
    }
  ])

  /* 数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getGroupCollections({
      ...where,
      ...orders,
      ...pages,
      groupId: props.groupId
    })
  }

  /* 表格操作 */
  const reload = (where?: Record<string, any>) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /* 监听器 */
  watch(
    () => props.groupId,
    () => {
      searchRef.value?.resetFields?.()
      reload()
    }
  )
</script>
