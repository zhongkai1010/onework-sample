<template>
  <span>User</span>
  <br />
  <input type="text" v-model="username" />
  <button v-on:click="onLogin">登录</button>
  <p>{{ username }}</p>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../../store/index";
const mainStore = useStore();

const username = ref("");

const onLogin = () => {
  console.log(username.value);
  mainStore.setUserName(username.value);
};
</script>
