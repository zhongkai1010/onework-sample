<template>
  <el-form :model="formData" @keyup.enter="handleSubmit" @submit.prevent :inline="true">
    <el-form-item label="注销单号" prop="code">
      <el-input
        v-model="formData.code"
        placeholder="请输入注销单号"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="藏品编号" prop="collectionCode">
      <el-input
        v-model="formData.collectionCode"
        placeholder="请输入藏品编号"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="藏品名称" prop="collectionName">
      <el-input
        v-model="formData.collectionName"
        placeholder="请输入藏品名称"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="formData.status" placeholder="请选择状态" clearable style="width: 200px">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useFormData } from '@/utils/use-form-data'
  import type { CancellationCatalogQueryParams } from '@/api/collection/cancellation/model'

  const emit = defineEmits<{
    (e: 'search', params: CancellationCatalogQueryParams): void
  }>()

  // 表单数据
  const [formData, resetForm] = useFormData<CancellationCatalogQueryParams>({
    code: '',
    collectionCode: '',
    collectionName: '',
    status: undefined
  })

  // 状态选项
  const statusOptions = ref([
    { value: 0, label: '待注销' },
    { value: 1, label: '已注销' },
    { value: 2, label: '已恢复' }
  ])

  // 提交表单
  const handleSubmit = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    ) as CancellationCatalogQueryParams
    emit('search', params)
  }

  // 重置表单
  const handleReset = () => {
    resetForm()
    handleSubmit()
  }

  defineExpose({
    formData
  })
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 16px 0px 0px 0px;
  }
</style>
