<template>
  <div class="reference-button">
    <el-button type="primary" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
    <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
      </el-descriptions-item>
      <el-descriptions-item label="搜索条件"> 无 </el-descriptions-item>
      <el-descriptions-item label="操作栏">选择出库藏品 取消选择 </el-descriptions-item>
      <el-descriptions-item label="表格字段" :span="24"
        >编号 藏品编号 藏品名称 库房 年代 质地类型 质地 数量 单位 具体尺寸
        完残程度</el-descriptions-item
      >
      <el-descriptions-item label="表格操作"> 确认选择 </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
  <ele-image-viewer
    v-model="showImageViewer"
    :urlList="viewerImages"
    :initialIndex="viewerIndex"
    :infinite="false"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import pageImage from '../page.png'

  const open = ref(false)
  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  const openPreview = () => {
    viewerImages.value = [pageImage]
    viewerIndex.value = 0
    showImageViewer.value = true
  }
</script>

<style lang="scss" scoped>
  .reference-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>
