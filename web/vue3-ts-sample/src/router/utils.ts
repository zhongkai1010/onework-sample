import type { RouteRecordRaw } from 'vue-router'

/**
 * 通过vite import.meta.globEager特性将modules目录文件转换集合
 *
 * @returns RouteRecordRaw[]
 */
const getRoutes = (): RouteRecordRaw[] => {
  const pages = import.meta.glob('./modules/*.ts')
  const routes: RouteRecordRaw[] = []

  Object.keys(pages).forEach(key => {
    console.log(key)
  })
  return routes
}

export { getRoutes }
