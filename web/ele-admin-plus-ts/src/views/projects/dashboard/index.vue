<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table :body-style="{ padding: '0 0 0 16px', overflow: 'hidden' }">
      控制台
      <!-- 参考按钮 -->
      <reference-button />
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import ReferenceButton from './components/reference-button.vue'
  defineOptions({ name: 'DashboardAnalysis' })
</script>
