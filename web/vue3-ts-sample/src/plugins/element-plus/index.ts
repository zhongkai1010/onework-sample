import ElementPlus from 'element-plus'
import type { App } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const setupElementPlus = (app: App<Element>) => {
  app.use(ElementPlus, {
    locale: zhCn,
  })
}

export { setupElementPlus }
