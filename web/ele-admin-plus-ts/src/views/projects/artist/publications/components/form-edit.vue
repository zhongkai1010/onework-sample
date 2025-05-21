<template>
  <ele-modal
    v-model="visible"
    :title="isUpdate ? '修改出版著作' : '添加出版著作'"
    width="1200px"
    :destroy-on-close="true"
    @open="handleOpen"
    :align-center="true"
    @closed="reset"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100px"
      @submit.prevent=""
      class="publication-form"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="出版物题名" prop="bookTitle">
            <el-input v-model="form.bookTitle" placeholder="请输入出版物题名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="ISBN" prop="isbn">
            <el-input v-model="form.isbn" placeholder="请输入ISBN" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="艺术家名称" prop="artistName">
            <el-input v-model="form.artistName" placeholder="请输入艺术家名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出版社" prop="publisher">
            <el-input v-model="form.publisher" placeholder="请输入出版社" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开本" prop="format">
            <el-input v-model="form.format" placeholder="请输入开本" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编著" prop="author">
            <el-input v-model="form.author" placeholder="请输入编著" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="印次" prop="edition">
            <el-input v-model="form.edition" placeholder="请输入印次" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="定价" prop="price">
            <el-input-number
              v-model="form.price"
              :min="0"
              :precision="2"
              :step="0.1"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属类别" prop="category">
            <el-input v-model="form.category" placeholder="请输入所属类别" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人" prop="applicant">
            <el-input v-model="form.applicant" placeholder="请输入申请人" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请人部门" prop="applicantDepartment">
            <el-input v-model="form.applicantDepartment" placeholder="请输入申请人部门" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容提要" prop="summary">
            <el-input
              v-model="form.summary"
              type="textarea"
              :rows="3"
              placeholder="请输入内容提要"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="目录" prop="catalog">
            <tinymce-editor
              ref="catalogEditorRef"
              v-model="form.catalog"
              :init="catalogConfig"
              :disabled="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="出版物封面" prop="coverImage">
            <CommonUpload
              v-model="form.coverImage"
              :limit="1"
              :drag="true"
              :tools="true"
              accept="image/*"
              :sortable="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="相关文件" prop="relatedFiles">
            <FileUpload
              v-model="form.relatedFiles"
              :limit="5"
              :drag="true"
              :tools="true"
              :multiple="true"
              :sortable="false"
            />
          </el-form-item>
        </el-col>
      </el-row>
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
  import type {
    Publication,
    CreatePublicationParams,
    UpdatePublicationParams
  } from '@/api/artist/published-work/model'
  import { addPublication, updatePublication } from '@/api/artist/published-work'
  import CommonUpload from '@/components/CommonUpload/index.vue'
  import FileUpload from '@/components/FileUpload/index.vue'
  import TinymceEditor from '@/components/TinymceEditor/index.vue'
  import type { UploadItem } from 'ele-admin-plus/es/ele-upload-list/types'

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
  const [form, resetFields, assignFields] = useFormData<
    Omit<CreatePublicationParams, 'coverImage'> & { coverImage: UploadItem[] }
  >({
    bookTitle: '',
    artistName: '',
    publisher: '',
    format: '',
    author: '',
    edition: '',
    coverImage: [],
    price: 0,
    isbn: '',
    summary: '',
    category: '',
    catalog: '',
    relatedFiles: '',
    applicant: '',
    applicantDepartment: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    bookTitle: [{ required: true, message: '请输入出版物题名', trigger: 'blur' }],
    isbn: [{ required: true, message: '请输入ISBN', trigger: 'blur' }],
    artistName: [{ required: true, message: '请输入艺术家名称', trigger: 'blur' }],
    publisher: [{ required: true, message: '请输入出版社', trigger: 'blur' }],
    format: [{ required: true, message: '请输入开本', trigger: 'blur' }],
    author: [{ required: true, message: '请输入编著', trigger: 'blur' }],
    edition: [{ required: true, message: '请输入印次', trigger: 'blur' }],
    coverImage: [{ required: true, message: '请上传出版物封面', trigger: 'change' }],
    category: [{ required: true, message: '请输入所属类别', trigger: 'blur' }],
    price: [{ required: true, message: '请输入定价', trigger: 'blur' }],
    summary: [{ required: true, message: '请输入内容提要', trigger: 'blur' }],
    catalog: [{ required: true, message: '请输入目录', trigger: 'blur' }]
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
      const apiData = {
        ...form,
        coverImage: form.coverImage[0]?.url || ''
      }
      if (isUpdate.value && props.data) {
        const updateData: UpdatePublicationParams = {
          id: props.data.id,
          ...apiData
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
        addPublication(apiData)
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
        coverImage: props.data.coverImage
          ? [{ key: String(Date.now()), url: props.data.coverImage, status: 'done' }]
          : [],
        price: props.data.price,
        isbn: props.data.isbn,
        summary: props.data.summary,
        category: props.data.category,
        catalog: props.data.catalog,
        relatedFiles: props.data.relatedFiles,
        applicant: props.data.applicant,
        applicantDepartment: props.data.applicantDepartment
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

  /** 目录编辑器配置 */
  const catalogConfig = ref({
    height: 300,
    width: '100%',
    menubar: false,
    plugins: ['lists', 'link', 'table', 'image'],
    toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image',
    content_style:
      'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }'
  })

  /** 目录编辑器实例 */
  const catalogEditorRef = ref<InstanceType<typeof TinymceEditor> | null>(null)
</script>

<style lang="scss" scoped>
  .publication-form {
    width: 100%;

    :deep(.el-form-item) {
      margin-bottom: 20px;
    }

    :deep(.el-form-item__content) {
      width: 100%;
    }

    :deep(.el-input),
    :deep(.el-input-number),
    :deep(.el-select) {
      width: 100%;
    }
  }
</style>
