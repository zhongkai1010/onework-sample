<template>
  <ele-modal v-model="visible" title="选择藏品" width="1200px" :destroy-on-close="true">
    <el-form :inline="true" :model="form" @keyup.enter="search">
      <el-form-item label="藏品编号">
        <el-input v-model.number="form.collectionCode" placeholder="请输入藏品编号" clearable />
      </el-form-item>
      <el-form-item label="藏品名称">
        <el-input v-model.number="form.collectionName" placeholder="请输入藏品名称" clearable />
      </el-form-item>
      <el-form-item label="入库单号">
        <el-input v-model="form.warehouseNumber" placeholder="请输入入库单号" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <ele-pro-table
      ref="tableRef"
      :tools="false"
      :columns="columns"
      :datasource="datasource"
      :loading="loading"
      row-key="id"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    />

    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="confirmSelection" :disabled="!selectedRows.length"
        >确定</el-button
      >
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { EleProTable } from 'ele-admin-plus/es'
  import type {
    InboundCollection,
    InboundCollectionQueryParams
  } from '@/api/inventory/inbound/model'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getInboundCollectionList } from '@/api/inventory/inbound'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'confirm', collections: InboundCollection[]): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 表格实例
  const tableRef = ref<InstanceType<typeof EleProTable>>()

  // 加载状态
  const loading = ref(false)

  // 选中的行
  const selectedRows = ref<InboundCollection[]>([])

  // 表单数据
  const [form, resetFields] = useFormData<InboundCollectionQueryParams>({
    warehouseNumber: undefined,
    collectionCode: undefined,
    collectionName: undefined
  })

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
  const datasource: DatasourceFunction = ({ pages, where, orders }) => {
    return getInboundCollectionList({
      ...where,
      ...orders,
      ...pages,
      ...form
    })
  }

  // 搜索
  const search = () => {
    tableRef.value?.reload({ page: 1 })
  }

  // 重置
  const reset = () => {
    resetFields()
    search()
  }

  // 处理表格选中行变化
  const handleSelectionChange = (rows: InboundCollection[]) => {
    selectedRows.value = rows
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

  // 取消选择
  const handleCancel = () => {
    visible.value = false
  }

  // 确认选择
  const confirmSelection = () => {
    emit('confirm', selectedRows.value)
    visible.value = false
  }
</script>

<style lang="scss" scoped>
  :deep(.el-table__row) {
    cursor: pointer;
  }
</style>
