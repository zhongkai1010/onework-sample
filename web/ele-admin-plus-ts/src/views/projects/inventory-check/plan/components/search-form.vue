<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true" label-position="left">
    <el-form-item label="盘点标题" prop="inventoryTitle">
      <el-input v-model="form.inventoryTitle" placeholder="请输入盘点标题" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { InventoryPlanQueryParams } from '@/api/inventory-check/plan/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: InventoryPlanQueryParams): void
  }>()

  const [form, resetFields] = useFormData<InventoryPlanQueryParams>({
    inventoryTitle: ''
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

<style lang="scss" scoped></style>
