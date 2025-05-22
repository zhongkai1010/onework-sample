<template>
  <ele-table-select
    ref="selectRef"
    v-model="value"
    clearable
    placeholder="请选择藏品"
    value-key="id"
    label-key="collectionName"
    :table-props="tableProps"
    :popper-width="680"
    :disabled="disabled"
    :cache-data="cacheData"
    @select="handleSelect"
    :popper-options="{ strategy: 'fixed' }"
    v-bind="attrs"
  >
    <template #topExtra>
      <el-form :model="form" inline>
        <el-form-item label="编号" name="collectionCode">
          <el-input
            v-model="form.collectionCode"
            placeholder="请输入编号"
            style="width: 120px"
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="名称" name="collectionName">
          <el-input
            v-model="form.collectionName"
            placeholder="请输入名称"
            clearable
            style="width: 120px"
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
  </ele-table-select>
</template>

<script setup lang="ts">
  import { ref, reactive, useAttrs, watch } from 'vue'
  import { useFormData } from '@/utils/use-form-data'
  import { getLedgerList } from '@/api/collection/ledger'
  import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  type SelectTableProps = Exclude<TableSelectProps['tableProps'], undefined>

  const attrs = useAttrs()
  const value = ref<number>()
  const disabled = ref(false)
  const cacheData = ref<Partial<CollectionLedger>[]>()
  const selectRef = ref()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | undefined): void
    (e: 'change', value: number | undefined): void
    (e: 'select', item: CollectionLedger): void
  }>()

  const props = defineProps<{
    modelValue?: number
  }>()

  const [form, resetFields] = useFormData({
    collectionCode: '',
    collectionName: ''
  })

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
        sortable: 'custom'
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

  const handleSelect = (item: CollectionLedger) => {
    emit('update:modelValue', item.id)
    emit('change', item.id)
    emit('select', item)
  }

  const handleSearch = () => {
    selectRef.value?.tableRef.reload?.({
      page: 1,
      where: { ...form }
    })
  }
  const handleReset = () => {
    resetFields()
    handleSearch()
  }

  watch(
    () => props.modelValue,
    (val) => {
      value.value = val === 0 ? undefined : val
    },
    { immediate: true }
  )
</script>

<style scoped></style>
