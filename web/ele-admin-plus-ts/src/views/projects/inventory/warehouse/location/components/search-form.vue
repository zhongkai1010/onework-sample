<!-- 搜索表单 -->
<template>
  <el-form :model="form" :inline="true" class="search-form" @submit.prevent>
    <el-row :gutter="8">
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品编号" label-width="auto">
          <el-input v-model="form.collectionId" placeholder="请输入藏品编号" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="地址条码" label-width="auto">
          <el-input v-model="form.code" placeholder="请输入地址条码" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="绑定时间" label-width="auto">
          <el-date-picker v-model="form.bindingTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label-width="16px">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { LocationQueryParams } from '@/api/inventory/warehouse/model'

  const emit = defineEmits<{
    (e: 'search', where?: LocationQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<LocationQueryParams>({})

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
