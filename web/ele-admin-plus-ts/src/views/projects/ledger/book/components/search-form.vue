<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="图书价值" prop="bookValue">
      <el-input v-model="form.bookValue" placeholder="请输入图书价值" clearable />
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="form.author" placeholder="请输入作者" clearable />
    </el-form-item>
    <el-form-item label="ISBN" prop="isbn">
      <el-input v-model="form.isbn" placeholder="请输入ISBN" clearable />
    </el-form-item>
    <el-form-item label="藏品名称" prop="collectionName">
      <el-input v-model="form.collectionName" placeholder="请输入藏品名称" clearable />
    </el-form-item>
    <el-form-item label="藏品分类" prop="categoryName">
      <el-input v-model="form.categoryName" placeholder="请输入藏品分类" clearable />
    </el-form-item>
    <el-form-item label="保存状态" prop="preservationStatus">
      <el-input v-model="form.preservationStatus" placeholder="请输入保存状态" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (
      e: 'search',
      params: {
        bookValue?: string
        author?: string
        isbn?: string
        collectionName?: string
        categoryName?: string
        preservationStatus?: string
      }
    ): void
  }>()

  const [form, resetFields] = useFormData<{
    bookValue?: string
    author?: string
    isbn?: string
    collectionName?: string
    categoryName?: string
    preservationStatus?: string
  }>({})

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
