<template>
  <el-form @keyup.enter="search" @submit.prevent="" :inline="true" label-position="left">
    <el-row :gutter="8">
      <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
        <el-form-item label="藏品组名称">
          <el-input v-model="form.groupName" placeholder="请输入藏品组名称" clearable />
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

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import type { GroupQueryParams } from '@/api/data/group/model'

  const emit = defineEmits<{
    (e: 'search', where?: GroupQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<GroupQueryParams>({
    groupName: '',
    limit: 10,
    page: 1
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
