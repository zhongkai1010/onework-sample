<template>
  <ele-modal
    v-model="modelValue"
    title="调拨记录"
    width="800px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <ele-pro-table :columns="columns" :datasource="datasource">
      <template #transferStatus="{ row }">
        <el-tag :type="getStatusType(row.transferStatus)">{{
          getStatusText(row.transferStatus)
        }}</el-tag>
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
  // 假设你有 getTransferList API
  import { getTransferList } from '@/api/collection/ledger'
  import { CollectionLedger } from '@/api/collection/ledger/model/index'

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
    { type: 'index', label: '序号', width: 60, align: 'center' },
    { prop: 'collectionCode', label: '藏品编号', minWidth: 120, showOverflowTooltip: true },
    { prop: 'collectionName', label: '藏品名称', minWidth: 120, showOverflowTooltip: true },
    { prop: 'transferDate', label: '调拨日期', minWidth: 120, showOverflowTooltip: true },
    { prop: 'transferType', label: '调拨类型', minWidth: 120, showOverflowTooltip: true },
    { prop: 'transferReason', label: '调拨原因', minWidth: 120, showOverflowTooltip: true },
    {
      prop: 'transferStatus',
      label: '调拨状态',
      minWidth: 120,
      showOverflowTooltip: true,
      slot: 'transferStatus'
    },
    { prop: 'transferPerson', label: '调拨人', minWidth: 120, showOverflowTooltip: true },
    { prop: 'transferNotes', label: '备注', minWidth: 120, showOverflowTooltip: true }
  ]

  const datasource: DatasourceFunction = ({ pages }) => {
    if (!props.row?.id) return Promise.resolve({ list: [], total: 0 })
    return getTransferList({
      collectionId: props.row.id,
      page: pages.page,
      limit: pages.limit
    })
  }

  // 获取状态类型
  const getStatusType = (status?: number) => {
    const statusMap: Record<number, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
      0: 'success', // 调拨中
      1: 'warning', // 已完成
      2: 'danger', // 已取消
      3: 'info', // 待审核
      4: 'primary' // 其他
    }
    return statusMap[status || 0] || 'primary'
  }

  // 获取状态文本
  const getStatusText = (status?: number) => {
    const statusMap: Record<number, string> = {
      0: '调拨中',
      1: '已完成',
      2: '已取消',
      3: '待审核',
      4: '其他'
    }
    return statusMap[status || 0] || '未知'
  }

  const onClose = () => {
    modelValue.value = false
  }
</script>

<style lang="scss" scoped></style>
