<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="单据状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择单据状态" clearable style="width: 200px">
        <el-option label="待审核" :value="0" />
        <el-option label="已审核" :value="1" />
        <el-option label="已入库" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="入库类型" prop="type">
      <el-select v-model="form.type" placeholder="请选择入库类型" clearable style="width: 200px">
        <el-option label="初次入库" :value="1" />
        <el-option label="归还入库" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="藏品选择" prop="collectionId">
      <el-input
        v-model.number="form.collectionId"
        placeholder="请输入藏品ID"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="经办人" prop="operator">
      <el-input v-model="form.operator" placeholder="请输入经办人" clearable style="width: 200px" />
    </el-form-item>
    <el-form-item label="接收库房" prop="warehouseId">
      <el-input
        v-model.number="form.warehouseId"
        placeholder="请输入接收库房"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input v-model="form.remarks" placeholder="请输入备注" clearable style="width: 200px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { InboundQueryParams } from '@/api/inventory/inbound/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: InboundQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<InboundQueryParams>({
    status: undefined,
    type: undefined,
    collectionId: undefined,
    operator: '',
    warehouseId: undefined,
    remarks: ''
  })

  /** 搜索 */
  const search = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(form).filter(([_, value]) => value !== undefined && value !== '')
    ) as InboundQueryParams
    emit('search', params)
  }

  /** 重置 */
  const reset = () => {
    resetFields()
    search()
  }

  defineExpose({
    resetFields
  })
</script>

<style lang="scss" scoped>
  .el-form {
  }
</style>
