import { log } from '@/utils/log'
import dayjs from 'dayjs'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { LOGIN_PAGE, NOT_PAGE, HOME_PAGE } from '../router/constant'
import { getRoutes } from './utils'

/**
 * routes 集合
 */
const fileRoutes = getRoutes()
const routes: RouteRecordRaw[] = [
  LOGIN_PAGE,
  HOME_PAGE,
  ...fileRoutes,
  NOT_PAGE,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const info = `start load route  ${dayjs().format(
    'YYYY-MM-DD HH:mm:ss'
  )} from:"${from.fullPath}" to:"${to.fullPath}"`
  log(info)
  next()
})

router.afterEach((to, from) => {
  const info = `end load route ${dayjs().format('YYYY-MM-DD HH:mm:ss')} from:"${
    from.fullPath
  }" to:"${to.fullPath}"`
  log(info)
})

router.onError((error: any) => {
  log(`route end error`, error)
})

export default router
