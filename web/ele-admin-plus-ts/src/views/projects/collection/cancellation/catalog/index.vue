<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <!-- 搜索表单 -->
      <search-form ref="searchRef" @search="reload" />

      <!-- 数据表格 -->
      <ele-pro-table ref="tableRef" row-key="id" :columns="columns" :datasource="datasource" :show-overflow-tooltip="true" :highlight-current-row="true" :style="{ paddingBottom: '16px' }" cache-key="cancellationCatalogTable" :tools="['reload', 'size', 'columns', 'maximized']" :stripe="true">
        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="light">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </ele-pro-table>
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getCancellationCatalog } from '@/api/collection/cancellation'
  import SearchForm from './components/search-form.vue'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 表格配置 ==================== */
  const columns = ref<Columns>([
    {
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'code',
      label: '注销单号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionName',
      label: '藏品名称',
      sortable: 'custom',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'cancellationTime',
      label: '注销日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true,
      slot: 'status'
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getCancellationCatalog({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* ==================== 方法 ==================== */
  // 重新加载表格数据
  const reload = () => {
    tableRef.value?.reload()
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
        return '待注销'
      case 1:
        return '已注销'
      case 2:
        return '已恢复'
      default:
        return '未知'
    }
  }
</script>

<style lang="scss" scoped></style>
