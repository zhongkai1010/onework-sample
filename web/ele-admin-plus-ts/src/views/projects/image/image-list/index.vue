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
          标题 容量大小
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          添加 修改 删除
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 藏品编号 藏品名称 标题 容量大小 文件 添加人 添加时间
          操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作"> 修改 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
