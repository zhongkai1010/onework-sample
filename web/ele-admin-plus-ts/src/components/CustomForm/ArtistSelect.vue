<template>
  <ele-table-select
    ref="selectRef"
    v-model="value"
    clearable
    placeholder="请选择艺术家"
    value-key="name"
    label-key="name"
    :table-props="tableProps"
    :popper-width="660"
    :disabled="disabled"
    :cache-data="cacheData"
    :multiple="false"
    @select="handleSelect"
    v-bind="attrs"
  >
    <template #topExtra>
      <el-form :model="form" inline>
        <el-form-item label="名称" name="name">
          <el-input
            v-model="form.name"
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
  import type { TableSelectProps } from 'ele-admin-plus/es/ele-table-select/props'
  import type { Artist } from '@/api/artist/artist/model'
  import { getArtistList } from '@/api/artist/artist'
  type SelectTableProps = Exclude<TableSelectProps['tableProps'], undefined>

  const attrs = useAttrs()
  const value = ref<string>()
  const disabled = ref(false)
  const cacheData = ref<Partial<Artist>[]>()
  const selectRef = ref()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void
    (e: 'change', value: string | undefined): void
    (e: 'select', item: Artist): void
  }>()

  const props = defineProps<{
    modelValue?: string
  }>()

  const [form, resetFields] = useFormData({
    name: ''
  })

  const tableProps = reactive<SelectTableProps>({
    datasource: ({ pages, where, orders }) => {
      return getArtistList({ ...where, ...orders, ...pages })
    },
    columns: [
      {
        prop: 'id',
        label: '编号',
        sortable: 'custom',
        width: 100
      },
      {
        prop: 'name',
        label: '艺术家名称',
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

  const handleSelect = (item: Artist) => {
    emit('update:modelValue', item.name)
    emit('change', item.name)
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
      value.value = val === '' ? undefined : val
    },
    { immediate: true }
  )
</script>

<style scoped></style>
