<template>
  <ele-modal v-model="visible" :title="isUpdate ? '修改展览' : '添加展览'" width="600px" :destroy-on-close="true" @open="handleOpen" @closed="reset">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="展览标题" prop="exhibitionTitle">
        <el-input v-model="form.exhibitionTitle" placeholder="请输入展览标题" clearable />
      </el-form-item>
      <el-form-item label="开始日期" prop="exhibitionStartDate">
        <el-date-picker v-model="form.exhibitionStartDate" type="date" placeholder="请选择开始日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="结束日期" prop="exhibitionEndDate">
        <el-date-picker v-model="form.exhibitionEndDate" type="date" placeholder="请选择结束日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="展览机构" prop="exhibitionInstitution">
        <el-input v-model="form.exhibitionInstitution" placeholder="请输入展览机构" clearable />
      </el-form-item>
      <el-form-item label="所在城市" prop="exhibitionCity">
        <el-input v-model="form.exhibitionCity" placeholder="请输入所在城市" clearable />
      </el-form-item>
      <el-form-item label="详细地址" prop="exhibitionAddress">
        <el-input v-model="form.exhibitionAddress" placeholder="请输入详细地址" clearable />
      </el-form-item>
      <el-form-item label="艺术家" prop="artistName">
        <el-input v-model="form.artistName" placeholder="请输入艺术家" clearable />
      </el-form-item>
      <el-form-item label="封面图片" prop="coverImage">
        <el-input v-model="form.coverImage" placeholder="请输入封面图片URL" clearable />
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
  import type { Exhibition, CreateExhibitionParams, UpdateExhibitionParams } from '@/api/artist/exhibition/model'
  import { addExhibition, updateExhibition } from '@/api/artist/exhibition'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Exhibition
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
  const formRef = ref<FormInstance>()

  /** 表单数据 */
  const [form, resetFields, assignFields] = useFormData<CreateExhibitionParams>({
    exhibitionTitle: '',
    exhibitionStartDate: '',
    exhibitionEndDate: '',
    exhibitionInstitution: '',
    exhibitionCity: '',
    exhibitionAddress: '',
    artistName: '',
    coverImage: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    exhibitionTitle: [{ required: true, message: '请输入展览标题', trigger: 'blur' }],
    exhibitionStartDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
    exhibitionEndDate: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
    exhibitionInstitution: [{ required: true, message: '请输入展览机构', trigger: 'blur' }],
    exhibitionCity: [{ required: true, message: '请输入所在城市', trigger: 'blur' }],
    exhibitionAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
    artistName: [{ required: true, message: '请输入艺术家', trigger: 'blur' }]
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
      if (isUpdate.value && props.data) {
        const updateData: UpdateExhibitionParams = {
          id: props.data.id,
          ...form
        }
        updateExhibition(updateData)
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
      } else {
        addExhibition(form)
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
      }
    })
  }

  /** 弹窗打开事件 */
  const handleOpen = () => {
    if (props.data) {
      assignFields({
        exhibitionTitle: props.data.exhibitionTitle,
        exhibitionStartDate: props.data.exhibitionStartDate,
        exhibitionEndDate: props.data.exhibitionEndDate,
        exhibitionInstitution: props.data.exhibitionInstitution,
        exhibitionCity: props.data.exhibitionCity,
        exhibitionAddress: props.data.exhibitionAddress,
        artistName: props.data.artistName,
        coverImage: props.data.coverImage
      })
      isUpdate.value = true
    } else {
      resetFields()
      isUpdate.value = false
    }
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }

  /** 重置表单 */
  const reset = () => {
    resetFields()
  }
</script>
