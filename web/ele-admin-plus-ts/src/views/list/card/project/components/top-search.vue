<template>
  <ele-card :shadow="shadow">
    <div class="top-search">
      <el-input v-model="keyword" placeholder="请输入内容" />
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
  </ele-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import type { CardProps } from 'element-plus'

  defineProps<{
    shadow?: CardProps['shadow']
  }>()

  const emit = defineEmits<{
    (e: 'search', value: string): void
  }>()

  const keyword = ref('')

  const handleSearch = () => {
    emit('search', keyword.value)
  }
</script>

<style lang="scss" scoped>
  .top-search {
    max-width: 480px;
    margin: 24px auto;
    display: flex;

    :deep(.el-input__wrapper) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .el-button {
      margin-left: -1px;
      position: relative;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
