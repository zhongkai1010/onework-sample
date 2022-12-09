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
import { http } from '@/utils/http'

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
  http.post('')
}
</script>
<style scoped lang="scss">
.container {
  width: 460px;
  margin-left: calc(50% - (460px / 2));
  padding-top: 15%;
  .btn-submit {
    width: 100%;
  }
}
</style>
