<!-- 搜索表单 -->
<template>
  <el-form @keyup.enter="search" @submit.prevent="" :inline="true" label-position="left">
    <el-form-item label="藏品编号">
      <el-input clearable v-model.trim="form.collectionCode" placeholder="请输入藏品编号" />
    </el-form-item>

    <el-form-item label="藏品名称">
      <el-input clearable v-model.trim="form.collectionName" placeholder="请输入藏品名称" />
    </el-form-item>

    <el-form-item label="藏品分类">
      <CategorySelect v-model="form.categoryId" placeholder="请选择藏品分类" />
    </el-form-item>

    <el-form-item label-width="16px">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { WarehouseCollectionQueryParams } from '@/api/inventory/warehouse/model'
  import CategorySelect from '@/components/CustomForm/CategorySelect.vue'

  const emit = defineEmits<{
    (e: 'search', where?: WarehouseCollectionQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<WarehouseCollectionQueryParams>({
    collectionCode: '',
    collectionName: '',
    categoryId: undefined
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
