<!-- 搜索表单 -->
<template>
  <el-form label-width="100px" @keyup.enter="search" @submit.prevent="">
    <el-row :gutter="8">
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品编号" label-width="auto">
          <el-input clearable v-model.trim="form.collectionCode" placeholder="请输入藏品编号" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品名称" label-width="auto">
          <el-input clearable v-model.trim="form.collectionName" placeholder="请输入藏品名称" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品分类" label-width="auto">
          <CategorySelect v-model="form.categoryId" placeholder="请选择藏品分类" />
        </el-form-item>
      </el-col>
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label-width="16px">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
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
