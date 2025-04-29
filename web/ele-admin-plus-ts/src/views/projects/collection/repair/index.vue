<template>
  <ele-page>
    <ele-card>
      <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
        <el-descriptions-item label="页面图片"> <img src="./page.png" style="width: 100%" /></el-descriptions-item>
        <el-descriptions-item label="搜索条件"> 藏品选择 藏品编码 藏品名称 工单状态 </el-descriptions-item>
        <el-descriptions-item label="操作栏">修复登记 上传图片 删除 导出 单据打印 </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24">单据图片 修复单号 登记日期 藏品编码 藏品名称 藏品分类 送修部门 送修人 修复原因 备注 送修日期 工单状态 承担机构 修复人 资质证书 修完日期 修复情况及结果 修复前图片 修复后图片 操作</el-descriptions-item>
        <el-descriptions-item label="表格操作"> 上传图片 查看详情 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
