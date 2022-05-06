<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
console.log('123')
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <el-button @click="count++">
    count is: {{ count }}
  </el-button>
</template>

<style scoped>

</style>
