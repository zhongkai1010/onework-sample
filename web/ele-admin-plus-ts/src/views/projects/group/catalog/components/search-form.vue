<template>
  <el-form @keyup.enter="search" @submit.prevent="" :inline="true" label-position="left">
    <el-form-item label="藏品类别">
      <category-select v-model="form.categoryId" placeholder="请选择藏品类别" style="width: 100%" />
    </el-form-item>

    <el-form-item label-width="16px">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useFormData } from '@/utils/use-form-data'
  import { getAllGroups } from '@/api/data/group'
  import type { Group } from '@/api/data/group/model'
  import { CategorySelect } from '@/components/CustomForm'

  const emit = defineEmits<{
    (e: 'search', params: Record<string, any>): void
  }>()

  /* 表单数据 */
  const [form, resetFields] = useFormData({
    categoryId: undefined as number | undefined,
    groupId: undefined as number | undefined
  })

  /* 选项数据 */
  const groupOptions = ref<Group[]>([])

  /* 加载选项数据 */
  const loadOptions = async () => {
    try {
      const groups = await getAllGroups()
      groupOptions.value = groups
    } catch (error) {
      console.error('Failed to load groups:', error)
    }
  }

  /* 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /* 重置 */
  const reset = () => {
    resetFields()
    search()
  }

  /* 获取搜索参数 */
  const getSearchParams = () => {
    return { ...form }
  }

  /* 生命周期钩子 */
  onMounted(() => {
    loadOptions()
  })

  defineExpose({ resetFields, getSearchParams })
</script>

<style lang="scss" scoped>
  :deep(.el-form) {
    margin-bottom: 0;
  }
  :deep(.el-form-item) {
    margin-bottom: 16px;
  }
  :deep(.el-form-item__label) {
    text-align: left;
  }
</style>
