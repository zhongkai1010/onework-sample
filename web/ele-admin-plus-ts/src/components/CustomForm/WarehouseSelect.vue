<template>
  <ele-tree-select
    v-model="value"
    :tree-props="{
      data: filteredTreeData,
      props: {
        label: 'name',
        value: 'id',
        children: 'children'
      }
    }"
    clearable
    placeholder="请选择仓库位置"
    @change="handleChange"
    v-bind="attrs"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, useAttrs, computed } from 'vue'
  import { getWarehouseTree } from '@/api/inventory/warehouse'
  import { toTree } from 'ele-admin-plus/es'
  import type { Warehouse } from '@/api/inventory/warehouse/model'

  const attrs = useAttrs()
  const value = ref<number | string>()
  const treeData = ref<Warehouse[]>([])

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | string | undefined): void
    (e: 'change', value: number | string | undefined): void
  }>()

  const props = defineProps<{
    modelValue?: number | string
    /** 仓库类型(0:全部,1:库房,2:展区) */
    type?: number
  }>()

  // 过滤后的树形数据
  const filteredTreeData = computed(() => {
    if (!props.type) {
      return treeData.value
    }
    return filterByType(treeData.value, props.type)
  })

  // 根据类型过滤数据
  const filterByType = (data: Warehouse[], type: number): Warehouse[] => {
    return data.filter((item) => {
      if (item.type === type) {
        if (item.children) {
          item.children = filterByType(item.children, type)
        }
        return true
      }
      return false
    })
  }

  // 加载仓库数据
  const loadWarehouses = async () => {
    try {
      const data = await getWarehouseTree()
      treeData.value = toTree({
        data,
        idField: 'id',
        parentIdField: 'parentId'
      })
    } catch (error) {
      console.error('Failed to load warehouses:', error)
    }
  }

  // 处理选择变化
  const handleChange = (val: number | string | undefined) => {
    emit('update:modelValue', val)
    emit('change', val)
  }

  // 监听外部值变化
  watch(
    () => props.modelValue,
    (val) => {
      value.value = val
    },
    { immediate: true }
  )

  // 组件挂载时加载数据
  onMounted(() => {
    loadWarehouses()
  })
</script>

<style scoped></style>
