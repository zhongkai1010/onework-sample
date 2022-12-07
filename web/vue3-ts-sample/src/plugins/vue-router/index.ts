import type { App } from 'vue'
import router from '@/router'

const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export { setupRouter }
