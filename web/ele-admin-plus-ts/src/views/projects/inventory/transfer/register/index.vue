<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      <ele-pro-table
        ref="tableRef"
        :columns="columns"
        :datasource="datasource"
        :loading="loading"
        :pagination="false"
        row-key="id"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <template #toolbar>
          <el-button type="primary" @click="openSelectionDialog">选择调拨藏品</el-button>
          <el-button @click="cancelSelection" :disabled="!selectedCollections.length"
            >取消选择</el-button
          >
          <el-button
            type="success"
            @click="openConfirmDialog"
            :disabled="!selectedCollections.length"
            >确认选择</el-button
          >
          <el-button type="danger" @click="removeSelected" :disabled="!selectedRows.length"
            >删除选中</el-button
          >
        </template>
      </ele-pro-table>
    </ele-card>

    <!-- 选择藏品弹框 -->
    <selection-collection
      ref="selectionRef"
      v-model="selectionDialogVisible"
      @confirm="handleSelectionConfirm"
    />

    <!-- 确认选择弹框 -->
    <confirm-selection
      ref="confirmRef"
      v-model="confirmDialogVisible"
      @success="handleConfirmSuccess"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus/es'
  import type { InboundCollection } from '@/api/inventory/inbound/model'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import SelectionCollection from './components/selection-collection.vue'
  import ConfirmSelection from './components/confirm-selection.vue'

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 选择弹框实例
  const selectionRef = ref<InstanceType<typeof SelectionCollection>>()

  // 确认弹框实例
  const confirmRef = ref<InstanceType<typeof ConfirmSelection>>()

  // 加载状态
  const loading = ref(false)

  // 选中的藏品列表
  const selectedCollections = ref<InboundCollection[]>([])

  // 表格选中的行
  const selectedRows = ref<InboundCollection[]>([])

  // 选择藏品弹框显示状态
  const selectionDialogVisible = ref(false)

  // 确认选择弹框显示状态
  const confirmDialogVisible = ref(false)

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
      fixed: 'left'
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
      prop: 'warehouseName',
      label: '库房名称',
      sortable: 'custom',
      width: 120,
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
      prop: 'materialType',
      label: '质地类型',
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
      prop: 'quantity',
      label: '数量',
      sortable: 'custom',
      width: 80,
      showOverflowTooltip: true
    },
    {
      prop: 'unit',
      label: '单位',
      sortable: 'custom',
      width: 80,
      showOverflowTooltip: true
    },
    {
      prop: 'specificDimensions',
      label: '具体尺寸',
      sortable: 'custom',
      width: 120,
      showOverflowTooltip: true
    },
    {
      prop: 'condition',
      label: '完残程度',
      sortable: 'custom',
      width: 100,
      showOverflowTooltip: true
    }
  ])

  /* ==================== 数据源 ==================== */
  const datasource: DatasourceFunction = () => {
    return Promise.resolve({
      list: selectedCollections.value
    })
  }

  // 打开选择藏品弹框
  const openSelectionDialog = () => {
    selectionDialogVisible.value = true
  }

  // 取消选择
  const cancelSelection = () => {
    // 清空选中状态
    selectedRows.value = []
    // 取消所有行的选中状态
    selectedCollections.value.forEach((row) => {
      tableRef.value?.toggleRowSelection?.(row, false)
    })
  }

  // 打开确认选择弹框
  const openConfirmDialog = () => {
    confirmDialogVisible.value = true
    // 设置选中的藏品
    confirmRef.value?.setSelectedCollections(selectedCollections.value)
  }

  // 删除选中的藏品
  const removeSelected = () => {
    const ids = selectedRows.value.map((item) => item.id)
    selectedCollections.value = selectedCollections.value.filter((item) => !ids.includes(item.id))
    selectedRows.value = []
    tableRef.value?.reload()
  }

  // 处理表格选中行变化
  const handleSelectionChange = (rows: InboundCollection[]) => {
    selectedRows.value = rows
  }

  // 处理选择藏品确认
  const handleSelectionConfirm = (collections: InboundCollection[]) => {
    // 将新选择的藏品添加到已选列表中
    const newCollections = collections.filter(
      (collection) => !selectedCollections.value.some((item) => item.id === collection.id)
    )
    selectedCollections.value = [...selectedCollections.value, ...newCollections]
    selectionDialogVisible.value = false
    // 手动刷新表格数据
    tableRef.value?.reload()
    console.log('111111', selectedCollections.value)
  }

  // 处理行点击事件
  const handleRowClick = (row: InboundCollection) => {
    const index = selectedRows.value.findIndex((item) => item.id === row.id)
    if (index === -1) {
      selectedRows.value.push(row)
    } else {
      selectedRows.value.splice(index, 1)
    }
    tableRef.value?.toggleRowSelection?.(row, index === -1)
  }

  // 处理确认成功
  const handleConfirmSuccess = () => {
    // 清空选择
    selectedCollections.value = []
    selectedRows.value = []
    tableRef.value?.reload()
  }
</script>

<style lang="scss" scoped>
  :deep(.el-table__row) {
    cursor: pointer;
  }
</style>
