<template>
  <ele-page>
    <ele-card>
      <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
        <el-descriptions-item label="页面图片">
          <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
        </el-descriptions-item>
        <el-descriptions-item label="搜索条件"> 无 </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 无 </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24">无</el-descriptions-item>
        <el-descriptions-item label="表格操作"> 无 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
    <ele-image-viewer v-model="showImageViewer" :urlList="viewerImages" :initialIndex="viewerIndex" :infinite="false" />
  </ele-page>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import pageImage from './page.png'

  const showImageViewer = ref(false)
  const viewerImages = ref<string[]>([])
  const viewerIndex = ref(0)

  const openPreview = () => {
    viewerImages.value = [pageImage]
    viewerIndex.value = 0
    showImageViewer.value = true
  }
</script>

<style lang="scss" scoped></style>
