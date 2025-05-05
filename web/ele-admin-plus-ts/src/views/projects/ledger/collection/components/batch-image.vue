<!-- 批量导入图片弹框表单 -->
<template>
  <ele-modal v-model="modelValue" title="批量导入图片" width="500px" :destroy-on-close="true" @close="onClose">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" @submit.prevent>
      <el-form-item label="图片" prop="files">
        <el-upload class="upload-demo" drag multiple :auto-upload="false" :on-change="handleChange" :on-remove="handleRemove" :file-list="fileList">
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">支持 jpg/png 格式文件</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit">确定</el-button>
    </template>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { FormInstance, UploadFile } from 'element-plus'
  import { UploadFilled } from '@element-plus/icons-vue'
  import { useFormData } from '@/utils/use-form-data'
  import type { CollectionLedger } from '@/api/collection/ledger/model'

  const props = defineProps<{
    rows: CollectionLedger[]
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'done'): void
  }>()

  // 使用 defineModel
  const modelValue = defineModel<boolean>('modelValue')

  // 表单实例
  const formRef = ref<FormInstance>()

  // 加载状态
  const loading = ref(false)

  // 文件列表
  const fileList = ref<UploadFile[]>([])

  // 表单数据
  const [form] = useFormData({
    files: []
  })

  // 表单校验规则
  const rules = {
    files: [{ required: true, message: '请选择图片文件', trigger: 'change' }]
  }

  // 文件变更事件
  const handleChange = (file: UploadFile) => {
    fileList.value.push(file)
  }

  // 文件移除事件
  const handleRemove = (file: UploadFile) => {
    const index = fileList.value.indexOf(file)
    if (index !== -1) {
      fileList.value.splice(index, 1)
    }
  }

  // 关闭弹窗
  const onClose = () => {
    modelValue.value = false
    formRef.value?.resetFields()
    fileList.value = []
  }

  // 提交表单
  const onSubmit = () => {
    formRef.value?.validate((valid) => {
      if (valid) {
        loading.value = true
        // TODO: 实现图片上传功能
        console.log('上传图片:', {
          collectionIds: props.rows.map((row) => Number(row.id)),
          files: fileList.value
        })
        ElMessage.success('上传成功')
        emit('done')
        onClose()
      }
    })
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    width: 100%;
  }
</style>
