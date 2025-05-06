<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <search-form ref="searchRef" @search="reload" />
      <ele-pro-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :datasource="datasource"
        :show-overflow-tooltip="true"
        v-model:selections="selectedRows"
        :highlight-current-row="true"
        :style="{ paddingBottom: '16px' }"
        cache-key="bookLedgerTable"
        :tools="['reload', 'size', 'columns', 'maximized']"
        :stripe="true"
        :export-config="exportConfig"
        @row-click="onRowClick"
      >
        <template #toolbar>
          <el-button
            type="danger"
            class="ele-btn-icon"
            @click="onReturn"
            :disabled="!selectedRows.length"
            >退回编目</el-button
          >
          <el-button type="success" class="ele-btn-icon" @click="onExport">导出数据</el-button>
        </template>
        <!-- 状态列 -->
        <template #collectionStatus="{ row }">
          <el-tag :type="getStatusType(row.collectionStatus)">{{ row.collectionStatus }}</el-tag>
        </template>
        <!-- 操作列按钮 -->
        <template #action="{ row }">
          <el-space :size="4">
            <el-button type="info" size="small" @click="onViewDetails(row)">查看详情</el-button>
          </el-space>
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 详情弹窗 -->
    <book-details v-model="showDetails" :row="currentRow" @close="showDetails = false" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import BookDetails from './components/book-details.vue'
  import SearchForm from './components/search-form.vue'
  import { getBooksLedgerList, returnBooks } from '@/api/collection/ledger'
  import type { BooksLedger } from '@/api/collection/ledger/model/index'
  import { ElMessage } from 'element-plus'
  import { EleProTable } from 'ele-admin-plus'
  import type {
    DatasourceFunction,
    ExportConfig,
    Columns
  } from 'ele-admin-plus/es/ele-pro-table/types'

  // 组件引用
  const searchRef = ref<InstanceType<typeof SearchForm> | null>(null)
  const tableRef = ref()

  // 表格数据
  const selectedRows = ref<BooksLedger[]>([])
  const currentRow = ref<BooksLedger | null>(null)

  // 弹框显示状态
  const showDetails = ref(false)

  // 表格列配置
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
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'collectionStatus',
      label: '藏品状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'numberCategory',
      label: '编号类别',
      sortable: 'custom',
      width: 100,
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
      prop: 'rfidCode',
      label: 'RFID编号',
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
      prop: 'categoryName',
      label: '藏品分类',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'author',
      label: '作者',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionSource',
      label: '藏品来源',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'bookValue',
      label: '图书价值',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '保存状态',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDate',
      label: '征集日期',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'collectionYear',
      label: '入藏年度',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'notes',
      label: '备注',
      sortable: 'custom',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseCode',
      label: '地址码',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '所属库房',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      columnKey: 'action',
      label: '操作',
      width: 100,
      align: 'left',
      slot: 'action',
      fixed: 'right'
    }
  ])

  /* 数据源 */
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getBooksLedgerList({
      ...where,
      ...orders,
      ...pages
    })
  }

  /* 导出和打印全部数据的数据源 */
  const exportSource: DatasourceFunction = ({ where, orders, filters }) => {
    return getBooksLedgerList({ ...where, ...orders, ...filters })
  }

  /* 导出配置 */
  const exportConfig = reactive<ExportConfig>({
    fileName: '图书台账数据',
    datasource: exportSource
  })

  /**
   * 表格行点击事件
   */
  const onRowClick = (row: BooksLedger) => {
    const index = selectedRows.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selectedRows.value = [row]
    } else {
      selectedRows.value = []
    }
    currentRow.value = row
  }

  /**
   * 获取状态类型
   */
  const getStatusType = (status: string): 'success' | 'warning' | 'danger' | 'info' | 'primary' => {
    const statusMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      在库: 'success',
      出库: 'warning',
      修复中: 'danger',
      调拨中: 'info',
      已注销: 'primary',
      其他: 'primary'
    }
    return statusMap[status] || 'primary'
  }

  /**
   * 退回编目
   */
  const onReturn = async () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要退回的图书')
      return
    }
    try {
      await returnBooks({
        collectionIds: selectedRows.value.map((row) => Number(row.id))
      })
      ElMessage.success('退回成功')
      tableRef.value?.reload()
    } catch (error) {
      console.error('退回编目失败:', error)
    }
  }

  /**
   * 导出数据
   */
  const onExport = () => {
    tableRef.value?.openExportModal?.()
  }

  /**
   * 查看详情
   */
  const onViewDetails = (row: BooksLedger) => {
    currentRow.value = row
    showDetails.value = true
  }

  /**
   * 重新加载表格数据
   */
  const reload = (where?: any) => {
    tableRef.value?.reload?.({ page: 1, where })
  }
</script>

<style lang="scss" scoped></style>
