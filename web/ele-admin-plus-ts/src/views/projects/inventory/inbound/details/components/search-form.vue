<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="入库单号" prop="warehouseNumber">
      <el-input
        v-model="form.warehouseNumber"
        placeholder="请输入入库单号"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="藏品编号" prop="collectionCode">
      <el-input
        v-model="form.collectionCode"
        placeholder="请输入藏品编号"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="藏品名称" prop="collectionName">
      <el-input
        v-model="form.collectionName"
        placeholder="请输入藏品名称"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="接收库房" prop="warehouseId">
      <warehouse-select
        v-model="form.warehouseId"
        placeholder="请选择接收库房"
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择状态" clearable style="width: 200px">
        <el-option label="待审核" :value="0" />
        <el-option label="待入库" :value="1" />
        <el-option label="已入库" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'

  const emit = defineEmits<{
    (e: 'search', where: any): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    warehouseNumber: '',
    collectionCode: '',
    collectionName: '',
    warehouseId: undefined as number | undefined,
    status: undefined as number | undefined
  })

  /** 搜索 */
  const search = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(form).filter(([_, value]) => value !== undefined && value !== '')
    )
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

<style lang="scss" scoped></style>
