<template>
  <div class="box">
    <span> 地址： {{ path }}</span>
    <br />
    <span v-on:click="onSpanClick">跳转</span>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const path = route.path;

const onSpanClick = () => {
  router.push("/role");
};
</script>
<style>
.box {
  min-height: 4000px;
}
</style>
