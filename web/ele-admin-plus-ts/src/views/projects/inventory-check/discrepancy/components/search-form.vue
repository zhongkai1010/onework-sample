<template>
  <el-form @keyup.enter="search" @submit.prevent="" :inline="true" label-position="left">
    <el-form-item label="藏品编号">
      <el-input clearable v-model.trim="form.collectionCode" placeholder="请输入藏品编号" />
    </el-form-item>
    <el-form-item label="藏品名称">
      <el-input clearable v-model.trim="form.collectionName" placeholder="请输入藏品名称" />
    </el-form-item>
    <el-form-item label="藏品类别">
      <category-select v-model="form.categoryId" placeholder="请选择藏品类别" clearable />
    </el-form-item>
    <el-form-item label="存放位置">
      <warehouse-select v-model="form.warehouseId" placeholder="请选择存放位置" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="form.status"
        placeholder="请选择状态"
        clearable
        :fit-input-width="true"
        style="width: 190px"
      >
        <el-option label="未盘点" value="0" />
        <el-option label="已盘点" value="1" />
        <el-option label="已盘亏" value="2" />
        <el-option label="已盘盈" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import { WarehouseSelect, CategorySelect } from '@/components/CustomForm'

  interface FormData {
    collectionCode: string
    collectionName: string
    categoryId?: number
    warehouseId?: number
    status: string
  }

  const emit = defineEmits<{
    (e: 'search', form: FormData): void
  }>()

  const [form, resetFields] = useFormData<FormData>({
    collectionCode: '',
    collectionName: '',
    categoryId: undefined,
    warehouseId: undefined,
    status: ''
  })

  const search = () => {
    emit('search', { ...form })
  }

  const reset = () => {
    resetFields()
    search()
  }

  defineExpose({ resetFields })
</script>
