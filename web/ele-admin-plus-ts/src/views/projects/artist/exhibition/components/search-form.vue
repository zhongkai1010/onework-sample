<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="展览标题" prop="exhibitionTitle">
      <el-input v-model="form.exhibitionTitle" placeholder="请输入展览标题" clearable @keyup.enter="search" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import type { ExhibitionQueryParams } from '@/api/artist/exhibition/model'

  const emit = defineEmits<{
    (e: 'search', params: ExhibitionQueryParams): void
  }>()

  /** 表单实例 */

  /** 表单数据 */
  const [form, resetFields] = useFormData<ExhibitionQueryParams>({
    exhibitionTitle: ''
  })
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
    padding: 16px 0px 0px 0px;
  }
</style>
