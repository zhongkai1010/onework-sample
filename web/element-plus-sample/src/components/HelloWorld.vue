<script setup lang="ts"></script>

<template>
  <div class="container">
    <el-menu default-active="1" mode="horizontal" class="menu-container">
      <el-menu-item index="1" class="menu">Processing Center</el-menu-item>
      <el-sub-menu index="2" class="menu">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4" :popper-offset="0">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled class="menu">Info</el-menu-item>
      <el-menu-item index="4" class="menu">Orders</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 60px;
  background-color: #282c34;
  .menu-container {
    position: relative;
    width: 65%;
    padding: 10px;
    border-bottom: 0px;
    .menu {
      height: 40px;
      margin-left: 10px;
      border-bottom: 0px;
    }
  }
  & > .el-menu {
    background-color: #282c34;
  }
}
</style>

<style scoped>
.container :deep(.el-menu-item),
.container :deep(.el-sub-menu__title) {
  background-color: #282c34 !important;
  color: #fff !important;
}

.container :deep(.el-menu-item:hover),
.container :deep(.el-sub-menu__title:hover) {
  background-color: #38599b;
}
</style>
