<template>
  <span>Role</span>
  <br />
  <span>当前用户{{ mainStore.username }}</span>
</template>

<script setup lang="ts">
import { useStore } from "../../store/index";
const mainStore = useStore();
</script>
