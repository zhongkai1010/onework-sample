/**
 * 路由配置
 */
import NProgress from 'nprogress'
import type { _RouteLocationBase } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { WHITE_LIST, REDIRECT_PATH, LAYOUT_PATH } from '@/config/setting'
import { useUserStore } from '@/store/modules/user'
import { getToken } from '@/utils/token-util'
import { setPageTitle } from '@/utils/page-title-util'
import { getRouteTitle } from '@/i18n/use-locale'
import { routes, getMenuRoutes } from './routes'

NProgress.configure({
  speed: 200,
  minimum: 0.02,
  trickleSpeed: 200,
  showSpinner: false
})

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior: () => {
    return { top: 0 }
  }
})

/**
 * 路由守卫
 */
router.beforeEach(async (to) => {
  if (!to.path.includes(REDIRECT_PATH)) {
    NProgress.start()
    setPageTitle(getRouteTitle(to))
  }
  if (!getToken()) {
    // 未登录跳转登录界面
    if (!WHITE_LIST.includes(to.path)) {
      const query = { from: encodeURIComponent(to.fullPath) }
      return { path: '/login', query: to.path === LAYOUT_PATH ? {} : query }
    }
    return
  }
  // 注册动态路由
  const userStore = useUserStore()

  if (!userStore.menus) {
    const { menus, homePath } = await userStore.fetchUserInfo()
    if (menus) {
      getMenuRoutes(menus, homePath).forEach((r) => {
        router.addRoute(r)
      })
      return { ...to, replace: true }
    }
  }
})

router.afterEach((to) => {
  if (!to.path.includes(REDIRECT_PATH) && NProgress.isStarted()) {
    setTimeout(() => {
      NProgress.done(true)
    }, 200)
  }
})

export default router
