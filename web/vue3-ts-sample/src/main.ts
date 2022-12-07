import { createApp } from 'vue'
import { setupPinia } from '@/plugins/pinia/index'
import { setupElementPlus } from '@/plugins/element-plus/index'
import { setupRouter } from '@/plugins/vue-router/index'

import App from './App.vue'

import '@/styles/index.scss'

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
