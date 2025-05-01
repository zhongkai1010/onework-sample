<!-- 用户导入弹窗 -->
<template>
  <ele-modal :width="460" title="导入用户" v-model="visible">
    <div v-loading="loading" class="user-import-upload">
      <el-upload drag action="" accept=".xls,.xlsx" :show-file-list="false" :before-upload="doUpload">
        <ele-text type="primary" :icon="CloudUploadOutlined" :icon-props="{ size: 52 }" style="margin-bottom: 10px" />
        <ele-text type="placeholder">将文件拖到此处, 或点击上传</ele-text>
      </el-upload>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <span style="padding-right: 8px">只能上传 xls、xlsx 文件,</span>
      <el-link type="primary" :underline="false" href="https://cdn.eleadmin.com/20200610/用户导入模板.xlsx" download="用户导入模板.xlsx"> 下载模板 </el-link>
    </div>
  </ele-modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { EleMessage } from 'ele-admin-plus/es'
  import { CloudUploadOutlined } from '@/components/icons'
  import { importUsers } from '@/api/system/user'

  const emit = defineEmits<{
    (e: 'done'): void
  }>()

  /** 是否打开弹窗 */
  const visible = defineModel({ type: Boolean })

  /** 导入请求状态 */
  const loading = ref(false)

  /** 上传 */
  const doUpload = (file: File) => {
    if (!['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(file.type)) {
      EleMessage.error('只能选择 excel 文件')
      return false
    }
    if (file.size / 1024 / 1024 > 10) {
      EleMessage.error('大小不能超过 10MB')
      return false
    }
    loading.value = true
    importUsers(file)
      .then((msg) => {
        loading.value = false
        EleMessage.success(msg)
        visible.value = false
        emit('done')
      })
      .catch((e) => {
        loading.value = false
        EleMessage.error(e.message)
      })
    return false
  }
</script>

<style lang="scss" scoped>
  .user-import-upload {
    margin-bottom: 12px;

    :deep(.el-upload > .el-upload-dragger) {
      padding: 0;
      height: 168px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: (border-color 0.2s, background-color 0.2s);

      &:not(.is-dragover) {
        background: var(--el-fill-color-light);
      }
    }

    :deep(.el-icon > svg) {
      stroke-width: 3;
    }
  }
</style>
