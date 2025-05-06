<template>
  <el-form :model="form" :inline="true" class="search-form" @submit.prevent>
    <el-form-item label="藏品编号" prop="collectionCode">
      <el-input
        v-model="form.collectionCode"
        placeholder="请输入藏品编号"
        clearable
        @keyup.enter="handleSearch"
      />
    </el-form-item>
    <el-form-item label="藏品名称" prop="collectionName">
      <el-input
        v-model="form.collectionName"
        placeholder="请输入藏品名称"
        clearable
        @keyup.enter="handleSearch"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { CollectionQueryParams } from '@/api/collection/catalog/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: CollectionQueryParams): void
  }>()

  const [form, resetFields] = useFormData<CollectionQueryParams>({
    collectionCode: '',
    collectionName: ''
  })

  /** 搜索 */
  const handleSearch = () => {
    emit('search', { ...form })
  }

  /** 重置 */
  const handleReset = () => {
    resetFields()
    emit('search', {})
  }
</script>
