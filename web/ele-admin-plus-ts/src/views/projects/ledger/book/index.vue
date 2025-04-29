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
        <el-descriptions-item label="搜索条件"> 图书价值 </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          退回编目 导出
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 藏品状态 编号类别 藏品编号 编号 藏品名称 藏品分类 作者 藏品来源
          图书价值 保存状态 征集日期 入藏年度 备注 地址码 所属库房
          操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作"> 查看详情 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
