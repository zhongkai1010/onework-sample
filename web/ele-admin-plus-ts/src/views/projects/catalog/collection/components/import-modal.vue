<template>
  <ele-modal v-model="visible" title="导入藏品" width="800px" :destroy-on-close="true">
    <div class="import-container">
      <!-- 左侧：下载模板 -->
      <div class="import-section download-section">
        <div class="section-icon">
          <el-icon :size="48"><Download /></el-icon>
        </div>
        <h3>下载模板</h3>
        <p class="section-desc">下载藏品导入模板，按照模板格式填写数据</p>
        <el-button type="primary" @click="handleDownloadTemplate">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
      </div>

      <!-- 右侧：上传文件 -->
      <div class="import-section upload-section">
        <div class="section-icon">
          <el-icon :size="48"><Upload /></el-icon>
        </div>
        <h3>上传文件</h3>
        <p class="section-desc">选择填写好的Excel文件进行导入</p>
        <el-upload
          class="upload-area"
          drag
          action="#"
          :auto-upload="false"
          :on-change="handleFileChange"
          :show-file-list="false"
          accept=".xlsx,.xls"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text"> 将文件拖到此处，或<em>点击上传</em> </div>
          <template #tip>
            <div class="el-upload__tip"> 只能上传 xlsx/xls 文件 </div>
          </template>
        </el-upload>
      </div>
    </div>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleImport" :disabled="!selectedFile">
        开始导入
      </el-button>
    </template>
  </ele-modal>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Download, Upload, UploadFilled } from '@element-plus/icons-vue'
  import type { UploadFile } from 'element-plus'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const visible = defineModel({ type: Boolean })

  // 选中的文件
  const selectedFile = ref<UploadFile>()

  // 下载模板
  const handleDownloadTemplate = () => {
    // TODO: 实现下载模板功能
    console.log('Download template')
  }

  // 文件改变
  const handleFileChange = (file: UploadFile) => {
    selectedFile.value = file
  }

  // 导入
  const handleImport = () => {
    if (!selectedFile.value) {
      return
    }
    // TODO: 实现导入功能
    console.log('Import file:', selectedFile.value)
  }
</script>

<style lang="scss" scoped>
  .import-container {
    display: flex;
    gap: 40px;
    padding: 20px 0;

    .import-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      border-radius: 8px;
      background-color: var(--el-fill-color-light);
      transition: all 0.3s;

      &:hover {
        background-color: var(--el-fill-color);
      }

      .section-icon {
        margin-bottom: 20px;
        color: var(--el-color-primary);
      }

      h3 {
        margin: 0 0 10px;
        font-size: 18px;
        color: var(--el-text-color-primary);
      }

      .section-desc {
        margin: 0 0 20px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
        text-align: center;
      }
    }

    .upload-section {
      .upload-area {
        width: 100%;
      }

      :deep(.el-upload) {
        width: 100%;
      }

      :deep(.el-upload-dragger) {
        width: 100%;
      }

      .el-upload__tip {
        margin-top: 10px;
        text-align: center;
        color: var(--el-text-color-secondary);
      }
    }
  }
</style>
