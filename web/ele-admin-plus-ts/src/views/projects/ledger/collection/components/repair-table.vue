<!-- 修复记录弹框表格 -->
<template>
  <ele-modal v-model="modelValue" title="修复记录" width="1000px" :destroy-on-close="true" @close="onClose">
    <ele-pro-table :columns="columns" :datasource="datasource" />
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { watch } from 'vue'
  import { getRepairList } from '@/api/collection/ledger'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
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
    { prop: 'repairDate', label: '修复日期', width: 120 },
    { prop: 'repairType', label: '修复类型', width: 120 },
    { prop: 'repairPerson', label: '修复人员', width: 120 },
    { prop: 'repairStatus', label: '修复状态', width: 120 },
    { prop: 'repairDescription', label: '修复描述' },
    { prop: 'repairResult', label: '修复结果' },
    { prop: 'remark', label: '备注', width: 150 }
  ]

  const datasource: DatasourceFunction = ({ pages }) => {
    if (!props.row?.id) return Promise.resolve({ list: [], total: 0 })
    return getRepairList({
      collectionId: props.row.id,
      page: pages.page,
      limit: pages.limit
    })
  }

  const onClose = () => {
    modelValue.value = false
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
