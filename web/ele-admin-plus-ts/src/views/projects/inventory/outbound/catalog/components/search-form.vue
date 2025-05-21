<template>
  <el-form
    ref="formRef"
    :model="formData"
    @keyup.enter="handleSubmit"
    @submit.prevent
    :inline="true"
  >
    <el-form-item label="藏品选择" prop="collectionId">
      <CollectionSelect
        v-model="formData.collectionId"
        placeholder="请选择藏品"
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="出库单号" prop="code">
      <el-input
        v-model="formData.code"
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
  import CollectionSelect from '@/components/CustomForm/CollectionSelect.vue'

  const emit = defineEmits(['search'])

  // 表单实例
  const formRef = ref<FormInstance>()

  // 表单数据
  const [formData, resetForm] = useFormData({
    collectionId: undefined,
    code: '',
    collectionCode: '',
    collectionName: '',
    status: undefined
  })

  // 状态选项
  const statusOptions = ref([
    { value: 0, label: '未审核' },
    { value: 1, label: '待出库' },
    { value: 2, label: '已出库' },
    { value: 3, label: '已归库' }
  ])

  // 提交表单
  const handleSubmit = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    )
    emit('search', params)
  }

  // 重置表单
  const handleReset = () => {
    resetForm()
    handleSubmit()
  }

  defineExpose({
    formData,
    resetForm
  })
</script>

<style lang="scss" scoped>
  .el-form {
  }
</style>
