<template>
  <div>
    <el-button type="primary" :icon="Search" circle class="reference-button" @click="open = true" />
    <el-drawer v-model="open" title="页面内容" direction="rtl" size="50%" :destroy-on-close="true">
      <el-descriptions title="页面内容" :column="1" size="large" :border="true" :label-width="200">
        <el-descriptions-item label="页面图片"> <img src="../page.png" style="width: 100%" /></el-descriptions-item>
        <el-descriptions-item label="搜索条件"> 藏品状态 藏品编号 藏品名称 仓存位置 地址码 </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 退回编目 位置变更 编入藏品组 绑定 批量导入图片 导入数据 导出数据 标签打印 </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"> 编号 藏品状态 藏品编号 编号 藏品名称 藏品分类 仓存位置 年代 实际质地 数量 单位 具体尺寸 完残程度 完残状况 存放位置 藏品组 文物级别 藏品来源 保存状态 入藏日期范围 入藏年度 备注 图片信息 操作 </el-descriptions-item>
        <el-descriptions-item label="表格操作"> 查看详情 修复记录 出库记录 调拨记录 上传图片 </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const open = ref(false)
</script>

<style lang="scss" scoped>
  .reference-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>
