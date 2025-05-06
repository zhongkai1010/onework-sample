<template>
  <el-form :inline="true" :model="form" @keyup.enter="search">
    <el-form-item label="单据状态">
      <el-select v-model="form.status" placeholder="请选择单据状态" clearable>
        <el-option label="未审核" :value="0" />
        <el-option label="待出库" :value="1" />
        <el-option label="已出库" :value="2" />
        <el-option label="已归还" :value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="出库单号">
      <el-input v-model="form.code" placeholder="请输入出库单号" clearable />
    </el-form-item>
    <el-form-item label="经办人">
      <el-input v-model="form.operator" placeholder="请输入经办人" clearable />
    </el-form-item>
    <el-form-item label="提借类型">
      <el-input v-model="form.borrowType" placeholder="请输入提借类型" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import type { OutboundQueryParams } from '@/api/inventory/outbound/model'

  const emit = defineEmits<{
    (e: 'search', params: OutboundQueryParams): void
  }>()

  // 表单数据
  const [form, resetFields] = useFormData<OutboundQueryParams>({
    status: undefined,
    code: undefined,
    operator: undefined,
    borrowType: undefined
  })

  // 搜索
  const search = () => {
    emit('search', form)
  }

  // 重置
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
