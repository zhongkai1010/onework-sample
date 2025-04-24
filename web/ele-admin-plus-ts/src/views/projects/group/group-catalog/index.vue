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
          藏品类别 所属藏品组
        </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 无 </el-descriptions-item>
        <el-descriptions-item label="表格字段">
          藏品状态 编号类别 藏品编号 编号 藏品名称 年代类型 具体年代 藏品类别
          艺术家 艺术作品 质地 藏品组 数量 单位 通长 底径 通宽 口径 通高
          具体尺寸 质量范围 具体质量 质量单位 文物级别 藏品来源 保存状态
          征集日期 入藏日期范围 入藏年度 完残程度 完残状况
        </el-descriptions-item>
        <el-descriptions-item label="表格操作"> 无 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
