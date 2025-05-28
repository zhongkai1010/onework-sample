<template>
  <ele-modal
    v-model="visible"
    :title="ids.length > 1 ? '批量补充差异说明' : '补充差异说明'"
    width="500px"
    :destroy-on-close="true"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="差异说明" prop="explanation">
        <el-input
          v-model="form.explanation"
          type="textarea"
          :rows="4"
          placeholder="请输入差异说明"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { updateInventoryCheckDiscrepancy } from '@/api/inventory-check/discrepancy'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { FormInstance } from 'element-plus'

  /* Props 定义 */
  const props = defineProps<{
    /** 选中的数据ID */
    ids: number[]
  }>()

  /* 事件定义 */
  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /* 组件引用 */
  const formRef = ref<FormInstance>()

  /* 状态管理 */
  const visible = defineModel({ type: Boolean })
  const loading = ref(false)

  /* 表单数据 */
  const [form, resetFields] = useFormData({
    explanation: ''
  })

  /* 表单校验规则 */
  const rules = {
    explanation: [{ required: true, message: '请输入差异说明', trigger: 'blur' }]
  }

  /* 表单操作 */
  /** 提交表单 */
  const handleSubmit = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) return
      loading.value = true
      updateInventoryCheckDiscrepancy({
        ids: props.ids,
        explanation: form.explanation
      })
        .then(() => {
          EleMessage.success('补充差异说明成功')
          handleCancel()
          emit('done')
        })
        .catch((error) => {
          EleMessage.error(error.message || '补充差异说明失败')
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  /** 关闭弹窗 */
  const handleCancel = () => {
    resetFields()
    visible.value = false
  }
</script>
