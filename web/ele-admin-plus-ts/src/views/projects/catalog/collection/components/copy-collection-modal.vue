<template>
  <el-dialog v-model="visible" title="复制藏品" width="400px" @close="handleClose">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="数量" prop="quantity">
        <el-input-number v-model="form.quantity" :min="1" :max="1000" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleOk" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, watch, defineEmits, defineProps } from 'vue'
  import { collectionCopy } from '@/api/collection/catalog'
  import { EleMessage } from 'ele-admin-plus/es'
  import type { FormInstance, FormRules } from 'element-plus'

  const props = defineProps<{ modelValue: boolean; collectionId?: number }>()
  const emit = defineEmits(['update:modelValue', 'done'])

  const visible = ref(props.modelValue)
  const form = ref({ quantity: 1 })
  const loading = ref(false)
  const formRef = ref<FormInstance>()

  const rules: FormRules = {
    quantity: [
      { required: true, message: '请输入数量', trigger: 'blur' },
      { type: 'number' as const, min: 1, message: '数量必须大于等于1', trigger: 'blur' }
    ]
  }

  watch(
    () => props.modelValue,
    (val) => {
      visible.value = val
      if (val) {
        form.value.quantity = 1
      }
    }
  )
  watch(visible, (val) => {
    emit('update:modelValue', val)
  })

  const handleOk = () => {
    formRef.value?.validate(async (valid: boolean) => {
      if (!valid) return
      loading.value = true
      try {
        await collectionCopy({ collectionId: props.collectionId, num: form.value.quantity })
        EleMessage.success('复制成功')
        visible.value = false
        emit('done')
      } catch (e: any) {
        EleMessage.error(e.message || '复制失败')
      } finally {
        loading.value = false
      }
    })
  }
  const handleClose = () => {
    visible.value = false
  }
</script>
