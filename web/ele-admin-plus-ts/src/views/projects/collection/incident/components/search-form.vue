<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="藏品选择" prop="collectionId">
      <collection-select v-model="form.collectionId" />
    </el-form-item>
    <el-form-item label="事故地点" prop="accidentLocation">
      <el-input v-model="form.accidentLocation" placeholder="请输入事故地点" clearable />
    </el-form-item>
    <el-form-item label="事故原因" prop="accidentCause">
      <el-input v-model="form.accidentCause" placeholder="请输入事故原因" clearable />
    </el-form-item>
    <el-form-item label="事故责任人" prop="responsiblePerson">
      <el-input v-model="form.responsiblePerson" placeholder="请输入事故责任人" clearable />
    </el-form-item>
    <el-form-item label="藏品损坏情况" prop="collectionDamageStatus">
      <el-input v-model="form.collectionDamageStatus" placeholder="请输入藏品损坏情况" clearable />
    </el-form-item>
    <el-form-item label="处理状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择处理状态" clearable style="width: 200px">
        <el-option label="待处理" value="0" />
        <el-option label="已处理" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="处理结果" prop="processingResult">
      <el-input v-model="form.processingResult" placeholder="请输入处理结果" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import type { AccidentQueryParams } from '@/api/collection/accident/model'
  import { useFormData } from '@/utils/use-form-data'
  import CollectionSelect from '@/components/CustomForm/CollectionSelect.vue'

  const emit = defineEmits<{
    (e: 'search', params: AccidentQueryParams): void
  }>()

  const [form, resetFields] = useFormData<AccidentQueryParams>({})

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
