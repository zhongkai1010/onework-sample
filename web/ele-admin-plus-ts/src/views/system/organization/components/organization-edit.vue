<!-- 机构编辑弹窗 -->
<template>
  <ele-modal
    form
    :width="620"
    v-model="visible"
    :title="isUpdate ? '修改机构' : '添加机构'"
    @open="handleOpen"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" @submit.prevent="">
      <el-row :gutter="16">
        <el-col :sm="12" :xs="24">
          <el-form-item label="上级机构" prop="parentId">
            <organization-select
              v-model="form.parentId"
              placeholder="请选择上级机构"
              :organization-data="organizationData"
            />
          </el-form-item>
          <el-form-item label="机构名称" prop="organizationName">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.organizationName"
              placeholder="请输入机构名称"
            />
          </el-form-item>
          <el-form-item label="机构全称" prop="organizationFullName">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.organizationFullName"
              placeholder="请输入机构全称"
            />
          </el-form-item>
          <el-form-item label="机构代码">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.organizationCode"
              placeholder="请输入机构代码"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="机构类型" prop="organizationType">
            <dict-data
              :code="DIC_KEY_ORGANIZATION_TYPE"
              v-model="form.organizationType"
              placeholder="请选择机构类型"
            />
          </el-form-item>
          <el-form-item label="排序号" prop="sortNumber">
            <el-input-number
              :min="0"
              :max="99999"
              v-model="form.sortNumber"
              placeholder="请输入排序号"
              controls-position="right"
              class="ele-fluid"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              :rows="3"
              type="textarea"
              :maxlength="200"
              v-model="form.comments"
              placeholder="请输入备注"
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
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import OrganizationSelect from './organization-select.vue'
  import { addOrganization, updateOrganization } from '@/api/system/organization'
  import type { Organization } from '@/api/system/organization/model'
  import { DIC_KEY_ORGANIZATION_TYPE } from '@/config/setting'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Organization | null
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
  const [form, resetFields, assignFields] = useFormData<Organization>({
    parentId: void 0,
    organizationName: '',
    organizationFullName: '',
    organizationCode: '',
    organizationType: '',
    sortNumber: 999,
    comments: '',
    organizationTypeName: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    organizationName: [
      {
        required: true,
        message: '请输入机构名称',
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
      const saveOrUpdate = isUpdate.value ? updateOrganization : addOrganization
      const params = { ...props.data, ...form, parentId: form.parentId || 0 }
      saveOrUpdate(params)
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
      assignFields({
        ...props.data,
        parentId: props.data.parentId || void 0
      })

      isUpdate.value = true
    } else {
      resetFields()
      form.parentId = props.organizationId
      isUpdate.value = false
    }
    nextTick(() => {
      nextTick(() => {
        formRef.value?.clearValidate?.()
      })
    })
  }
</script>
