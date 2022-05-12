import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import elementPlus from './plugins/element-plus'

// 导入公共样式
import './style/index.scss'

createApp(App)
  .use(router)
  .use(elementPlus).mount('#app')
