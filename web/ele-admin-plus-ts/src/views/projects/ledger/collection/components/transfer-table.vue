<template>
  <ele-modal
    v-model="modelValue"
    title="调拨记录"
    width="1200px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <ele-pro-table :columns="columns" :datasource="datasource" class="transfer-table">
      <template #status="{ row }">
        <el-tag :type="getStatusType(row.status)">{{ getStatusText(row.status) }}</el-tag>
      </template>
    </ele-pro-table>
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { watch } from 'vue'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import { getCollectionTransferList } from '@/api/collection/ledger'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  const props = defineProps<{
    row: CollectionLedger | null
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 监听显示状态变化
  watch(modelValue, (val) => {
    if (!val) {
      onClose()
    }
  })

  const columns: Columns = [
    { prop: 'id', label: '编号', width: 80, align: 'center' },
    { prop: 'code', label: '调拨单号', width: 180 },
    { prop: 'collectionCode', label: '藏品编号', width: 180 },
    { prop: 'collectionName', label: '藏品名称', width: 180 },
    { prop: 'originalWarehouse', label: '原仓库', width: 180 },
    { prop: 'currentWarehouse', label: '现仓库', width: 180 },
    {
      prop: 'status',
      label: '状态',
      width: 120,
      align: 'center',
      slot: 'status'
    }
  ]

  const datasource: DatasourceFunction = ({ pages }) => {
    if (!props.row?.id) return Promise.resolve({ list: [], total: 0 })
    return getCollectionTransferList({
      collectionId: props.row.id,
      page: pages.page,
      limit: pages.limit
    })
  }

  // 获取状态类型
  const getStatusType = (status?: number) => {
    const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info'> = {
      0: 'info', // 待审核
      1: 'success' // 已拨库
    }
    return statusMap[status || 0] || 'info'
  }

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap: Record<number, string> = {
      0: '待审核',
      1: '已拨库'
    }
    return statusMap[status || 0] || '未知'
  }

  const onClose = () => {
    modelValue.value = false
  }
</script>

<style lang="scss" scoped>
  .transfer-table {
    :deep(.el-table) {
      min-height: 600px;
    }
  }
</style>
