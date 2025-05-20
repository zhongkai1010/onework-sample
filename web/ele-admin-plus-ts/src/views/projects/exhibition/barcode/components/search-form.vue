<!-- 搜索表单 -->
<template>
  <el-form :model="form" :inline="true" class="search-form" @submit.prevent>
    <el-form-item label="地址信息">
      <el-input
        v-model="form.name"
        placeholder="请输入地址信息"
        clearable
        @keyup.enter="handleSearch"
      />
    </el-form-item>

    <el-form-item label="地址码">
      <el-input
        v-model="form.code"
        placeholder="请输入地址码"
        clearable
        @keyup.enter="handleSearch"
      />
    </el-form-item>

    <el-form-item label="类型">
      <el-select
        v-model="form.type"
        placeholder="请选择类型"
        clearable
        @keyup.enter="handleSearch"
        style="width: 100%"
      >
        <el-option label="库房" :value="1" />
        <el-option label="展区" :value="2" />
      </el-select>
    </el-form-item>

    <el-form-item label="级别">
      <el-select
        v-model="form.tier"
        placeholder="请选择级别"
        clearable
        @keyup.enter="handleSearch"
        style="width: 100%"
      >
        <el-option label="库" :value="1" />
        <el-option label="区" :value="2" />
      </el-select>
    </el-form-item>

    <el-form-item label-width="16px">
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { BarcodeQueryParams } from '@/api/inventory/warehouse/model'

  const emit = defineEmits<{
    (e: 'search', where?: BarcodeQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<BarcodeQueryParams>({})

  /** 搜索 */
  const handleSearch = () => {
    emit('search', { ...form })
  }

  /** 重置 */
  const handleReset = () => {
    resetFields()
    handleSearch()
  }

  defineExpose({ resetFields })
</script>

<style lang="scss" scoped>
  :deep(.el-form) {
    margin-bottom: 0;
  }
  :deep(.el-form-item) {
    margin-bottom: 16px;
  }
  :deep(.el-form-item__label) {
    text-align: left;
  }
</style>
