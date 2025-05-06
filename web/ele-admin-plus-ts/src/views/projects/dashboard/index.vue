<template>
  <ele-page flex-table :multi-card="false" hide-footer style="min-height: 420px">
    <ele-card flex-table>
      控制台
      <!-- 参考按钮 -->
      <ReferenceButton
        title="控制台页面"
        :imageUrl="pageImage"
        searchText="无搜索条件"
        operationText="无操作栏"
        tableFieldsText="无表格字段"
        tableOperationsText="无表格操作"
      />
    </ele-card>
  </ele-page>
</template>

<script lang="ts" setup>
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'

  defineOptions({ name: 'DashboardAnalysis' })
</script>

<style lang="scss" scoped></style>
