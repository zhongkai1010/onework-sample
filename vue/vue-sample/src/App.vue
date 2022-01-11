 <template>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["username"]), // 经过解构后，自动就添加到了计算属性中，此时就可以直接像访问计算属性一样访问它
  },
  name: "App",
  data() {
    return {};
  },
};
</script>


