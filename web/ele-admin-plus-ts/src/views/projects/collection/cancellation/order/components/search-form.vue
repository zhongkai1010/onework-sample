<template>
  <el-form :model="formData" @keyup.enter="handleSubmit" @submit.prevent :inline="true">
    <el-form-item label="注销藏品" prop="collectionId">
      <collection-select
        v-model="formData.collectionId"
        placeholder="请选择藏品"
        style="width: 200px"
        @select="handleSelect"
      />
    </el-form-item>
    <el-form-item label="批准部门" prop="approvalDepartment">
      <el-input
        v-model="formData.approvalDepartment"
        placeholder="请输入批准部门"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="注销原因" prop="cancellationReason">
      <el-input
        v-model="formData.cancellationReason"
        placeholder="请输入注销原因"
        clearable
        style="width: 200px"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select v-model="formData.status" placeholder="请选择状态" clearable style="width: 200px">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useFormData } from '@/utils/use-form-data'
  import type { CancellationQueryParams } from '@/api/collection/cancellation/model'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  import CollectionSelect from '@/components/CustomForm/CollectionSelect.vue'

  const emit = defineEmits<{
    (e: 'search', params: CancellationQueryParams): void
  }>()

  // 表单数据
  const [formData, resetForm] = useFormData<CancellationQueryParams>({
    collectionId: undefined,
    approvalDepartment: '',
    cancellationReason: '',
    status: undefined
  })

  // 状态选项
  const statusOptions = ref([
    { value: 0, label: '待审核' },
    { value: 1, label: '已注销' },
    { value: 2, label: '已恢复' }
  ])

  // 提交表单
  const handleSubmit = () => {
    // 过滤掉 undefined 和空字符串的值
    const params = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== '')
    ) as CancellationQueryParams
    emit('search', params)
  }

  // 重置表单
  const handleReset = () => {
    resetForm()
    handleSubmit()
  }

  // 选择藏品
  const handleSelect = (item: CollectionLedger) => {
    formData.collectionId = item.id
  }

  defineExpose({
    formData
  })
</script>

<style lang="scss" scoped>
  .el-form {
  }
</style>
