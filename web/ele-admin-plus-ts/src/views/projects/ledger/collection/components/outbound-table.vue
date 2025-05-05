<!-- 出库记录弹框表格 -->
<template>
  <ele-modal v-model="show" title="出库记录" width="1000px" :destroy-on-close="true" @close="onClose">
    <ele-pro-table :columns="columns" :datasource="datasource" />
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { getOutboundList } from '@/api/collection/ledger'
  import type { DatasourceFunction, Columns } from 'ele-admin-plus/es/ele-pro-table/types'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  const props = defineProps<{
    modelValue: boolean
    row: CollectionLedger | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
  }>()

  // 显示状态
  const show = ref(false)

  // 监听显示状态
  watch(
    () => props.modelValue,
    (val) => {
      show.value = val
    }
  )

  // 监听显示状态变化
  watch(show, (val) => {
    emit('update:modelValue', val)
    if (!val) {
      emit('close')
    }
  })

  const columns: Columns = [
    { prop: 'outboundDate', label: '出库日期', width: 120 },
    { prop: 'outboundType', label: '出库类型', width: 120 },
    { prop: 'outboundPerson', label: '出库人员', width: 120 },
    { prop: 'outboundStatus', label: '出库状态', width: 120 },
    { prop: 'outboundPurpose', label: '出库用途' },
    { prop: 'outboundLocation', label: '出库位置', width: 150 },
    { prop: 'returnDate', label: '预计归还日期', width: 120 },
    { prop: 'remark', label: '备注', width: 150 }
  ]

  const datasource: DatasourceFunction = ({ pages }) => {
    if (!props.row?.id) return Promise.resolve({ list: [], total: 0 })
    return getOutboundList({
      collectionId: props.row.id,
      page: pages.page,
      limit: pages.limit
    })
  }

  const onClose = () => {
    show.value = false
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
