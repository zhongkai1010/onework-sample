<template>
  <ele-modal
    v-model="visible"
    :title="isUpdate ? '修改影像' : '添加影像'"
    width="600px"
    :destroy-on-close="true"
    @open="handleOpen"
    @closed="reset"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="藏品编号" prop="collectionCode">
        <el-input v-model="form.collectionCode" placeholder="请输入藏品编号" clearable />
      </el-form-item>
      <el-form-item label="藏品名称" prop="collectionName">
        <el-input v-model="form.collectionName" placeholder="请输入藏品名称" clearable />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" clearable />
      </el-form-item>
      <el-form-item label="容量大小" prop="fileSize">
        <el-input v-model="form.fileSize" placeholder="请输入容量大小" clearable />
      </el-form-item>
      <el-form-item label="文件" prop="file">
        <FileUpload v-model="form.file" :limit="1" :drag="true" :tools="true" :sortable="false" />
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
  import type { Image, AddImageParams, UpdateImageParams } from '@/api/collection/image/model'
  import { addImage, updateImage } from '@/api/collection/image'
  import FileUpload from '@/components/FileUpload/index.vue'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Image
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
  const [form, resetFields, assignFields] = useFormData<AddImageParams>({
    collectionCode: '',
    collectionName: '',
    title: '',
    fileSize: '',
    file: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    collectionName: [{ required: true, message: '请输入藏品名称', trigger: 'blur' }]
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
        const updateData: UpdateImageParams = {
          id: props.data.id,
          ...form
        }
        updateImage(updateData)
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
        addImage(form)
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
        collectionCode: props.data.collectionCode,
        collectionName: props.data.collectionName,
        title: props.data.title,
        fileSize: props.data.fileSize,
        file: props.data.file
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

<style lang="scss" scoped></style>
