<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题" clearable />
    </el-form-item>
    <el-form-item label="容量大小" prop="fileSize">
      <el-input v-model="form.fileSize" placeholder="请输入容量大小" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { ImageQueryParams } from '@/api/collection/image/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: ImageQueryParams): void
  }>()

  const [form, resetFields] = useFormData<ImageQueryParams>({})

  /** 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /** 重置 */
  const reset = () => {
    resetFields()
    search()
  }
</script>

<style lang="scss" scoped>
  .el-form {
  }
</style>
