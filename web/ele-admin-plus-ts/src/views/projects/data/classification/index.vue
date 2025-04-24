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
          分类名称 分类码 上级分类 完整路径 级别
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          新增 修改分类 删除分类 导入
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >分类名称</el-descriptions-item
        >
        <el-descriptions-item label="表格操作"> 无 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
