<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true" label-position="left">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入艺术家姓名" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { GetArtistListParams } from '@/api/artist/artist/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: GetArtistListParams): void
  }>()

  const [form, resetFields] = useFormData<GetArtistListParams>({})

  /** 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /** 重置 */
  const reset = () => {
    resetFields()
    search()
  }
</script>

<style lang="scss" scoped></style>
