import App from "./App";
import uView from "@/uni_modules/uview-ui";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
Vue.use(uView);

const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(uView);
  return {
    app,
  };
}
// #endif
