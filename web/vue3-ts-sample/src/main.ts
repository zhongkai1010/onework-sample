import { createApp } from 'vue'
import { setupPinia } from '@/store'
import { setupRouter } from '@/router'
import { setupElementPlus } from '@/plugins/element-plus/index'

import App from './App.vue'

import '@/styles/index.scss'

/**
 *  进度条样式
 */
import 'nprogress/nprogress.css'

async function bootstrap() {
  const app = createApp(App)

  /**
   * element-plus
   */
  setupElementPlus(app)

  /**
   * pinia
   */
  setupPinia(app)

  /**
   * vue-router
   */
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
