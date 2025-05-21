<!-- 搜索表单 -->
<template>
  <el-form
    label-width="100px"
    @keyup.enter="search"
    @submit.prevent=""
    :inline="true"
    label-position="left"
  >
    <el-form-item label="ISBN">
      <el-input clearable v-model.trim="form.ISBN" placeholder="请输入" maxlength="20" />
    </el-form-item>

    <el-form-item label="作者">
      <el-input clearable v-model.trim="form.author" placeholder="请输入" maxlength="50" />
    </el-form-item>

    <el-form-item label="图书价值">
      <el-input clearable v-model.trim="form.bookValue" placeholder="请输入" maxlength="20" />
    </el-form-item>

    <el-form-item label="类型">
      <el-input clearable v-model.trim="form.type" placeholder="请输入" maxlength="20" />
    </el-form-item>

    <el-form-item label-width="16px">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { BookQueryParams } from '@/api/collection/book/model'

  const emit = defineEmits<{
    (e: 'search', params: BookQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<BookQueryParams>({})

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
