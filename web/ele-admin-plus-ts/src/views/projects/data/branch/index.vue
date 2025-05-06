<template>
  <ele-page>
    <reference-button
      title="分馆管理"
      :imageUrl="pageImage"
      searchText="分馆名称 分馆编号"
      tableFieldsText="分馆名称 分馆编号"
    />
  </ele-page>
</template>

<script setup lang="ts">
  import ReferenceButton from '@/components/ReferenceButton/index.vue'
  import pageImage from './page.png'
</script>

<style scoped></style>
