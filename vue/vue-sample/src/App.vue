<!--
 * @Author: 钟凯
 * @Date: 2022-01-06 19:26:45
 * @LastEditTime: 2022-01-06 21:18:25
 * @LastEditors: 钟凯
 * @Description: 
 * @FilePath: \vue-sample\src\App.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="login_box">
    <el-form
      :model="loginData"
      :rules="formRules"
      ref="loginForm"
      label-width="120px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginData.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginData.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login()" type="primary" style="width: 200px">
          登录
        </el-button>
        <el-button type="text" style="margin-left: 60px">找回密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";

export default {
  name: "App",
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { message: "密码长度必须大于6位", min: 6, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          ElNotification({
            title: "Success",
            message: "This is a success message",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style>
.login_box {
  padding: 10px;
  width: 450px;
}
</style>
