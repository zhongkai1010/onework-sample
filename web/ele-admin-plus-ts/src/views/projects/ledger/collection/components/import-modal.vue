<template>
  <ele-modal
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
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
  import { Download, UploadFilled } from '@element-plus/icons-vue'
  import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { importLedgers } from '@/api/collection/ledger'

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'done'): void
  }>()

  /** 弹窗是否打开 */
  const modelValue = defineModel<boolean>('modelValue')

  const loading = ref(false)
  const uploadRef = ref<UploadInstance>()
  const fileList = ref<UploadUserFile[]>([])

  // 下载模板
  const handleDownloadTemplate = () => {
    try {
      // 创建一个a标签用于下载
      const link = document.createElement('a')
      link.href = '/file/藏品登记模板.xls'
      link.download = '藏品登记模板.xls'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
      const file = fileList.value[0].raw
      if (!file) {
        throw new Error('文件不存在')
      }
      const res = await importLedgers(file)
      // 显示导入结果
      ElMessage.success(res)
      emit('done')
      modelValue.value = false
    } catch (error: any) {
      console.error('导入失败:', error)
      ElMessage.error(error.message || '导入失败')
    } finally {
      loading.value = false
    }
  }

  // 关闭
  const handleClose = () => {
    fileList.value = []
    emit('update:modelValue', false)
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
