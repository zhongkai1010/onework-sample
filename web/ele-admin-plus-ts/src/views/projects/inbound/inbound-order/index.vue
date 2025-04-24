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
          单据状态 请选择 入库类型 请选择 藏品选择 经办人 请选择 接收库房 备注
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          入库登记 上传图片 删除 导出 单据打印
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 单据图片 单据状态 入库单号 入库类型 经办人 接收库房 入库日期
          备注 操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作">
          上传图片 查看详情
        </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
