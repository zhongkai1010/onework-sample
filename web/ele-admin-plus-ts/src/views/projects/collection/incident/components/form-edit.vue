<template>
  <ele-modal v-model="visible" title="添加事故记录" width="600px" :destroy-on-close="true" @open="handleOpen" @closed="reset">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" @submit.prevent="">
      <el-form-item label="藏品选择" prop="collectionId">
        <el-select v-model="form.collectionId" placeholder="请选择藏品" clearable>
          <el-option v-for="item in collectionOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="事故时间" prop="incidentTime">
        <el-date-picker v-model="form.incidentTime" type="datetime" placeholder="请选择事故时间" style="width: 100%" />
      </el-form-item>
      <el-form-item label="事故地点" prop="incidentLocation">
        <el-input v-model="form.incidentLocation" placeholder="请输入事故地点" clearable />
      </el-form-item>
      <el-form-item label="事故原因" prop="incidentCause">
        <el-input v-model="form.incidentCause" type="textarea" :rows="3" placeholder="请输入事故原因" />
      </el-form-item>
      <el-form-item label="事故责任人" prop="responsiblePerson">
        <el-input v-model="form.responsiblePerson" placeholder="请输入事故责任人" clearable />
      </el-form-item>
      <el-form-item label="藏品损坏情况" prop="damageStatus">
        <el-select v-model="form.damageStatus" placeholder="请选择损坏情况" clearable>
          <el-option label="轻微损坏" value="轻微损坏" />
          <el-option label="中度损坏" value="中度损坏" />
          <el-option label="严重损坏" value="严重损坏" />
          <el-option label="完全损坏" value="完全损坏" />
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择处理状态" clearable>
          <el-option label="待处理" :value="0" />
          <el-option label="已处理" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="处理结果" prop="processingResult">
        <el-input v-model="form.processingResult" type="textarea" :rows="3" placeholder="请输入处理结果" />
      </el-form-item>
      <el-form-item label="单据图片" prop="documentImage">
        <el-upload class="upload-demo" action="/api/upload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="beforeUpload" :show-file-list="false">
          <el-image v-if="form.documentImage" :src="form.documentImage" style="width: 100px; height: 100px; margin-right: 10px" />
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">请上传事故单据图片</div>
          </template>
        </el-upload>
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
  import type { AddAccidentParams } from '@/api/collection/accident/model'
  import { addAccident } from '@/api/collection/accident'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  /** 提交状态 */
  const loading = ref(false)

  /** 表单实例 */
  const formRef = ref<FormInstance>()

  /** 表单数据 */
  const [form, resetFields] = useFormData<AddAccidentParams>({
    collectionId: '',
    incidentTime: '',
    incidentLocation: '',
    incidentCause: '',
    responsiblePerson: '',
    damageStatus: '',
    status: 0,
    processingResult: '',
    documentImage: ''
  })

  /** 表单验证规则 */
  const rules = reactive<FormRules>({
    collectionId: [{ required: true, message: '请选择藏品', trigger: 'change' }],
    incidentTime: [{ required: true, message: '请选择事故时间', trigger: 'change' }],
    incidentLocation: [{ required: true, message: '请输入事故地点', trigger: 'blur' }],
    incidentCause: [{ required: true, message: '请输入事故原因', trigger: 'blur' }],
    responsiblePerson: [{ required: true, message: '请输入事故责任人', trigger: 'blur' }],
    damageStatus: [{ required: true, message: '请选择藏品损坏情况', trigger: 'change' }],
    status: [{ required: true, message: '请选择处理状态', trigger: 'change' }],
    documentImage: [{ required: true, message: '请上传单据图片', trigger: 'change' }]
  })

  // 藏品选项（示例数据，实际应该从API获取）
  const collectionOptions = ref([
    { label: '藏品1', value: 1 },
    { label: '藏品2', value: 2 },
    { label: '藏品3', value: 3 }
  ])

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
      addAccident(form)
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
    resetFields()
    nextTick(() => {
      formRef.value?.clearValidate?.()
    })
  }

  /** 重置表单 */
  const reset = () => {
    resetFields()
  }

  /** 上传成功回调 */
  const handleUploadSuccess = (response: any) => {
    if (response.code === 0) {
      form.documentImage = response.data.url
      EleMessage.success('上传成功')
    } else {
      EleMessage.error(response.message || '上传失败')
    }
  }

  /** 上传失败回调 */
  const handleUploadError = () => {
    EleMessage.error('上传失败')
  }

  /** 上传前校验 */
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      EleMessage.error('只能上传图片文件!')
      return false
    }
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      EleMessage.error('图片大小不能超过 10MB!')
      return false
    }
    return true
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    :deep(.el-upload__tip) {
      color: #909399;
      font-size: 12px;
      margin-top: 7px;
    }
  }
</style>
