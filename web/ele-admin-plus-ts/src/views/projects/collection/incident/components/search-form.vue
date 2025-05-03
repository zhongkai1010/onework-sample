<template>
  <el-form :model="form" @keyup.enter="search" @submit.prevent :inline="true">
    <el-form-item label="藏品选择" prop="collectionId">
      <el-select v-model="form.collectionId" placeholder="请选择藏品" clearable style="width: 200px">
        <el-option v-for="item in collectionOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
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
      <el-select v-model="form.collectionDamageStatus" placeholder="请选择损坏情况" clearable style="width: 200px">
        <el-option label="轻微损坏" value="轻微损坏" />
        <el-option label="中度损坏" value="中度损坏" />
        <el-option label="严重损坏" value="严重损坏" />
        <el-option label="完全损坏" value="完全损坏" />
      </el-select>
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
  import { ref } from 'vue'
  import type { AccidentQueryParams } from '@/api/collection/accident/model'
  import { useFormData } from '@/utils/use-form-data'

  const emit = defineEmits<{
    (e: 'search', params: AccidentQueryParams): void
  }>()

  const [form, resetFields] = useFormData<AccidentQueryParams>({})

  // 藏品选项（示例数据，实际应该从API获取）
  const collectionOptions = ref([
    { label: '藏品1', value: 1 },
    { label: '藏品2', value: 2 },
    { label: '藏品3', value: 3 }
  ])

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

<style lang="scss" scoped>
  .el-form {
    padding: 16px 0px 0px 0px;
  }
</style>
