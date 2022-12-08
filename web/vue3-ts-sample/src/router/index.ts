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

export default router
