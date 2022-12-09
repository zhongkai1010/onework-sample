<template>
  <div>
    <span>{{ username }}</span>
    <el-button type="primary" size="default" @click="onClick">退出</el-button>
  </div>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { LOGIN_PAGE } from '@/router/constant'
import { userStoreHook } from '@/store/modules/user'

const { username } = userStoreHook().currentUser

const onClick = () => {
  userStoreHook().signOut()
  router.push({ name: LOGIN_PAGE.name })
}
</script>
