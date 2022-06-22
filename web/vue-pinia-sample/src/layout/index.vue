<template>
  <h1>Layout</h1>
  <hr />
  当前用户：{{ mainStore.username }}
  <hr />
  <router-link to="/">Go to Home</router-link> |
  <router-link to="/user">Go to User</router-link> |
  <router-link to="/role">Go to Role</router-link> |
  <hr />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useStore } from "../store/index";
const mainStore = useStore();
</script>

<style></style>
