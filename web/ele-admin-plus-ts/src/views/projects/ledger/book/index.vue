<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
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
        <template #status="{ row }">
          <el-tag :type="getStatusType(getStatusText(row.status))">
            {{ getStatusText(row.status) }}
          </el-tag>
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

    <!-- 参考按钮 -->
    <reference-button
      title="图书台账"
      :imageUrl="pageImage"
      searchText="藏品状态 编号类别 藏品编号 RFID编号 藏品名称 藏品分类 作者 藏品来源 图书价值 保存状态 征集日期 入藏年度 备注 地址码 所属库房"
      operationText="退回编目 导出数据"
      tableFieldsText="藏品状态 编号类别 藏品编号 RFID编号 藏品名称 藏品分类 作者 藏品来源 图书价值 保存状态 征集日期 入藏年度 备注 地址码 所属库房 操作"
      tableOperationsText="查看详情"
    />
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
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

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
      width: 100,
      align: 'center',
      fixed: 'left',
      label: '编号'
    },
    {
      prop: 'status',
      label: '藏品状态',
      sortable: 'custom',
      width: 220,
      align: 'center',
      showOverflowTooltip: true,
      slot: 'status'
    },
    {
      prop: 'numberCategory',
      label: '编号类别',
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
      prop: 'rfidCode',
      label: 'RFID编号',
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
      prop: 'author',
      label: '作者',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionSource',
      label: '藏品来源',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'bookValue',
      label: '图书价值',
      sortable: 'custom',
      width: 220,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'preservationStatus',
      label: '保存状态',
      sortable: 'custom',
      width: 220,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionDate',
      label: '征集日期',
      sortable: 'custom',
      width: 220,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'collectionYear',
      label: '入藏年度',
      sortable: 'custom',
      width: 220,
      align: 'center',
      showOverflowTooltip: true
    },
    {
      prop: 'notes',
      label: '备注',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseCode',
      label: '地址码',
      sortable: 'custom',
      width: 220,
      align: 'left',
      showOverflowTooltip: true
    },
    {
      prop: 'warehouseName',
      label: '所属库房',
      sortable: 'custom',
      width: 220,
      align: 'left',
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
   * 获取状态文本
   */
  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return '未审核'
      case 1:
        return '在藏'
      case 2:
        return '修复中'
      case 3:
        return '出库中'
      case 4:
        return '已注销'
      default:
        return '未知状态'
    }
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
