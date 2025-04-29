<template>
  <div class="fixt-button-wrapper">
    <el-button
      class="button"
      size="large"
      :icon="Search"
      circle
      @click="open = true"
    />
  </div>
  <el-drawer v-model="open" size="80%" title="页面内容">
    <el-descriptions :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片">
        <img src="../page.png" style="width: 100%"
      /></el-descriptions-item>
      <el-descriptions-item label="搜索条件">作品名称</el-descriptions-item>
      <el-descriptions-item label="操作栏">新增 导出</el-descriptions-item>
      <el-descriptions-item label="表格字段" :span="24"
        >编号 作品名称 创作年代 尺寸 材质 题材 装裱 艺术家名称 操作时间 作品图片
        操作</el-descriptions-item
      >
      <el-descriptions-item label="表格操作">
        编辑 删除 查看详情
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue';
  import { ref } from 'vue';
  const open = ref(false);
</script>

<style lang="scss" scoped>
  .fixt-button-wrapper {
    position: fixed;
    right: 32px;
    bottom: 64px;
    .button {
      width: 48px;
      height: 48px;
    }
  }
</style>
