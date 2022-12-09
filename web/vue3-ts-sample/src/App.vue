<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <Suspense>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component"></component>

            <!-- 加载中状态 -->
            <template #pending> 正在加载... </template>
          </Suspense>
        </template>
      </router-view>
    </Suspense>
  </el-config-provider>
</template>
