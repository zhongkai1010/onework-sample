<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="作品名称">
      <el-input v-model="form.workTitle" placeholder="请输入作品名称" clearable @clear="search" />
    </el-form-item>
    <el-form-item label="艺术家名称">
      <el-input v-model="form.artistName" placeholder="请输入艺术家名称" clearable @clear="search" />
    </el-form-item>

    <el-form-item class="ele-form-actions">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import type { ArtistWorkQueryParams } from '@/api/artist/work/model'

  const emit = defineEmits<{
    (e: 'search', where?: ArtistWorkQueryParams): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<ArtistWorkQueryParams>({})

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
  .el-form {
    padding: 16px 0px 0px 0px;
  }
</style>
