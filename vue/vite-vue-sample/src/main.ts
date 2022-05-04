import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import elementPlus from './plugins/element-plus'

createApp(App)
  .use(router)
  .use(elementPlus).mount('#app')
