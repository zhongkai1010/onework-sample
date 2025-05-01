<template>
  <div class="reference-button">
    <el-button type="primary" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
    <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img :src="pageImage" style="width: 100%; cursor: pointer" @click="openPreview" />
      </el-descriptions-item>
      <el-descriptions-item label="搜索条件">藏品选择 藏品编码 藏品名称 工单状态</el-descriptions-item>
      <el-descriptions-item label="操作栏">修复登记 上传图片 删除 导出 单据打印</el-descriptions-item>
      <el-descriptions-item label="表格字段" :span="24">单据图片 修复单号 登记日期 藏品编码 藏品名称 藏品分类 送修部门 送修人 修复原因 备注 送修日期 工单状态 承担机构 修复人 资质证书 修完日期 修复情况及结果 修复前图片 修复后图片 操作</el-descriptions-item>
      <el-descriptions-item label="表格操作">上传图片 查看详情</el-descriptions-item>
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
