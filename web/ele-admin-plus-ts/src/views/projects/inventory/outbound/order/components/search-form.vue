<template>
  <el-form :inline="true" :model="form" @keyup.enter="search">
    <el-form-item label="单据状态">
      <el-select v-model="form.status" placeholder="请选择单据状态" clearable style="width: 180px">
        <el-option label="未审核" :value="0" />
        <el-option label="待出库" :value="1" />
        <el-option label="已出库" :value="2" />
        <el-option label="已归还" :value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="出库单号">
      <el-input v-model="form.code" placeholder="请输入出库单号" clearable />
    </el-form-item>
    <el-form-item label="经办人">
      <el-input v-model="form.operator" placeholder="请输入经办人" clearable />
    </el-form-item>
    <el-form-item label="出库类型">
      <dict-data
        v-model="form.borrowType"
        :code="DIC_KEY_BORROW_TYPE"
        placeholder="请选择出库类型"
        clearable
        style="width: 190px"
      />
    </el-form-item>
    <el-form-item label="出库日期">
      <el-date-picker
        v-model="form.dateRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        style="width: 340px"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { useFormData } from '@/utils/use-form-data'
  import type { OutboundQueryParams } from '@/api/inventory/outbound/model'
  import { DIC_KEY_BORROW_TYPE } from '@/config/setting'

  const emit = defineEmits<{
    (e: 'search', params: OutboundQueryParams): void
  }>()

  // 表单数据
  const [form, resetFields] = useFormData<OutboundQueryParams & { dateRange?: [string, string] }>({
    status: undefined,
    code: undefined,
    operator: undefined,
    borrowType: undefined,
    dateRange: undefined
  })

  // 搜索
  const search = () => {
    let params: any = { ...form }
    if (form.dateRange && form.dateRange.length === 2) {
      params.startTime = form.dateRange[0]
      params.endTime = form.dateRange[1]
    }
    delete params.dateRange
    emit('search', params)
  }

  // 重置
  const reset = () => {
    resetFields()
    search()
  }
</script>

<style lang="scss" scoped></style>
