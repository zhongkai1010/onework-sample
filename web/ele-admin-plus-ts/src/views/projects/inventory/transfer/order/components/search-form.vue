<template>
  <el-form :model="formData" @keyup.enter="handleSubmit" @submit.prevent :inline="true">
    <el-form-item label="单据状态" prop="status">
      <el-select
        v-model="formData.status"
        placeholder="请选择单据状态"
        clearable
        style="width: 200px"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="调拨仓库" prop="warehouseId">
      <warehouse-select
        v-model="formData.warehouseId"
        placeholder="请选择调拨仓库"
        style="width: 200px"
      />
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
  import type { TransferQueryParams } from '@/api/inventory/transfer/model'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'

  const emit = defineEmits<{
    (e: 'search', params: TransferQueryParams): void
  }>()

  // 表单数据
  const [formData, resetForm] = useFormData<TransferQueryParams>({
    status: undefined,
    warehouseId: undefined
  })

  // 状态选项
  const statusOptions = ref([
    { value: 0, label: '待审核' },
    { value: 1, label: '已审核' },
    { value: 2, label: '已确认' }
  ])

  // 提交表单
  const handleSubmit = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    ) as TransferQueryParams
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
  }
</style>
