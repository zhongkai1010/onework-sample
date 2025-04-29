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
      <el-descriptions-item label="搜索条件">
        注销藏品 批准部门 注销原因 状态
      </el-descriptions-item>
      <el-descriptions-item label="操作栏">
        上传图片 审核 恢复 单据打印
      </el-descriptions-item>
      <el-descriptions-item label="表格字段">
        编号 单据图片 注销单号 注销时间 批准部门 注销原因 状态 操作
      </el-descriptions-item>
      <el-descriptions-item label="表格操作">
        上传图片 删除
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