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
          注销单号 藏品编号 藏品名称 状态
        </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 无 </el-descriptions-item>
        <el-descriptions-item label="表格字段">
          编号 注销单号 藏品编号 藏品名称 注销日期 状态 操作
        </el-descriptions-item>
        <el-descriptions-item label="表格操作"> / </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
