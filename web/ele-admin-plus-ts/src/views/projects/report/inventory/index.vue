<template>
  <ele-page>
    <ele-card>
      <el-descriptions
        title="页面内容"
        :column="1"
        size="large"
        :border="true"
        :label-width="200"
      >
        <el-descriptions-item label="页面图片">
          <img src="./page.png" style="width: 100%"
        /></el-descriptions-item>
        <el-descriptions-item label="搜索条件">
          藏品编号 藏品名称 藏品分类
        </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 无 </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >无</el-descriptions-item
        >
        <el-descriptions-item label="表格操作">无 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
