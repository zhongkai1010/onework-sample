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
        <el-descriptions-item label="搜索条件"> 无 </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 新建 插入 </el-descriptions-item>
        <el-descriptions-item label="表格字段">
          编号 名称 编码 级别 操作
        </el-descriptions-item>
        <el-descriptions-item label="表格操作">
          修改 删除
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
