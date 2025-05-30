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
        cache-key="outboundCatalogTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="light">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
        <template #outboundDate="{ row }">
          {{ formatDate(row.outboundDate) }}
        </template>
        <template #storageDate="{ row }">
          {{ formatDate(row.storageDate) }}
        </template>
      </ele-pro-table>
      <!-- 参考按钮 -->
      <reference-button
        title="出库编目"
        :imageUrl="pageImage"
        searchText="出库单号 出库日期 藏品编号 藏品名称 入库日期 状态"
        tableFieldsText="出库单号 出库日期 藏品编号 藏品名称 入库日期 状态"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getOutboundCatalog } from '@/api/inventory/outbound'
  import SearchForm from './components/search-form.vue'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 状态管理 ==================== */
  const selections = ref<any[]>([]) // 表格选中的行

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
      prop: 'id',
      label: '编号',
      width: 80,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'code',
      label: '出库单号',
      sortable: 'custom',

      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'outboundDate',
      label: '出库日期',
      sortable: 'custom',

      align: 'center',
      showOverflowTooltip: true,
      slot: 'outboundDate'
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',

      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'storageDate',
      label: '入库日期',
      sortable: 'custom',

      align: 'center',
      showOverflowTooltip: true,
      slot: 'storageDate'
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',

      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getOutboundCatalog({
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
  const reload = (where?: any) => {
    tableRef.value?.reload?.({ page: 1, where })
  }

  // 格式化日期
  const formatDate = (date: string | undefined) => {
    if (!date) return '-'
    return date.split('T')[0]
  }

  // 获取状态类型
  const getStatusType = (status: number) => {
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

  // 获取状态文本
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '未审核'
      case 1:
        return '待出库'
      case 2:
        return '已出库'
      case 3:
        return '已归库'
      default:
        return '未知'
    }
  }
</script>

<style lang="scss" scoped></style>
