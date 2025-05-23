<template>
  <ele-modal
    v-model="modelValue"
    title="图书详情"
    width="800px"
    :destroy-on-close="true"
    @close="onClose"
  >
    <el-descriptions :column="2" border :label-width="120">
      <el-descriptions-item label="编号类别">{{ row?.numberCategory }}</el-descriptions-item>
      <el-descriptions-item label="藏品名称">{{ row?.collectionName }}</el-descriptions-item>
      <el-descriptions-item label="RFID编号">{{ row?.rfidCode }}</el-descriptions-item>
      <el-descriptions-item label="藏品分类">{{ row?.categoryName }}</el-descriptions-item>
      <el-descriptions-item label="ISBN">{{ row?.isbn }}</el-descriptions-item>
      <el-descriptions-item label="作者">{{ row?.author }}</el-descriptions-item>
      <el-descriptions-item label="仓库">{{ row?.warehouseName }}</el-descriptions-item>
      <el-descriptions-item label="藏品来源">{{ row?.collectionSource }}</el-descriptions-item>
      <el-descriptions-item label="图书价值">{{ row?.bookValue }}</el-descriptions-item>
      <el-descriptions-item label="保存状态">{{ row?.preservationStatus }}</el-descriptions-item>
      <el-descriptions-item label="征集日期">{{ row?.collectionDate }}</el-descriptions-item>
      <el-descriptions-item label="入藏年度">{{ row?.collectionYear }}</el-descriptions-item>
      <el-descriptions-item label="备注" :span="2">{{ row?.notes }}</el-descriptions-item>
      <el-descriptions-item label="图片信息" :span="2" v-if="row?.imageInfo">
        <el-image
          :src="row.imageInfo"
          :preview-src-list="[row.imageInfo]"
          fit="contain"
          style="width: 200px; height: 200px; cursor: pointer"
          @click="openPreview(row.imageInfo)"
        />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="onClose">关闭</el-button>
    </template>
  </ele-modal>

  <!-- 图片预览组件 -->
  <ele-image-viewer
    v-model="showImageViewer"
    :urlList="viewerImages"
    :initialIndex="viewerIndex"
    :infinite="false"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { BooksLedger } from '@/api/collection/ledger/model/index'

  const { row } = defineProps<{
    row: BooksLedger | null
  }>()

  const modelValue = defineModel<boolean>('modelValue')

  // 图片预览相关状态
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  const onClose = () => {
    modelValue.value = false
  }

  /**
   * 处理图片预览
   * @param url 图片 URL
   */
  const openPreview = (url: string) => {
    viewerImages.value = [url]
    viewerIndex.value = 0
    showImageViewer.value = true
  }
</script>

<style lang="scss" scoped>
  .image-preview {
    margin-top: 20px;

    h4 {
      margin-bottom: 10px;
    }

    .el-image {
      width: 200px;
      height: 200px;
    }
  }
</style>
