<template>
  <div class="fixt-button-wrapper">
    <el-button class="button" size="large" :icon="Search" circle @click="open = true" />
    <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
      <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
        <el-descriptions-item label="页面图片">
          <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
        </el-descriptions-item>
        <el-descriptions-item label="搜索条件"> 藏品组名称 </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 新增 审核 </el-descriptions-item>
        <el-descriptions-item label="表格字段"> 编号 藏品组名称 负责人 备注说明 排序 状态 操作 </el-descriptions-item>
        <el-descriptions-item label="表格操作"> 编辑 删除 </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
    <ele-image-viewer v-model="showImageViewer" :urlList="viewerImages" :initialIndex="viewerIndex" :infinite="false" />
  </div>
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
  .fixt-button-wrapper {
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 1000;
    .button {
      width: 48px;
      height: 48px;
    }
  }
</style>
