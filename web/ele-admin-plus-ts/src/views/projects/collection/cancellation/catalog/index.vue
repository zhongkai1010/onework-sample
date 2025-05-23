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
        cache-key="cancellationCatalogTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
      >
        <!-- 状态列 -->
        <template #status="{ row }">
          <el-tag :type="getStatusType(row.status)" effect="light">
            {{ getStatusText(row.status) }}
          </el-tag>
        </template>
      </ele-pro-table>
    </ele-card>
    <!-- 参考按钮 -->
    <reference-button
      title="注销编目"
      :imageUrl="pageImage"
      searchText="注销单号 藏品编号 藏品名称 注销日期"
      tableFieldsText="注销单号 藏品编号 藏品名称 注销日期 状态"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getCancellationCatalog } from '@/api/collection/cancellation'
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
  import SearchForm from './components/search-form.vue'
  import dayjs from 'dayjs'

  /* ==================== 组件引用 ==================== */
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  /* ==================== 表格配置 ==================== */
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
      prop: 'code',
      label: '注销单号',
      sortable: 'custom',

      showOverflowTooltip: true
    },
    {
      prop: 'collectionCode',
      label: '藏品编号',
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
      prop: 'cancellationTime',
      label: '注销日期',
      sortable: 'custom',

      align: 'center',
      showOverflowTooltip: true,
      formatter: (row) => {
        return row.cancellationTime ? dayjs(row.cancellationTime).format('YYYY-MM-DD') : ''
      }
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
