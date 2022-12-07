import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import type { App } from 'vue'

const setupPinia = (app: App<Element>) => {
  const store = createPinia()
  store.use(piniaPluginPersistedstate)
  app.use(store)
}

export { setupPinia }
