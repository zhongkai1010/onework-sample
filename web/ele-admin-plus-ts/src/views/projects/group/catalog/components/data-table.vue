<template>
  <search-form ref="searchRef" style="margin-bottom: -14px" @search="reload" />
  <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :style="{ paddingBottom: '16px' }" cache-key="groupCollectionTable" :tools="['reload', 'size', 'columns', 'maximized']" :stripe="true">
    <template #collectionStatus="{ row }">
      <el-tag :type="getStatusType(row.collectionStatus)" effect="light">
        {{ row.collectionStatus }}
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

  /* 表格列配置 */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center'
    },
    {
      prop: 'collectionStatus',
      label: '藏品状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'collectionStatus'
    },
    {
      prop: 'numberCategory',
      label: '编号类别',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'code',
      label: '藏品编号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom'
    },
    {
      prop: 'categoryName',
      label: '藏品类别',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'rfidCode',
      label: 'RFID编号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 80,
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '数量单位',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'era',
      label: '年代',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'artist',
      label: '艺术家',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'region',
      label: '地域',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'material',
      label: '质地',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'culturalRelicLevel',
      label: '文物级别',
      sortable: 'custom',
      width: 100,
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

  /* 工具函数 */
  const getStatusType = (status: string) => {
    switch (status) {
      case '待审核':
        return 'warning'
      case '已审核':
        return 'success'
      case '已退回':
        return 'danger'
      default:
        return 'info'
    }
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
