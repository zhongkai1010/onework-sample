<template>
  <div class="reference-button">
    <el-button type="primary" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
    <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
      </el-descriptions-item>
      <el-descriptions-item label="搜索条件">注销藏品 批准部门 注销原因 状态</el-descriptions-item>
      <el-descriptions-item label="操作栏">上传图片 审核 恢复 单据打印</el-descriptions-item>
      <el-descriptions-item label="表格字段">编号 单据图片 注销单号 注销时间 批准部门 注销原因 状态 操作</el-descriptions-item>
      <el-descriptions-item label="表格操作">上传图片 删除</el-descriptions-item>
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
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>
