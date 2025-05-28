<template>
  <ele-tree-select
    v-model="value"
    :tree-props="{
      data: treeData,
      props: {
        label: 'groupName',
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
    placeholder="请选择所属藏品组"
    @change="handleChange"
    v-bind="attrs"
  />
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, useAttrs } from 'vue'
  import { getAllGroups } from '@/api/data/group'
  import { toTree } from 'ele-admin-plus/es'
  import type { Group } from '@/api/data/group/model'

  const attrs = useAttrs()
  const value = ref<number | string>()
  const treeData = ref<Group[]>([])

  const emit = defineEmits<{
    (e: 'update:modelValue', value: number | string | undefined): void
    (e: 'change', value: number | string | undefined): void
  }>()

  const props = defineProps<{
    modelValue?: number | string
  }>()

  // 加载分组数据
  const loadGroups = async () => {
    try {
      const data = await getAllGroups()
      treeData.value = toTree({
        data,
        idField: 'id',
        parentIdField: 'parentId'
      })
    } catch (error) {
      console.error('Failed to load groups:', error)
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
    loadGroups()
  })
</script>

<style scoped></style>
