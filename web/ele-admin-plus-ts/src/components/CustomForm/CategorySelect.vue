<template>
  <ele-tree-select
    v-model="value"
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
    :multiple="multiple"
    clearable
    placeholder="请选择上级分类"
    @change="handleChange"
    v-bind="attrs"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, useAttrs } from 'vue'
  import { listCategories } from '@/api/data/category'
  import { toTree } from 'ele-admin-plus/es'
  import type { Category } from '@/api/data/category/model'

  const attrs = useAttrs()
  const value = ref<number | string | (number | string)[]>()
  const treeData = ref<Category[]>([])

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | string | (number | string)[] | undefined): void
    (e: 'change', value: number | string | (number | string)[] | undefined): void
  }>()

  const props = defineProps<{
    modelValue?: number | string | (number | string)[]
    multiple?: boolean
  }>()

  // 加载分类数据
  const loadCategories = async () => {
    try {
      const data = await listCategories()
      treeData.value = toTree({
        data,
        idField: 'id',
        parentIdField: 'parentId'
      })
    } catch (error) {
      console.error('Failed to load categories:', error)
    }
  }

  // 处理选择变化
  const handleChange = (val: number | string | (number | string)[] | undefined) => {
    emit('update:modelValue', val)
    emit('change', val)
  }

  // 监听外部值变化
  watch(
    () => props.modelValue,
    (val) => {
      value.value = val === 0 ? undefined : val
    },
    { immediate: true }
  )

  // 组件挂载时加载数据
  onMounted(() => {
    loadCategories()
  })
</script>

<style scoped></style>
