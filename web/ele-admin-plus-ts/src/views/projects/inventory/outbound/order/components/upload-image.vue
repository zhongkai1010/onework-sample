<template>
  <ele-modal v-model="visible" title="上传图片" width="500px" :destroy-on-close="true">
    <el-form :model="form" label-width="80px">
      <el-form-item label="单据图片">
        <el-upload
          class="upload-demo"
          action="/api/inventory/outbound/upload"
          :show-file-list="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :data="{ id: form.id }"
        >
          <el-image
            v-if="form.documentImage"
            :src="form.documentImage"
            fit="cover"
            style="width: 200px; height: 200px"
          />
          <el-button v-else type="primary">点击上传</el-button>
        </el-upload>
        <div class="el-upload__tip">支持 jpg、png 格式，建议尺寸 800x800 像素</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import type { OutboundOrder } from '@/api/inventory/outbound/model'

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 表单数据
  const form = ref<{
    id?: string
    documentImage?: string
  }>({})

  // 当前行数据
  const currentRow = ref<OutboundOrder>()

  // 上传前检查
  const beforeUpload = (file: File) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isImage) {
      ElMessage.error('只能上传 JPG/PNG 格式的图片！')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      ElMessage.error('图片大小不能超过 2MB！')
      return false
    }
    return true
  }

  // 上传成功
  const handleUploadSuccess = (response: any) => {
    if (response.code === 0) {
      form.value.documentImage = response.data
      ElMessage.success('上传成功')
      visible.value = false
      emit('success')
    } else {
      ElMessage.error(response.message || '上传失败')
    }
  }

  // 上传失败
  const handleUploadError = () => {
    ElMessage.error('上传失败')
  }

  // 设置行数据
  const setRowData = (row: OutboundOrder) => {
    currentRow.value = row
    form.value = {
      id: row.code,
      documentImage: row.documentImage
    }
    visible.value = true
  }

  const emit = defineEmits<{
    (e: 'success'): void
  }>()

  defineExpose({
    setRowData
  })
</script>

<style lang="scss" scoped>
  .upload-demo {
    :deep(.el-upload) {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }

  .el-upload__tip {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    margin-top: 7px;
  }
</style>
