<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="100px"
    style="max-width: 580px; padding: 34px 16px 12px 0; box-sizing: border-box"
    @submit.prevent=""
  >
    <el-form-item label="昵称" prop="nickname">
      <el-input clearable :maxlength="20" v-model="form.nickname" placeholder="请输入昵称" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select clearable v-model="form.sex" placeholder="请选择性别" class="ele-fluid">
        <el-option value="1" label="男" />
        <el-option value="2" label="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input clearable :maxlength="100" v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input
        type="textarea"
        :rows="4"
        :maxlength="200"
        v-model="form.introduction"
        placeholder="请输入个人简介"
      />
    </el-form-item>
    <el-form-item label="地址">
      <el-input clearable :maxlength="200" v-model="form.address" placeholder="请输入地址" />
    </el-form-item>
    <el-form-item label="联系电话:">
      <div class="form-tell">
        <div class="form-tell-prefix">
          <el-input v-model="form.tellPre" :maxlength="4" />
        </div>
        <div class="form-tell-body">
          <el-input clearable :maxlength="10" v-model="form.tell" placeholder="请输入联系电话" />
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">
        {{ loading ? '保存中..' : '保存更改' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import { updateUserInfo } from '@/api/layout'
  import type { User } from '@/api/system/user/model'

  const props = defineProps<{
    data: User
  }>()

  const emit = defineEmits<{
    (e: 'done', value: User): void
  }>()

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, _resetFields, assignFields] = useFormData<User>({
    nickname: '',
    sex: void 0,
    email: '',
    introduction: '',
    address: '',
    tellPre: '0752',
    tell: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    nickname: [
      {
        required: true,
        message: '请输入昵称',
        type: 'string',
        trigger: 'blur'
      }
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
        type: 'string',
        trigger: 'change'
      }
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱',
        type: 'string',
        trigger: 'blur'
      }
    ]
  })

  /** 保存更改 */
  const save = () => {
    formRef.value?.validate?.((valid) => {
      if (!valid) {
        return
      }
      loading.value = true
      updateUserInfo(form)
        .then((data) => {
          loading.value = false
          EleMessage.success('保存成功')
          emit('done', data)
        })
        .catch((e) => {
          loading.value = false
          EleMessage.error(e.message)
        })
    })
  }

  // 回显当前登录用户信息
  assignFields({
    ...props.data,
    email: props.data.email || 'eleadmin@eclouds.com',
    tellPre: props.data.tellPre || '0731'
  })
</script>

<style lang="scss" scoped>
  .form-tell {
    display: flex;
    align-items: center;
    width: 100%;

    .form-tell-prefix {
      width: 65px;
    }

    .form-tell-body {
      flex: 1;
      padding-left: 12px;
      box-sizing: border-box;
    }
  }
</style>
