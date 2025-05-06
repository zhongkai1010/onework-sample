<template>
  <ele-modal
    v-model="visible"
    title="处理事故"
    width="600px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
      <el-form-item label="处理状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择处理状态" clearable>
          <el-option label="待处理" :value="0" />
          <el-option label="已处理" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="处理结果" prop="processingResult">
        <el-input
          v-model="form.processingResult"
          type="textarea"
          :rows="3"
          placeholder="请输入处理结果"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save">确定</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref, reactive, nextTick } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { HandleAccidentParams } from '@/api/collection/accident/model'
  import { handleAccident } from '@/api/collection/accident'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel<boolean>('visible')

  /** 事故ID */
  const accidentId = defineModel<number>('id')

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<HandleAccidentParams>({
    id: 0,
    status: 0,
    processingResult: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    status: [{ required: true, message: '请选择处理状态', trigger: 'change' }],
    processingResult: [{ required: true, message: '请输入处理结果', trigger: 'blur' }]
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存编辑 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return
      }
      if (!accidentId.value) {
        EleMessage.error('事故ID不能为空')
        return
      }
      loading.value = true
      handleAccident({
        ...form,
        id: accidentId.value
      })
        .then((msg) => {
          loading.value = false
          EleMessage.success(msg)
          handleCancel()
          emit('done')
        })
        .catch((e) => {
          loading.value = false
          EleMessage.error(e.message)
        })
    })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    resetFields()
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }

  /** 重置表单 */
  const reset = () => {
    resetFields()
  }
</script>

<style lang="scss" scoped></style>
