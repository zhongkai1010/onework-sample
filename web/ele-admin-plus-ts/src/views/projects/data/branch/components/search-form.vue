<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="分馆名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入分馆名称" clearable style="width: 200px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { BranchQueryParams } from '@/api/data/branch/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: BranchQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<BranchQueryParams>({
    name: ''
  })

  /** 搜索 */
  const search = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(form).filter(([_, value]) => value !== undefined && value !== '')
    ) as BranchQueryParams
    emit('search', params)
  }

  /** 重置 */
  const reset = () => {
    resetFields()
    search()
  }

  defineExpose({
    resetFields,
    form
  })
</script>

<style lang="scss" scoped></style>
