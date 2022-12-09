import type { RouteRecordRaw } from 'vue-router'

export const LAYOUT_VIEW = () => import('@/layouts/index.vue')

export const EMPTY_LAYOUT_VIEW = () => import('@/layouts/EmptyLayout.vue')

export const FRAME_VIEW = () => import('@/layouts/FrameLayout.vue')

/**
 *  主页页面，可以根据项目实际情况，定义主页跳转url
 */
export const HOME_PAGE: RouteRecordRaw = {
  name: 'root',
  path: '/',
  // redirect:'/',
  component: () => import('@/views/index.vue'),
}

/**
 *  登录页面
 */
export const LOGIN_PAGE: RouteRecordRaw = {
  name: 'login',
  path: '/login',
  component: () => import('@/views/login/index.vue'),
}

/**
 *  404页面，url没有匹配到对应页面,显示该页面
 */
export const NOT_PAGE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/NoFind.vue'),
}

/**
 *  排除不需要权限验证路由清单
 */
export const WHITE_LIST = ['/login', '/test'] as string[]
