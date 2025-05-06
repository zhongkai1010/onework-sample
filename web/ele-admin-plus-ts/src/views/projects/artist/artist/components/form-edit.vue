<template>
  <ele-modal
    v-model="visible"
    :title="isUpdate ? '修改艺术家' : '添加艺术家'"
    width="600px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入艺术家姓名" clearable />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别" clearable style="width: 100%">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="民族" prop="ethnicity">
        <el-input v-model="form.ethnicity" placeholder="请输入民族" clearable />
      </el-form-item>
      <el-form-item label="籍贯" prop="hometown">
        <el-input v-model="form.hometown" placeholder="请输入籍贯" clearable />
      </el-form-item>
      <el-form-item label="艺术风格" prop="artStyle">
        <el-input v-model="form.artStyle" placeholder="请输入艺术风格" clearable />
      </el-form-item>
      <el-form-item label="师承" prop="mentor">
        <el-input v-model="form.mentor" placeholder="请输入师承" clearable />
      </el-form-item>
      <el-form-item label="毕业信息" prop="graduation">
        <el-input v-model="form.graduation" placeholder="请输入何时何校毕业" clearable />
      </el-form-item>
      <el-form-item label="学历" prop="education">
        <el-input v-model="form.education" placeholder="请输入学历" clearable />
      </el-form-item>
      <el-form-item label="任职单位" prop="currentInstitution">
        <el-input v-model="form.currentInstitution" placeholder="请输入任职单位或机构" clearable />
      </el-form-item>
      <el-form-item label="肖像" prop="portrait">
        <el-input v-model="form.portrait" placeholder="请输入肖像图片URL" clearable />
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
  import type { Artist, CreateArtistParams, UpdateArtistParams } from '@/api/artist/artist/model'
  import { createArtist, updateArtist } from '@/api/artist/artist'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Artist
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
  const [form, resetFields, assignFields] = useFormData<CreateArtistParams>({
    name: '',
    gender: '',
    ethnicity: '',
    hometown: '',
    artStyle: '',
    mentor: '',
    graduation: '',
    education: '',
    currentInstitution: '',
    portrait: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    name: [{ required: true, message: '请输入艺术家姓名', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
    ethnicity: [{ required: true, message: '请输入民族', trigger: 'blur' }],
    hometown: [{ required: true, message: '请输入籍贯', trigger: 'blur' }],
    artStyle: [{ required: true, message: '请输入艺术风格', trigger: 'blur' }],
    mentor: [{ required: true, message: '请输入师承', trigger: 'blur' }],
    graduation: [{ required: true, message: '请输入何时何校毕业', trigger: 'blur' }],
    education: [{ required: true, message: '请输入学历', trigger: 'blur' }],
    currentInstitution: [{ required: true, message: '请输入任职单位或机构', trigger: 'blur' }],
    portrait: [{ required: true, message: '请输入肖像图片URL', trigger: 'blur' }]
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
        const updateData: UpdateArtistParams = {
          id: props.data.id,
          ...form
        }
        updateArtist(updateData)
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
        createArtist(form)
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
        name: props.data.name,
        gender: props.data.gender,
        ethnicity: props.data.ethnicity,
        hometown: props.data.hometown,
        artStyle: props.data.artStyle,
        mentor: props.data.mentor,
        graduation: props.data.graduation,
        education: props.data.education,
        currentInstitution: props.data.currentInstitution,
        portrait: props.data.portrait
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
