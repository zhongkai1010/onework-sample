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
            <el-button type="primary" class="btn-submit" @click="onSubmit">
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  username: '',
  password: '',
})
const onSubmit = () => {}
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
