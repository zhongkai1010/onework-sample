<!-- 搜索表单 -->
<template>
  <el-form :model="form" :inline="true" class="search-form" @submit.prevent label-position="left">
    <el-form-item label="库房名称">
      <el-input
        v-model="form.name"
        placeholder="请输入库房名称"
        clearable
        @keyup.enter="handleSearch"
      />
    </el-form-item>

    <el-form-item label="库房编号">
      <el-input
        v-model="form.code"
        placeholder="请输入库房编号"
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
        style="width: 200px"
      >
        <el-option label="库房" :value="1" />
        <el-option label="展区" :value="2" />
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
  import type { WarehouseQueryParams } from '@/api/inventory/warehouse/model'

  const emit = defineEmits<{
    (e: 'search', where?: WarehouseQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<WarehouseQueryParams>({})

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
