<!-- 搜索表单 -->
<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="藏品状态" prop="collectionStatus">
      <el-select
        clearable
        v-model="form.collectionStatus"
        placeholder="请选择"
        style="width: 200px"
      >
        <el-option label="在藏" :value="1" />
        <el-option label="修复中" :value="2" />
        <el-option label="待出库" :value="3" />
        <el-option label="待注销" :value="4" />
        <el-option label="已注销" :value="5" />
      </el-select>
    </el-form-item>
    <el-form-item label="藏品编号" prop="collectionCode">
      <el-input clearable v-model.trim="form.collectionCode" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="藏品名称" prop="collectionName">
      <el-input clearable v-model.trim="form.collectionName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="仓存位置" prop="warehouseId">
      <warehouse-select v-model="form.warehouseId" placeholder="请选择" style="width: 200px" />
    </el-form-item>
    <el-form-item label="地址码" prop="warehouseCode">
      <el-input clearable v-model.trim="form.warehouseCode" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { LedgerQueryParams } from '@/api/collection/ledger/model'
  import { WarehouseSelect } from '@/components/CustomForm'

  const emit = defineEmits<{
    (e: 'search', where?: LedgerQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<LedgerQueryParams>({})

  /** 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /**  重置 */
  const reset = () => {
    resetFields()
    search()
  }

  defineExpose({ resetFields })
</script>
