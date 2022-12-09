import { log } from '@/utils/log'
import dayjs from 'dayjs'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { LOGIN_PAGE, NOT_PAGE, HOME_PAGE, WHITE_LIST } from '../router/constant'
import { getRoutes } from './utils'
import NProgress from 'nprogress'
import { App } from 'vue'
import { userStoreHook } from '@/store/modules/user'

/**
 * routes 集合
 */
const fileRoutes = getRoutes()

const routes: RouteRecordRaw[] = [LOGIN_PAGE, HOME_PAGE, ...fileRoutes, NOT_PAGE]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const info = `start load route  ${dayjs().format('YYYY-MM-DD HH:mm:ss')} from:"${
    from.fullPath
  }" to:"${to.fullPath}"`
  log(info)

  NProgress.start()
  const userStore = userStoreHook()

  /**
   *  登录验证
   */

  if (WHITE_LIST.includes(to.fullPath)) {
    next()
  } else {
    if (userStore.loginState == 'login') {
      next()
    } else {
      next({ name: LOGIN_PAGE.name })
    }
  }
})

router.afterEach((to, from) => {
  const info = `end load route ${dayjs().format('YYYY-MM-DD HH:mm:ss')} from:"${
    from.fullPath
  }" to:"${to.fullPath}"`
  log(info)

  NProgress.done()
})

router.onError((error: any) => {
  log(`route end error`, error)
})

/**
 *
 * @param app
 */
export function setupRouter(app: App<Element>) {
  app.use(router)
}
