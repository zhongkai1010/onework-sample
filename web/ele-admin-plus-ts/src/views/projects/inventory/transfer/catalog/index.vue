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
        cache-key="transferCatalogTable"
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
      <!-- 参考按钮 -->
      <reference-button
        title="拨库编目"
        :imageUrl="pageImage"
        searchText="拨库单号 拨库日期 藏品编号 藏品名称 原仓库 现仓库 状态"
        tableFieldsText="拨库单号 拨库日期 藏品编号 藏品名称 原仓库 现仓库 状态"
      />
    </ele-card>
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getTransferCatalog } from '@/api/inventory/transfer'
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
      type: 'index',
      columnKey: 'index',
      width: 50,
      align: 'center',
      fixed: 'left'
    },
    {
      prop: 'code',
      label: '拨库单号',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'transferDate',
      label: '拨库日期',
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
      showOverflowTooltip: true
    },
    {
      prop: 'originalWarehouse',
      label: '原仓库',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'currentWarehouse',
      label: '现仓库',
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
    return getTransferCatalog({
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
      default:
        return 'info'
    }
  }

  // 获取状态文本
  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return '待审核'
      case 1:
        return '已拨库'
      default:
        return '未知'
    }
  }
</script>

<style lang="scss" scoped></style>
