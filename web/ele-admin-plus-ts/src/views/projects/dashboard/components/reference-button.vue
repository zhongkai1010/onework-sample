<template>
  <div class="reference-button">
    <el-button type="primary" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
    <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
      </el-descriptions-item>
      <el-descriptions-item label="搜索条件">无</el-descriptions-item>
      <el-descriptions-item label="操作栏">无</el-descriptions-item>
      <el-descriptions-item label="表格字段">无</el-descriptions-item>
      <el-descriptions-item label="表格操作">无</el-descriptions-item>
    </el-descriptions>
  </el-drawer>
  <ele-image-viewer v-model="showImageViewer" :urlList="viewerImages" :initialIndex="viewerIndex" :infinite="false" />
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
    bottom: 32px;
    right: 32px;
    z-index: 1000;
    transition:
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.2s;
    border-radius: 50%;
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.15),
      0 1.5px 4px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.18),
        0 2px 8px rgba(0, 0, 0, 0.1);
    }

    @media (prefers-color-scheme: dark) {
      box-shadow:
        0 4px 16px rgba(0, 0, 0, 0.45),
        0 1.5px 4px rgba(0, 0, 0, 0.25);
    }
  }
</style>
