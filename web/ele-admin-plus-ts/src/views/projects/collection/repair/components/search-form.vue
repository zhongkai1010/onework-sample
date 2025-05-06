<!-- 修复搜索表单 -->
<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="藏品编码" prop="collectionCode">
      <el-input v-model="form.collectionCode" placeholder="请输入藏品编码" clearable />
    </el-form-item>
    <el-form-item label="藏品名称" prop="collectionName">
      <el-input v-model="form.collectionName" placeholder="请输入藏品名称" clearable />
    </el-form-item>
    <el-form-item label="工单状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择工单状态" clearable style="width: 200px">
        <el-option label="待修复" :value="0" />
        <el-option label="修复中" :value="1" />
        <el-option label="已完成" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { RepairQueryParams } from '@/api/collection/repair/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: RepairQueryParams): void
  }>()

  const [form, resetFields] = useFormData<RepairQueryParams>({})

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
    :deep(.el-form-item) {
      margin-right: 16px;
      margin-bottom: 16px;
    }

    :deep(.el-input) {
      width: 200px;
    }
  }
</style>
