<template>
  <ele-modal v-model="visible" :title="isUpdate ? '修改出版著作' : '添加出版著作'" width="680px" :destroy-on-close="true" @open="handleOpen" @closed="reset">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent="">
      <el-form-item label="出版物题名" prop="bookTitle">
        <el-input v-model="form.bookTitle" placeholder="请输入出版物题名" clearable />
      </el-form-item>
      <el-form-item label="艺术家名称" prop="artistName">
        <el-input v-model="form.artistName" placeholder="请输入艺术家名称" clearable />
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="form.publisher" placeholder="请输入出版社" clearable />
      </el-form-item>
      <el-form-item label="开本" prop="format">
        <el-input v-model="form.format" placeholder="请输入开本" clearable />
      </el-form-item>
      <el-form-item label="编著" prop="author">
        <el-input v-model="form.author" placeholder="请输入编著" clearable />
      </el-form-item>
      <el-form-item label="印次" prop="edition">
        <el-input v-model="form.edition" placeholder="请输入印次" clearable />
      </el-form-item>
      <el-form-item label="出版物封面" prop="coverImage">
        <el-input v-model="form.coverImage" placeholder="请输入出版物封面" clearable />
      </el-form-item>
      <el-form-item label="定价" prop="price">
        <el-input-number v-model="form.price" :min="0" :precision="2" :step="0.1" style="width: 100%" />
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
  import type { Publication, CreatePublicationParams, UpdatePublicationParams } from '@/api/artist/published-work/model'
  import { addPublication, updatePublication } from '@/api/artist/published-work'

  const props = defineProps<{
    /** 修改回显的数据 */
    data?: Publication
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
  const [form, resetFields, assignFields] = useFormData<CreatePublicationParams>({
    bookTitle: '',
    artistName: '',
    publisher: '',
    format: '',
    author: '',
    edition: '',
    coverImage: '',
    price: 0
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    bookTitle: [{ required: true, message: '请输入出版物题名', trigger: 'blur' }]
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
        const updateData: UpdatePublicationParams = {
          id: props.data.id,
          ...form
        }
        updatePublication(updateData)
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
        addPublication(form)
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
        bookTitle: props.data.bookTitle,
        artistName: props.data.artistName,
        publisher: props.data.publisher,
        format: props.data.format,
        author: props.data.author,
        edition: props.data.edition,
        coverImage: props.data.coverImage,
        price: props.data.price
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
