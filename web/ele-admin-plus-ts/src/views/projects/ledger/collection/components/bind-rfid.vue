<!-- 绑定 RFID 弹框表单 -->
<template>
  <ele-modal
    v-model="modelValue"
    title="绑定RFID"
    width="500px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent>
      <el-form-item label="RFID 编码" prop="rfidCode">
        <el-input v-model="form.rfidCode" placeholder="请输入 RFID 编码" clearable />
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
  import { bindRfid } from '@/api/collection/catalog'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

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
    rfidCode: ''
  })

  // 表单校验规则
  const rules = {
    rfidCode: [{ required: true, message: '请输入 RFID 编码', trigger: 'blur' }]
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
        bindRfid({
          ids: props.rows.map((row) => Number(row.id)),
          rfidCode: form.rfidCode
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
