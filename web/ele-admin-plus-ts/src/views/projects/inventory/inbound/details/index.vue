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
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="inboundDetailsTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 单据状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </ele-pro-table>
      <!-- 参考按钮 -->
      <reference-button
        title="入库单详情"
        :imageUrl="pageImage"
        searchText="入库单号 藏品编号 藏品名称 接收库房 入库日期 状态"
        tableFieldsText="入库单号 藏品编号 藏品名称 接收库房 入库日期 状态"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { InboundCollectionQueryParams } from '@/api/inventory/inbound/model'
  import { getInboundCollectionCatalog } from '@/api/inventory/inbound'
  import SearchForm from './components/search-form.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import dayjs from 'dayjs'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      prop: 'id',
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'warehouseNumber',
      label: '入库单号',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
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
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '接收库房',
      sortable: 'custom',

      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'storageDate',
      label: '入库日期',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      formatter: (row) => dayjs(row.storageDate).format('YYYY-MM-DD')
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 120,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getInboundCollectionCatalog({
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
  const reload = (where?: InboundCollectionQueryParams) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  /**
   * 获取状态类型
   */
  const getStatusType = (status?: number) => {
    switch (status) {
      case 0:
        return 'warning'
      case 1:
        return 'success'
      case 2:
        return 'info'
      default:
        return 'info'
    }
  }

  /**
   * 获取状态文本
   */
  const getStatusText = (status?: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已审核'
      case 2:
        return '已入库'
      default:
        return '未知'
    }
  }
</script>

<style lang="scss" scoped></style>
