<template>
  <div class="reference-button">
    <el-button type="primary" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
    <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
      </el-descriptions-item>
      <el-descriptions-item label="搜索条件"> 藏品选择 事故地点 事故原因 事故责任人 藏品损坏情况 处理状态 处理结果 </el-descriptions-item>
      <el-descriptions-item label="操作栏"> 添加 上传图片 删除 查看详情 处理 单据打印 </el-descriptions-item>
      <el-descriptions-item label="表格字段" :span="24">编号 单据图片 藏品编码 藏品名称 事故时间 事故地点 事故原因 事故责任人 藏品损坏情况 处理状态 处理结果 操作</el-descriptions-item>
      <el-descriptions-item label="表格操作"> 上传图片 删除 </el-descriptions-item>
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
