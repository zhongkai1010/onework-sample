<template>
  <el-form :model="formData" @keyup.enter="handleSubmit" @submit.prevent :inline="true">
    <el-form-item label="藏品选择" prop="collectionId">
      <el-select
        v-model="formData.collectionId"
        placeholder="请选择藏品"
        clearable
        filterable
        style="width: 200px"
      >
        <el-option
          v-for="item in collectionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="出库单号" prop="outboundCode">
      <el-input
        v-model="formData.outboundCode"
        placeholder="请输入出库单号"
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
  import type { FormInstance } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits(['search'])

  // 表单实例
  const formRef = ref<FormInstance>()

  // 表单数据
  const [formData, resetForm] = useFormData({
    collectionId: undefined,
    outboundCode: '',
    collectionCode: '',
    collectionName: '',
    status: undefined
  })

  // 藏品选项
  const collectionOptions = ref([
    { value: 1, label: '藏品1' },
    { value: 2, label: '藏品2' }
  ])

  // 状态选项
  const statusOptions = ref([
    { value: 0, label: '待出库' },
    { value: 1, label: '已出库' },
    { value: 2, label: '已取消' }
  ])

  // 提交表单
  const handleSubmit = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        // 过滤掉 undefined 和空字符串的值
        const params = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
        )
        emit('search', params)
      }
    })
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
