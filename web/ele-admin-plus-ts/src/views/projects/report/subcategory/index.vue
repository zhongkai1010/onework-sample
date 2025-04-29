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
          出版物题名
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          新增 导出 编辑 删除 查看详情
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 出版物题名 艺术家名称 出版社 开本 编著 印次 出版物封面 定价
          操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作">
          编辑 删除
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
