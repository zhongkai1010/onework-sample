<!-- 位置变更弹框表单 -->
<template>
  <ele-modal v-model="modelValue" title="位置变更" width="500px" :destroy-on-close="true" @close="onClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent>
      <el-form-item label="位置" prop="warehouseId">
        <warehouse-select v-model="form.warehouseId" placeholder="请选择位置" style="width: 100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">确定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import { changeWarehouse } from '@/api/collection/ledger'
  import type { CollectionLedger } from '@/api/collection/ledger/model'
  import WarehouseSelect from '@/components/CustomForm/WarehouseSelect.vue'

  const props = defineProps<{
    rows: CollectionLedger[]
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'done'): void
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 表单实例
  const formRef = ref<FormInstance>()

  // 加载状态
  const loading = ref(false)

  // 表单数据
  const [form] = useFormData({
    warehouseId: ''
  })

  // 表单校验规则
  const rules = {
    warehouseId: [{ required: true, message: '请选择位置', trigger: 'change' }]
  }

  // 关闭弹窗
  const onClose = () => {
    modelValue.value = false
    formRef.value?.resetFields()
  }

  // 提交表单
  const onSubmit = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true
        changeWarehouse({
          collectionIds: props.rows.map((row) => Number(row.id)),
          warehouseId: form.warehouseId
        })
          .then((msg) => {
            ElMessage.success(msg)
            emit('done')
            onClose()
          })
          .catch((e) => {
            ElMessage.error(e.message)
          })
          .finally(() => {
            loading.value = false
          })
      }
    })
  }
</script>

<style lang="scss" scoped></style>
