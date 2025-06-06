/**
 * 登录用户状态管理
 */
import { defineStore } from 'pinia'
import type { BadgeProps } from 'element-plus'
import { mapTree, isExternalLink } from 'ele-admin-plus/es'
import type { MenuItem } from 'ele-admin-plus/es/ele-pro-layout/types'
import type { User } from '@/api/system/user/model'
import type { Menu } from '@/api/system/menu/model'
import type { DictionaryData } from '@/api/system/dictionary-data/model'
import { getUserInfo } from '@/api/layout'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/token-util'
/** 直接指定菜单数据 */
const USER_MENUS: Menu[] | null = null

export interface UserState {
  info: User | null
  menus: MenuItem[] | null
  authorities: (string | undefined)[]
  roles: (string | undefined)[]
  dicts: Record<string, DictionaryData[]>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    /** 当前登录用户的信息 */
    info: null,
    /** 当前登录用户的菜单 */
    menus: null,
    /** 当前登录用户的权限 */
    authorities: [],
    /** 当前登录用户的角色 */
    roles: [],
    /** 字典数据缓存 */
    dicts: {}
  }),
  actions: {
    /**
     * 请求登录用户的个人信息/权限/角色/菜单
     */
    async fetchUserInfo() {
      const router = useRouter()
      const result = await getUserInfo()

      if (result.code === 2) {
        // 清除 token
        removeToken()
        // 清除用户信息
        this.info = null
        this.menus = null
        this.authorities = []
        this.roles = []
        // 跳转登录页
        router.push('/login')
        return {}
      }

      if (result.code === 0 && result.data) {
        // 用户信息
        this.setInfo(result.data)
        // 用户权限
        if (result.data.authorities) {
          this.authorities =
            result.data.authorities.map((d) => d.authority).filter((a) => !!a) ?? []
        }
        // 用户角色
        this.roles = result.data.roles?.map?.((d) => d.roleCode) ?? []
        // 用户菜单, 过滤掉按钮类型并转为children形式
        const { menus, homePath } = formatMenus(
          USER_MENUS ??
            result.data.authorities
              ?.filter?.((d) => d.menuType !== 1)
              .sort((a, b) => (a.sortNumber ?? 0) - (b.sortNumber ?? 0)) ??
            []
        )
        this.setMenus(menus)
        return { menus, homePath }
      }

      return {}
    },
    /**
     * 更新用户信息
     */
    setInfo(value: User) {
      this.info = value
    },
    /**
     * 更新菜单数据
     */
    setMenus(menus: MenuItem[] | null) {
      this.menus = menus
    },
    /**
     * 更新菜单的徽章
     * @param path 菜单地址
     * @param value 徽章值
     * @param type 徽章类型
     */
    setMenuBadge(path: string, value?: number | string | null, type?: BadgeProps['type']) {
      this.menus = mapTree(this.menus, (m) => {
        if (path === m.path) {
          const meta = m.meta || {}
          return {
            ...m,
            meta: {
              ...meta,
              props: {
                ...meta.props,
                badge: value == null ? void 0 : { value, type }
              }
            }
          }
        }
        return m
      })
    },
    /**
     * 更新字典数据
     */
    setDicts(value: DictionaryData[] | Record<string, DictionaryData[]>, code?: string | null) {
      if (code == null) {
        this.dicts = value as Record<string, DictionaryData[]>
        return
      }
      this.dicts[code] = value as DictionaryData[]
    }
  }
})

/**
 * 菜单数据处理为EleProLayout所需要的格式
 * @param data 菜单数据
 * @param childField 子级的字段名称
 */
function formatMenus(data: Menu[], childField = 'children') {
  let homePath: string | undefined
  let homeTitle: string | undefined
  const menus = mapTree<Menu, MenuItem>(
    data,
    (item) => {
      let meta: MenuItem['meta'] = {}
      try {
        meta = typeof item.meta === 'string' ? JSON.parse(item.meta || '{}') : item.meta
      } catch (error) {}

      const menu: MenuItem = {
        path: item.path,
        component: item.component,
        meta: { title: item.title, icon: item.icon, hide: !!item.hide, ...meta }
      }
      const children = item[childField]
        ? item[childField].filter((d: any) => !(d.meta?.hide ?? d.hide))
        : void 0
      if (!children?.length) {
        if (!homePath && menu.path && !isExternalLink(menu.path)) {
          homePath = menu.path
          homeTitle = menu.meta?.title
        }
      } else {
        const childPath = children[0].path
        if (childPath) {
          if (!menu.redirect) {
            menu.redirect = childPath
          }
          if (!menu.path) {
            menu.path = childPath.substring(0, childPath.lastIndexOf('/'))
          }
        }
      }
      if (!menu.path) {
        console.error('菜单path不能为空且要唯一:', item)
        return
      }
      return menu
    },
    childField
  )
  return { menus, homePath, homeTitle }
}
