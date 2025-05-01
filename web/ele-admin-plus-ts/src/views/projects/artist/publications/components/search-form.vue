<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="出版物题名" label-width="auto">
      <el-input v-model.trim="form.bookTitle" placeholder="请输入" clearable @clear="search" />
    </el-form-item>

    <el-form-item label="艺术家名称" label-width="auto">
      <el-input v-model.trim="form.artistName" placeholder="请输入" clearable @clear="search" />
    </el-form-item>

    <el-form-item label-width="16px">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import type { PublicationQueryParams } from '@/api/artist/published-work/model'

  const emit = defineEmits<{
    (e: 'search', where?: PublicationQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<PublicationQueryParams>({})

  /** 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /** 重置 */
  const reset = () => {
    resetFields()
    search()
  }

  defineExpose({ resetFields })
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 16px 0px 0px 0px;
  }
</style>
