<!-- 搜索表单 -->
<template>
  <ele-card :body-style="{ paddingBottom: '2px' }">
    <el-form label-width="72px" @keyup.enter="search" @submit.prevent="">
      <el-row :gutter="8">
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label="用户账号">
            <el-input clearable v-model.trim="form.username" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label="用户名">
            <el-input clearable v-model.trim="form.nickname" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="12" :sm="12" :xs="24">
          <el-form-item label="登录时间">
            <el-date-picker
              unlink-panels
              type="daterange"
              v-model="dateRange"
              range-separator="-"
              value-format="YYYY-MM-DD"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="ele-fluid"
            />
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
  import { ref } from 'vue'
  import { useFormData } from '@/utils/use-form-data'
  import type { LoginRecordParam } from '@/api/system/login-record/model'

  const props = defineProps<{
    /** 默认搜索条件 */
    where?: LoginRecordParam
  }>()

  const emit = defineEmits<{
    (e: 'search', where?: LoginRecordParam): void
  }>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<LoginRecordParam>({
    username: '',
    nickname: '',
    ...(props.where || {})
  })

  /** 日期范围 */
  const dateRange = ref<[string, string]>(['', ''])

  /** 搜索 */
  const search = () => {
    const [d1, d2] = dateRange.value || []
    emit('search', {
      ...form,
      createTimeStart: d1 ? `${d1} 00:00:00` : '',
      createTimeEnd: d2 ? `${d2} 23:59:59` : ''
    })
  }

  /**  重置 */
  const reset = () => {
    resetFields()
    dateRange.value = ['', '']
    search()
  }
</script>
