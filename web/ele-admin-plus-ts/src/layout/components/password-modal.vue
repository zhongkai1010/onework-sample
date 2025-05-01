<!-- 修改密码弹窗 -->
<template>
  <ele-modal form :width="420" title="修改密码" :append-to-body="true" v-model="visible" @closed="handleClosed">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input show-password type="password" :maxlength="20" v-model="form.oldPassword" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input show-password type="password" :maxlength="20" v-model="form.password" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input show-password type="password" :maxlength="20" v-model="form.password2" placeholder="请再次输入新密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleOk"> 保存 </el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import { updatePassword } from '@/api/layout'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交loading */
  const loading = ref<boolean>(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, resetFields] = useFormData({
    oldPassword: '',
    password: '',
    password2: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    oldPassword: [
      {
        required: true,
        message: '请输入旧密码',
        type: 'string',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入新密码',
        type: 'string',
        trigger: 'blur'
      },
      {
        type: 'string',
        trigger: 'blur',
        pattern: /^[\S]{5,18}$/,
        message: '密码必须为5-18位非空白字符'
      }
    ],
    password2: [
      {
        required: true,
        message: '请再次输入新密码',
        type: 'string',
        trigger: 'blur'
      },
      {
        type: 'string',
        trigger: 'blur',
        validator: (_rule: any, value: string, callback: any) => {
          if (value && value !== form.password) {
            return callback(new Error('两次输入密码不一致'))
          }
          callback()
        }
      }
    ]
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存修改 */
  const handleOk = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return
      }
      loading.value = true
      updatePassword(form)
        .then((msg) => {
          loading.value = false
          EleMessage.success(msg)
          handleCancel()
        })
        .catch((e) => {
          loading.value = false
          EleMessage.error(e.message)
        })
    })
  }

  /** 弹窗关闭事件 */
  const handleClosed = () => {
    resetFields()
    formRef.value?.clearValidate?.()
    loading.value = false
  }
</script>
