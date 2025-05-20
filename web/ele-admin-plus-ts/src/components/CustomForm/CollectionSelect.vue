<template>
  <ele-table-select
    v-model="value"
    clearable
    placeholder="请选择藏品"
    value-key="id"
    label-key="collectionName"
    :table-props="tableProps"
    :popper-width="400"
    :disabled="disabled"
    :cache-data="cacheData"
    @select="handleSelect"
    :popper-options="{ strategy: 'fixed' }"
    v-bind="attrs"
  />
</template>

<script setup lang="ts">
  import { ref, reactive, useAttrs, watch } from 'vue'
  import { getLedgerList } from '@/api/collection/ledger'
  import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  type SelectTableProps = Exclude<TableSelectProps['tableProps'], undefined>

  const attrs = useAttrs()
  const value = ref<number>()
  const disabled = ref(false)
  const cacheData = ref<Partial<CollectionLedger>[]>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | undefined): void
    (e: 'change', value: number | undefined): void
    (e: 'select', item: CollectionLedger): void
  }>()

  const props = defineProps<{
    modelValue?: number
  }>()

  /** 表格配置 */
  const tableProps = reactive<SelectTableProps>({
    datasource: ({ pages, where, orders }) => {
      return getLedgerList({ ...where, ...orders, ...pages })
    },
    columns: [
      {
        prop: 'id',
        label: '编号',
        sortable: 'custom',
        width: 100
      },
      {
        prop: 'code',
        label: '藏品编号',
        sortable: 'custom',
        width: 120
      },
      {
        prop: 'collectionName',
        label: '藏品名称',
        sortable: 'custom',
        width: 180
      }
    ],
    showOverflowTooltip: true,
    highlightCurrentRow: true,
    toolbar: false,
    pagination: {
      pageSize: 6,
      layout: 'total, prev, pager, next, jumper',
      style: { padding: '0px' }
    },
    rowStyle: { cursor: 'pointer' }
  })

  /** 选中事件 */
  const handleSelect = (item: CollectionLedger) => {
    emit('update:modelValue', item.id)
    emit('change', item.id)
    emit('select', item)
  }

  // 监听外部值变化
  watch(
    () => props.modelValue,
    (val) => {
      value.value = val
    },
    { immediate: true }
  )
</script>

<style scoped></style>
