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
          注销藏品 批准部门 注销原因 状态
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          上传图片 审核 恢复 单据打印
        </el-descriptions-item>
        <el-descriptions-item label="表格字段">
          编号 单据图片 注销单号 注销时间 批准部门 注销原因 状态 操作
        </el-descriptions-item>
        <el-descriptions-item label="表格操作">
          上传图片 删除
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
