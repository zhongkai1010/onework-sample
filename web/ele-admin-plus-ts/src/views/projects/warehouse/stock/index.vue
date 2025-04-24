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
          藏品编号 藏品名称 藏品分类 仓库位置
        </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 位置变更 </el-descriptions-item>
        <el-descriptions-item label="表格字段">
          编号 藏品状态 藏品编号 藏品名称 藏品分类 仓库位置 年代 数量 单位
          具体尺寸 完残程度 完残状况 存放位置 地址码 操作
        </el-descriptions-item>
        <el-descriptions-item label="表格操作"> 查看详情 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
