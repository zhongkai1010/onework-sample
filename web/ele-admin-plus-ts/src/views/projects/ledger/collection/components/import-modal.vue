<template>
  <ele-modal
    :model-value="visible"
    @update:model-value="(val) => emit('update:visible', val)"
    title="导入藏品"
    width="500px"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <div class="import-container">
      <!-- 下载模板 -->
      <div class="template-section">
        <h4>第一步：下载模板</h4>
        <p>请先下载藏品导入模板，按照模板格式填写数据</p>
        <el-button type="primary" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
      </div>

      <!-- 上传文件 -->
      <div class="upload-section">
        <h4>第二步：上传文件</h4>
        <p>请选择填写好的Excel文件进行上传</p>
        <el-upload
          ref="uploadRef"
          class="upload-area"
          drag
          action="#"
          :auto-upload="false"
          :show-file-list="true"
          :limit="1"
          :on-change="handleFileChange"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text"> 将文件拖到此处，或<em>点击上传</em> </div>
          <template #tip>
            <div class="el-upload__tip"> 只能上传 xlsx/xls 文件，且文件大小不超过 10MB </div>
          </template>
        </el-upload>
      </div>
    </div>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleImport"> 开始导入 </el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Download, UploadFilled } from '@element-plus/icons-vue'
  import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'

  defineProps<{
    visible: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void
    (e: 'success'): void
  }>()

  const loading = ref(false)
  const uploadRef = ref<UploadInstance>()
  const fileList = ref<UploadUserFile[]>([])

  // 下载模板
  const handleDownloadTemplate = async () => {
    try {
      // TODO: 实现模板下载逻辑
      ElMessage.success('模板下载成功')
    } catch (error) {
      console.error('下载模板失败:', error)
      ElMessage.error('下载模板失败')
    }
  }

  // 文件变化
  const handleFileChange: UploadProps['onChange'] = (uploadFile) => {
    fileList.value = [uploadFile]
  }

  // 超出文件数量限制
  const handleExceed: UploadProps['onExceed'] = () => {
    ElMessage.warning('只能上传一个文件')
  }

  // 导入
  const handleImport = async () => {
    if (fileList.value.length === 0) {
      ElMessage.warning('请先选择要导入的文件')
      return
    }

    try {
      loading.value = true
      // TODO: 实现文件上传和导入逻辑
      await new Promise((resolve) => setTimeout(resolve, 1000)) // 模拟上传
      ElMessage.success('导入成功')
      emit('success')
      handleClose()
    } catch (error) {
      console.error('导入失败:', error)
      ElMessage.error('导入失败')
    } finally {
      loading.value = false
    }
  }

  // 关闭
  const handleClose = () => {
    fileList.value = []
    emit('update:visible', false)
  }
</script>

<style lang="scss" scoped>
  .import-container {
    padding: 20px;

    .template-section,
    .upload-section {
      margin-bottom: 30px;

      h4 {
        margin: 0 0 10px;
        font-size: 16px;
        font-weight: 500;
      }

      p {
        margin: 0 0 15px;
        color: #666;
      }
    }

    .upload-area {
      width: 100%;

      :deep(.el-upload-dragger) {
        width: 100%;
      }
    }
  }
</style>
