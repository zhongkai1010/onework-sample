<template>
  <div class="fixt-button-wrapper">
    <el-button class="button" size="large" :icon="Search" circle @click="open = true" />
  </div>
  <el-drawer v-model="open" size="80%" title="页面内容">
    <el-descriptions :column="1" size="large" :border="true" :label-width="200">
      <el-descriptions-item label="页面图片"> <img src="../page.png" style="width: 100%" /></el-descriptions-item>
      <el-descriptions-item label="搜索条件"> ISBN 请输入ISBN 作者 请输入作者 图书价值 请输入图书价值 类型 </el-descriptions-item>
      <el-descriptions-item label="操作栏"> 添加 审核通过 删除 </el-descriptions-item>
      <el-descriptions-item label="表格字段" :span="24"> 编号 图片信息 编号类别 藏品编号 藏品名称 编号 藏品分类 作者 所属仓库 藏品来源 图书价值 保存状态 征集日期 入藏年度 备注 藏品状态 地址码 类型 操作 </el-descriptions-item>
      <el-descriptions-item label="表格操作"> 修改 删除 </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script setup lang="ts">
  import { Search } from '@element-plus/icons-vue'
  import { ref } from 'vue'

  const open = ref(false)
</script>

<style lang="scss" scoped>
  .fixt-button-wrapper {
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 1000;
    .button {
      width: 48px;
      height: 48px;
    }
  }
</style>
