<template>
  <ele-modal v-model="visible" title="确认注销" width="600px" :destroy-on-close="true">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="注销时间" prop="cancellationTime">
        <el-date-picker v-model="form.cancellationTime" type="date" placeholder="请选择注销时间" value-format="YYYY-MM-DD" style="width: 100%" />
      </el-form-item>
      <el-form-item label="批准部门" prop="approvalDepartment">
        <el-input v-model="form.approvalDepartment" placeholder="请输入批准部门" clearable />
      </el-form-item>
      <el-form-item label="注销原因" prop="cancellationReason">
        <el-input v-model="form.cancellationReason" type="textarea" placeholder="请输入注销原因" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import { addCancellation } from '@/api/collection/cancellation'
  import type { AddCancellationParams } from '@/api/collection/cancellation/model'

  const emit = defineEmits<{
    (e: 'success'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 表单实例
  const formRef = ref<FormInstance>()

  // 表单数据
  const [form, resetFields] = useFormData<AddCancellationParams>({
    cancellationTime: '',
    approvalDepartment: '',
    cancellationReason: '',
    collectionIds: []
  })

  // 表单校验规则
  const rules = {
    cancellationTime: [{ required: true, message: '请选择注销时间', trigger: 'change' }],
    approvalDepartment: [{ required: true, message: '请输入批准部门', trigger: 'blur' }],
    cancellationReason: [{ required: true, message: '请输入注销原因', trigger: 'blur' }]
  }

  // 设置选中的藏品
  const setSelectedCollections = (collectionIds: number[]) => {
    form.collectionIds = collectionIds
  }

  // 取消
  const handleCancel = () => {
    resetFields()
    visible.value = false
  }

  // 提交
  const handleSubmit = () => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        try {
          await addCancellation(form)
          ElMessage.success('注销成功')
          emit('success')
          resetFields()
          visible.value = false
        } catch (error: any) {
          ElMessage.error(error.message || '注销失败')
        }
      }
    })
  }

  defineExpose({
    setSelectedCollections
  })
</script>
