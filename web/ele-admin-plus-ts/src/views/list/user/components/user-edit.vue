<!-- 用户编辑弹窗 -->
<template>
  <ele-modal
    form
    :width="640"
    v-model="visible"
    :title="isUpdate ? '修改用户' : '新建用户'"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="所属机构">
            <organization-select
              v-model="form.organizationId"
              :organization-data="organizationData"
            />
          </el-form-item>
          <el-form-item label="用户账号" prop="username">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.username"
              placeholder="请输入用户账号"
            />
          </el-form-item>
          <el-form-item label="用户名" prop="nickname">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.nickname"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <dict-data code="sex" v-model="form.sex" placeholder="请选择性别" />
          </el-form-item>
          <el-form-item label="角色" prop="roles">
            <role-select v-model="form.roles" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="手机号" prop="phone">
            <el-input clearable :maxlength="11" v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input clearable :maxlength="100" v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item v-if="!isUpdate" label="登录密码" prop="password">
            <el-input
              show-password
              type="password"
              :maxlength="20"
              v-model="form.password"
              placeholder="请输入登录密码"
            />
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input
              type="textarea"
              :rows="3"
              :maxlength="200"
              v-model="form.introduction"
              placeholder="请输入个人简介"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
  import { EleMessage, emailReg, phoneReg } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import RoleSelect from '@/views/system/user/components/role-select.vue'
  import OrganizationSelect from '@/views/system/organization/components/organization-select.vue'
  import type { Organization } from '@/api/system/organization/model'
  import { addUser, updateUser, checkExistence } from '@/api/system/user'
  import type { User } from '@/api/system/user/model'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: User | null
    /** 添加时机构id */
    organizationId?: number
    /** 指定机构下拉数据 */
    organizationData?: Organization[]
  }>()

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 是否是修改 */
  const isUpdate = ref(false)

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance | null>(null)

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<User>({
    userId: void 0,
    organizationId: void 0,
    username: '',
    nickname: '',
    sex: void 0,
    roles: [],
    email: '',
    phone: '',
    password: '',
    introduction: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        message: '请输入用户账号',
        type: 'string',
        trigger: 'blur'
      },
      {
        min: 4,
        message: '账号长度最少为4位',
        type: 'string',
        trigger: 'blur'
      },
      {
        type: 'string',
        trigger: 'blur',
        validator: (_rule: any, value: string, callback: any) => {
          checkExistence('username', value, props.data?.userId)
            .then(() => {
              callback(new Error('账号已经存在'))
            })
            .catch(() => {
              callback()
            })
        }
      }
    ],
    nickname: [
      {
        required: true,
        message: '请输入用户名',
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
    roles: [
      {
        required: true,
        message: '请选择角色',
        type: 'array',
        trigger: 'change'
      }
    ],
    email: [
      {
        pattern: emailReg,
        message: '邮箱格式不正确',
        type: 'string',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入登录密码',
        type: 'string',
        trigger: 'blur'
      },
      {
        type: 'string',
        trigger: 'blur',
        validator: (_rule: any, value: string, callback: any) => {
          if (isUpdate.value || /^[\S]{5,18}$/.test(value)) {
            return callback()
          }
          callback(new Error('密码必须为5-18位非空白字符'))
        }
      }
    ],
    phone: [
      {
        pattern: phoneReg,
        message: '手机号格式不正确',
        type: 'string',
        trigger: 'blur'
      }
    ]
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
      loading.value = true
      const saveOrUpdate = isUpdate.value ? updateUser : addUser
      saveOrUpdate(form)
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
    if (props.data) {
      assignFields({ ...props.data, password: '' })
      isUpdate.value = true
    } else {
      resetFields()
      form.organizationId = props.organizationId
      isUpdate.value = false
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.()
      })
    })
  }
</script>
