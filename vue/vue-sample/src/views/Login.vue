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
import { defineComponent } from "vue";

export default defineComponent({
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
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("login", {
            username: this.$data.loginData.username,
          });
        }
      });
    },
  },
});
</script>

<style>
.login_box {
  padding: 10px;
  width: 450px;
}
</style>
