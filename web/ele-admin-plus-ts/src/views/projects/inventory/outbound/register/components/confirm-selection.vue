<template>
  <ele-modal v-model="visible" title="确认出库" width="600px" :destroy-on-close="true">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="出库日期" prop="outboundDate">
        <el-date-picker v-model="form.outboundDate" type="date" placeholder="请选择出库日期" value-format="YYYY-MM-DD" style="width: 100%" />
      </el-form-item>
      <el-form-item label="经办人" prop="operator">
        <el-input v-model="form.operator" placeholder="请输入经办人" clearable />
      </el-form-item>
      <el-form-item label="提借部门" prop="borrowDepartment">
        <el-input v-model="form.borrowDepartment" placeholder="请输入提借部门" clearable />
      </el-form-item>
      <el-form-item label="提借人" prop="borrower">
        <el-input v-model="form.borrower" placeholder="请输入提借人" clearable />
      </el-form-item>
      <el-form-item label="提借类型" prop="borrowType">
        <el-input v-model="form.borrowType" placeholder="请输入提借类型" clearable />
      </el-form-item>
      <el-form-item label="拟归日期" prop="proposedReturnDate">
        <el-date-picker v-model="form.proposedReturnDate" type="date" placeholder="请选择拟归日期" value-format="YYYY-MM-DD" style="width: 100%" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" type="textarea" placeholder="请输入备注" :rows="3" />
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
  import type { AddOutboundParams } from '@/api/inventory/outbound/model'
  import { addOutbound } from '@/api/inventory/outbound'
  import { ElMessage } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import type { InboundCollection } from '@/api/inventory/inbound/model'

  const emit = defineEmits<{
    (e: 'success'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 表单实例
  const formRef = ref<FormInstance>()

  // 选中的藏品列表
  const selectedCollections = ref<InboundCollection[]>([])

  // 表单数据
  const [form, resetFields] = useFormData<AddOutboundParams>({
    outboundDate: '',
    operator: '',
    borrowDepartment: '',
    borrower: '',
    borrowType: '',
    proposedReturnDate: '',
    remarks: '',
    collectionIds: []
  })

  // 表单校验规则
  const rules = {
    outboundDate: [{ required: true, message: '请选择出库日期', trigger: 'change' }],
    operator: [{ required: true, message: '请输入经办人', trigger: 'blur' }],
    borrower: [{ required: true, message: '请输入提借人', trigger: 'blur' }],
    borrowType: [{ required: true, message: '请输入提借类型', trigger: 'blur' }],
    proposedReturnDate: [{ required: true, message: '请选择拟归日期', trigger: 'change' }]
  }

  // 设置选中的藏品
  const setSelectedCollections = (collections: InboundCollection[]) => {
    selectedCollections.value = collections
    form.collectionIds = collections.map((item) => Number(item.id))
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
          await addOutbound(form)
          ElMessage.success('出库成功')
          emit('success')
          resetFields()
          visible.value = false
        } catch (error: any) {
          ElMessage.error(error.message || '出库失败')
        }
      }
    })
  }

  defineExpose({
    setSelectedCollections
  })
</script>
