<!-- 导入盘点情况弹窗 -->
<template>
  <ele-modal v-model="visible" title="导入盘点情况" width="500px" :destroy-on-close="true">
    <div class="import-container">
      <!-- 下载模板 -->
      <div class="template-section">
        <h4>第一步：下载模板</h4>
        <p>请先下载盘点情况导入模板，按照模板格式填写数据</p>
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
          accept=".xlsx,.xls"
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
      <el-button @click="handleCancel">取消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleImport"
        :disabled="!fileList.length"
      >
        开始导入
      </el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Download, UploadFilled } from '@element-plus/icons-vue'
  import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
  import { ElMessage } from 'element-plus'

  const emit = defineEmits<{
    (e: 'success'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  const loading = ref(false)
  const uploadRef = ref<UploadInstance>()
  const fileList = ref<UploadUserFile[]>([])

  // 下载模板
  const handleDownloadTemplate = () => {
    try {
      // TODO: 实现下载模板功能
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
      // TODO: 实现导入功能
      await new Promise((resolve) => setTimeout(resolve, 1000)) // 模拟导入
      ElMessage.success('导入成功')
      emit('success')
      handleCancel()
    } catch (error) {
      console.error('导入失败:', error)
      ElMessage.error('导入失败')
    } finally {
      loading.value = false
    }
  }

  // 关闭
  const handleCancel = () => {
    fileList.value = []
    visible.value = false
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
