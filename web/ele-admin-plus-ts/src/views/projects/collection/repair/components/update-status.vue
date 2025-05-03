<template>
  <ele-modal v-model="visible" title="修复入藏" width="800px" :destroy-on-close="true" @open="handleOpen" @closed="reset">
    <el-form ref="formRef" :model="form" label-width="100px" @submit.prevent="">
      <el-form-item label="修复人">
        <el-input v-model="form.repairPerson" placeholder="请输入修复人" clearable />
      </el-form-item>
      <el-form-item label="资质证书">
        <el-input v-model="form.qualificationCertificate" placeholder="请输入资质证书" clearable />
      </el-form-item>
      <el-form-item label="修完日期">
        <el-date-picker v-model="form.repairCompletionDate" type="date" placeholder="请选择修完日期" clearable />
      </el-form-item>
      <el-form-item label="修复情况及结果">
        <el-input v-model="form.repairStatusAndResults" type="textarea" placeholder="请输入修复情况及结果" clearable />
      </el-form-item>
      <el-form-item label="修复后图片">
        <el-upload class="upload-demo" action="/api/upload" :on-success="handleUploadSuccess" :on-error="handleUploadError" :before-upload="beforeUpload">
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">请上传修复后图片</div>
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
  import { ref, nextTick } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { EleMessage } from 'ele-admin-plus/es'
  import { useFormData } from '@/utils/use-form-data'
  import type { Repair } from '@/api/collection/repair/model'
  import { repairInbound } from '@/api/collection/repair'

  const props = defineProps<{
    /** 修复记录数据 */
    data: Repair
  }>()

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
  const [form, resetFields] = useFormData<Partial<Repair>>({
    repairPerson: '',
    qualificationCertificate: '',
    repairCompletionDate: '',
    repairStatusAndResults: '',
    afterRepairImage: ''
  })

  /** 关闭弹窗 */
  const handleCancel = () => {
    visible.value = false
  }

  /** 保存编辑 */
  const save = () => {
    loading.value = true
    const updateData: Repair = {
      ...props.data,
      ...form
    }
    repairInbound(updateData)
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
      form.afterRepairImage = response.data.url
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
