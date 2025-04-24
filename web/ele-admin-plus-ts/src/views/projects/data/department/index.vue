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
          部门名称 上级部门 博物馆名称
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          添加部门 部门导入 修改部门 删除部门
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >部门名称</el-descriptions-item
        >
        <el-descriptions-item label="表格操作"> 无 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
