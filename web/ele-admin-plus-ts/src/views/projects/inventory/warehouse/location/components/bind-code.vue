<!-- 地址条码绑定弹窗 -->
<template>
  <ele-modal form :width="'500px'" v-model="visible" title="绑定地址条码" @open="handleOpen">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="藏品编码" prop="collectionCode">
        <el-input v-model="form.collectionCode" placeholder="请输入藏品编码" clearable />
      </el-form-item>
      <el-form-item label="地址条码" prop="code">
        <el-input v-model="form.code" placeholder="请输入地址条码" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="save"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useFormData } from '@/utils/use-form-data'
  import { EleMessage } from 'ele-admin-plus/es'
  import { bindLocation } from '@/api/inventory/warehouse'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    collectionCode: '',
    code: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    collectionCode: [
      {
        required: true,
        message: '请输入藏品编码',
        type: 'string',
        trigger: 'change'
      }
    ],
    code: [
      {
        required: true,
        message: '请输入地址条码',
        type: 'string',
        trigger: 'change'
      }
    ]
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存修改 */
  const save = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      loading.value = true
      const msg = await bindLocation({
        collectionCode: form.collectionCode,
        code: form.code,
        type: 1 //库房
      })
      EleMessage.success(msg)
      handleCancel()
      emit('done')
    } catch (e: any) {
      if (e.message) {
        EleMessage.error(e.message)
      }
    } finally {
      loading.value = false
    }
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    resetFields()
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }
</script>
