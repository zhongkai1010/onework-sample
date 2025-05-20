<template>
  <ele-modal v-model="visible" title="确认调拨" width="600px" :destroy-on-close="true">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="调拨日期" prop="transferDate">
        <el-date-picker
          v-model="form.transferDate"
          type="date"
          placeholder="请选择调拨日期"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="调拨仓库" prop="warehouseId">
        <warehouse-select
          v-model="form.warehouseId"
          placeholder="请选择调拨仓库"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="接收人" prop="receiver">
        <el-input v-model="form.receiver" placeholder="请输入接收人" clearable />
      </el-form-item>
      <el-form-item label="调拨原因" prop="transferReason">
        <el-input v-model="form.transferReason" placeholder="请输入调拨原因" clearable />
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
  import { ElMessage } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import { addTransfer } from '@/api/inventory/transfer'
  import type { InboundCollection } from '@/api/inventory/inbound/model'
  import type { AddTransferParams } from '@/api/inventory/transfer/model'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'

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
  const [form, resetFields] = useFormData<AddTransferParams>({
    transferDate: '',
    warehouseId: 0,
    receiver: '',
    transferReason: '',
    remarks: '',
    collectionIds: []
  })

  // 表单校验规则
  const rules = {
    transferDate: [{ required: true, message: '请选择调拨日期', trigger: 'change' }],
    warehouseId: [{ required: true, message: '请输入调拨仓库ID', trigger: 'blur' }],
    receiver: [{ required: true, message: '请输入接收人', trigger: 'blur' }]
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
          await addTransfer(form)
          ElMessage.success('调拨成功')
          emit('success')
          resetFields()
          visible.value = false
        } catch (error: any) {
          ElMessage.error(error.message || '调拨失败')
        }
      }
    })
  }

  defineExpose({
    setSelectedCollections
  })
</script>
