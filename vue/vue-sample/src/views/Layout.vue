<template>
  <el-container>
    <el-scrollbar>
      <el-aside class="layout-aside">
        <div class="logo-container">
          <div class="login"></div>
          <div class="title">我是标题</div>
        </div>

        <el-tabs tabPosition="left" style="height: 100%">
          <el-tab-pane>
            <template #label>
              <span>
                <el-icon><calendar /></el-icon>Route
              </span>
            </template>
            <el-menu>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>Navigator One</span>
                </template>
                <el-menu-item-group title="Group One">
                  <el-menu-item index="1-1">item one</el-menu-item>
                  <el-menu-item index="1-2">item one</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                  <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                  <template #title>item four</template>
                  <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>Navigator Two</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <el-icon><document /></el-icon>
                <span>Navigator Three</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>Navigator Four</span>
              </el-menu-item>
            </el-menu>
          </el-tab-pane>
          <el-tab-pane label="Config">Config</el-tab-pane>
          <el-tab-pane label="Role">Role</el-tab-pane>
          <el-tab-pane label="Task">Task</el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-scrollbar>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import { Calendar } from "@element-plus/icons-vue";
</script>
 
<style>
#app {
  height: 100vh;
  width: 100%;
}
aside {
  border-right: 1px solid #000;
}
.logo-container {
  position: relative;
  overflow: hidden;
  background: transparent;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.logo-container .login {
  position: fixed;
  top: 0;
  display: block;
  width: 64px;
  height: 60px;
  margin: 0;
}
</style>