<!-- 角色编辑弹窗 -->
<template>
  <ele-modal
    form
    :width="460"
    v-model="visible"
    :title="isUpdate ? '修改角色' : '添加角色'"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-form-item label="角色名称" prop="roleName">
        <el-input clearable :maxlength="20" v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色标识" prop="roleCode">
        <el-input clearable :maxlength="20" v-model="form.roleCode" placeholder="请输入角色标识" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input :rows="4" type="textarea" v-model="form.comments" placeholder="请输入备注" />
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
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import { addRole, updateRole } from '@/api/system/role'
  import type { Role } from '@/api/system/role/model'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Role | null
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
  const [form, resetFields, assignFields] = useFormData<Role>({
    roleId: void 0,
    roleName: '',
    roleCode: '',
    comments: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    roleName: [
      {
        required: true,
        message: '请输入角色名称',
        type: 'string',
        trigger: 'blur'
      }
    ],
    roleCode: [
      {
        required: true,
        message: '请输入角色标识',
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
      const saveOrUpdate = isUpdate.value ? updateRole : addRole
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
      assignFields(props.data)
      isUpdate.value = true
    } else {
      resetFields()
      isUpdate.value = false
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.()
      })
    })
  }
</script>
