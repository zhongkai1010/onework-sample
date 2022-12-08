export const LAYOUT_VIEW = () => import('@/layouts/index.vue')

export const EMPTY_LAYOUT_VIEW = () => import('@/layouts/EmptyLayout.vue')

export const FRAME_VIEW = () => import('@/layouts/FrameLayout.vue')

export const LOGIN_PAGE = {
  name: 'login',
  path: '/login',
  component: () => import('@/views/login/index.vue'),
}

export const NOT_PAGE = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/NoFind.vue'),
}

export const ROUTER_WHITE_LIST = ['/login', '/test'] as string[]
