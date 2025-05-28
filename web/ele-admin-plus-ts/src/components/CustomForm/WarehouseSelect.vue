<template>
  <ele-tree-select
    v-model="value"
    filterable
    :tree-props="{
      data: treeData,
      props: {
        label: 'name',
        value: 'id',
        children: 'children'
      }
    }"
    :popper-options="{
      modifiers: [
        {
          name: 'matchWidth',
          enabled: true,
          fn: ({ state }) => {
            state.styles.popper.width = `${state.rects.reference.width}px`
          },
          phase: 'beforeWrite',
          requires: ['computeStyles']
        }
      ]
    }"
    clearable
    placeholder="请选择仓库位置"
    @change="handleChange"
    v-bind="attrs"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, useAttrs } from 'vue'
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

  // 加载仓库数据
  const loadWarehouses = async () => {
    try {
      const data = await getWarehouseTree({ type: props.type })
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
    const newValue = val === 0 ? undefined : val
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }

  // 监听外部值变化
  watch(
    () => props.modelValue,
    (val) => {
      value.value = val === 0 ? undefined : val
    },
    { immediate: true }
  )

  // 监听type变化，重新加载数据
  watch(
    () => props.type,
    () => {
      loadWarehouses()
    }
  )

  // 组件挂载时加载数据
  onMounted(() => {
    loadWarehouses()
  })
</script>

<style scoped></style>
