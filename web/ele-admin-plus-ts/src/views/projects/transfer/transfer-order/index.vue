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
          单据状态 请选择 调拨仓库
        </el-descriptions-item>
        <el-descriptions-item label="操作栏"
          >审核 上传图片 删除 导出
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 单据图片 调拨单号 单据状态 调拨日期 调拨仓库 接收人 调拨原因
          备注 操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作">
          上传图片 删除 查看详情
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
