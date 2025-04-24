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
          工号 姓名
        </el-descriptions-item>
        <el-descriptions-item label="操作栏">
          新增 删除 导入
        </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 工号 姓名 性别 职务 工作部门 联系电话 操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作"> 修改 </el-descriptions-item>
      </el-descriptions>
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
