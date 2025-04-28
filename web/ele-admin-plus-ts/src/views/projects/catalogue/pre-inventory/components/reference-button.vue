<template>
  <div>
    <el-button
      type="primary"
      :icon="Search"
      circle
      class="reference-button"
      @click="open = true"
    />
    <el-drawer
      v-model="open"
      title="页面内容"
      direction="rtl"
      size="50%"
      :destroy-on-close="true"
    >
      <el-descriptions
        title="页面内容"
        :column="1"
        size="large"
        :border="true"
        :label-width="200"
      >
        <el-descriptions-item label="页面图片">
          <img src="../page.png" style="width: 100%"
        /></el-descriptions-item>
        <el-descriptions-item label="搜索条件">
          藏品编号 请输入藏品编号 藏品名称
        </el-descriptions-item>
        <el-descriptions-item label="操作栏"> 退回编目 </el-descriptions-item>
        <el-descriptions-item label="表格字段" :span="24"
          >编号 编号类别 藏品编号 编号 藏品名称 年代 具体年代 艺术家 质地类型
          质地 所属藏品组 数量 单位 通长 底径 通宽 口径 通高 具体尺寸 质量范围
          具体质量 质量单位 文物级别 藏品来源 保存状态 征集日期 入藏日期范围
          入藏年度 备注 图片信息 完残程度 完残状况 审批状态 艺术家 艺术作品
          藏品分类 地址码 所属仓库 类型 作者 审核人 审核时间
          操作</el-descriptions-item
        >
        <el-descriptions-item label="表格操作"> 查看详情 </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';

  const open = ref(false);
</script>

<style lang="scss" scoped>
  .reference-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
</style>
