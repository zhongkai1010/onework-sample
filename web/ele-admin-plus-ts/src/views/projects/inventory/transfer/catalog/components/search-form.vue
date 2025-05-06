<template>
  <el-form :model="formData" @keyup.enter="handleSubmit" @submit.prevent :inline="true">
    <el-form-item label="拨库单号" prop="code">
      <el-input
        v-model="formData.code"
        placeholder="请输入拨库单号"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="拨库日期" prop="transferDate">
      <el-date-picker
        v-model="formData.transferDate"
        type="date"
        placeholder="请选择拨库日期"
        value-format="YYYY-MM-DD"
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="藏品选择" prop="collectionId">
      <el-input
        v-model.number="formData.collectionId"
        placeholder="请输入藏品ID"
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
  import type { TransferCatalogQueryParams } from '@/api/inventory/transfer/model'

  const emit = defineEmits<{
    (e: 'search', params: TransferCatalogQueryParams): void
  }>()

  // 表单数据
  const [formData, resetForm] = useFormData<TransferCatalogQueryParams>({
    code: '',
    transferDate: '',
    collectionId: undefined,
    status: undefined
  })

  // 状态选项
  const statusOptions = ref([
    { value: 0, label: '待审核' },
    { value: 1, label: '已拨库' }
  ])

  // 提交表单
  const handleSubmit = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    ) as TransferCatalogQueryParams
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
