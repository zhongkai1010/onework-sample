<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label="菜单名称">
            <el-input clearable v-model.trim="form.title" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label="菜单地址">
            <el-input clearable v-model.trim="form.path" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label="权限标识">
            <el-input clearable v-model.trim="form.authority" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label-width="16px">
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </ele-card>
</template>

<script lang="ts" setup>
  import { useFormData } from '@/utils/use-form-data'
  import type { MenuParam } from '@/api/system/menu/model'

  const emit = defineEmits<{
    (e: 'search', where?: MenuParam): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<MenuParam>({
    title: '',
    path: '',
    authority: ''
  })

  /** 搜索 */
  const search = () => {
    emit('search', { ...form })
  }

  /**  重置 */
  const reset = () => {
    resetFields()
    search()
  }
</script>
