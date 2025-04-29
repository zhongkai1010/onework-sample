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
          藏品选择 事故地点 事故原因 事故责任人 藏品损坏情况 处理状态 处理结果
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          添加 上传图片 删除 查看详情 处理 单据打印
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 单据图片 藏品编码 藏品名称 事故时间 事故地点 事故原因 事故责任人
          藏品损坏情况 处理状态 处理结果 操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作">
          上传图片 删除
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
