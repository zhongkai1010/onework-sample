 <template>
  <h1>Hello App!</h1>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/login">Go to Login</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";

export default {
  mounted() {
    console.log(this.username)
  },
  computed: {
    ...mapState(["username"]), // 经过解构后，自动就添加到了计算属性中，此时就可以直接像访问计算属性一样访问它
  },
  name: "App",
  data() {
    return {};
  },
};
</script>


