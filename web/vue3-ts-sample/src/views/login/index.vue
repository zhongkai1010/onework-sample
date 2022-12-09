<template>
  <div class="container">
    <el-container>
      <el-main>
        <el-form :model="form" label-width="80" label-position="top">
          <el-form-item label="User">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn-submit" @click="onSubmit"> Login </el-button>
          </el-form-item>
          <el-form-item v-show="loginState > 0">
            <el-alert title="Login succeeded" type="success" v-show="loginState == 1" />
            <el-alert :title="errorMessage" type="error" v-show="loginState == 2" />
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { userStoreHook } from '@/store/modules/user'
import { reactive, ref } from 'vue'
import { router } from '@/router'
import { HOME_PAGE } from '@/router/constant'

const userStore = userStoreHook()
const loginState = ref(0)
const errorMessage = ref('Login failed')

if (userStore.loginState === 'login') {
  router.push({ name: HOME_PAGE.name })
}

const form = reactive({
  username: '',
  password: '',
})
const onSubmit = async () => {
  if (form.username === 'admin') {
    loginState.value = 1
    userStore.signIn({ username: form.username })
    router.push({ name: HOME_PAGE.name })
  } else {
    loginState.value = 2
    if (form.username == '') {
      errorMessage.value = 'Please fill in the user name'
    } else {
      errorMessage.value = 'Login account error'
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  margin: 20px auto;
  width: 460px;
  .btn-submit {
    width: 100%;
  }
}
</style>
