import { useRouter, useRoute } from 'vue-router'
import { EleMessage } from 'ele-admin-plus/es'
import type { TabItem, TabItemEventOption } from 'ele-admin-plus/es/ele-pro-layout/types'
import { useThemeStore } from '@/store/modules/theme'
import type { TabRemoveResult } from '@/store/modules/theme'
import { HOME_PATH, LAYOUT_PATH, REDIRECT_PATH } from '@/config/setting'

/**
 * 页签操作hook
 */
export function usePageTab() {
  const HOME_ROUTE = HOME_PATH || LAYOUT_PATH
  const route = useRoute()
  const { push, replace } = useRouter()
  const themeStore = useThemeStore()

  /**
   * 获取当前路由对应的页签key
   */
  const getRouteTabKey = () => {
    const { path, fullPath, meta } = route
    return meta.tabUnique === false ? fullPath : path
  }

  /**
   * 当前路由对应的页签key
   */
  const routeTabKey = getRouteTabKey()

  /**
   * 刷新当前路由
   */
  const reloadPageTab = (option?: TabReloadOptions) => {
    if (route.path.includes(REDIRECT_PATH)) {
      return
    }
    if (!option || !option.fullPath) {
      // 刷新当前路由
      setPageTab({ fullPath: route.fullPath, refresh: true })
      replace({ path: REDIRECT_PATH + route.path, query: route.query })
    } else {
      // 刷新指定页签
      setPageTab({ fullPath: option.fullPath, refresh: true })
      replace(REDIRECT_PATH + option.fullPath)
    }
  }

  /**
   * 关闭当前页签
   */
  const finishPageTab = () => {
    removePageTab({ key: routeTabKey, active: getRouteTabKey() })
  }

  /**
   * 关闭指定页签
   */
  const removePageTab = (option: TabItemEventOption) => {
    themeStore
      .tabRemove(option)
      .then((result) => {
        handleRemoveDone(result)
      })
      .catch(() => {
        EleMessage.error('当前页签不可关闭')
      })
  }

  /**
   * 关闭左侧页签
   */
  const removeLeftPageTab = (option: TabItemEventOption) => {
    themeStore
      .tabRemoveLeft(option)
      .then((result) => {
        handleRemoveDone(result)
      })
      .catch(() => {
        EleMessage.error('左侧没有可关闭的页签')
      })
  }

  /**
   * 关闭右侧页签
   */
  const removeRightPageTab = (option: TabItemEventOption) => {
    themeStore
      .tabRemoveRight(option)
      .then((result) => {
        handleRemoveDone(result)
      })
      .catch(() => {
        EleMessage.error('右侧没有可关闭的页签')
      })
  }

  /**
   * 关闭其它页签
   */
  const removeOtherPageTab = (option: TabItemEventOption) => {
    themeStore
      .tabRemoveOther(option)
      .then((result) => {
        handleRemoveDone(result)
      })
      .catch(() => {
        EleMessage.error('没有可关闭的页签')
      })
  }

  /**
   * 关闭全部页签
   */
  const removeAllPageTab = (option: TabItemEventOption) => {
    themeStore
      .tabRemoveAll(option)
      .then((result) => {
        handleRemoveDone(result)
      })
      .catch(() => {
        EleMessage.error('没有可关闭的页签')
      })
  }

  /**
   * 页签移除方法完成操作
   */
  const handleRemoveDone = ({ path, home }: TabRemoveResult) => {
    if (path) {
      push(path)
    } else if (home) {
      push(HOME_ROUTE)
    }
  }

  /**
   * 更新页签数据
   * @param data 页签数据
   */
  const setPageTabs = (data: TabItem[]) => {
    themeStore.setTabs(data)
  }

  /**
   * 登录成功后清空页签
   */
  const cleanPageTabs = () => {
    setPageTabs([])
  }

  /**
   * 添加页签
   * @param data 页签数据
   */
  const addPageTab = (data: TabItem) => {
    themeStore.tabAdd(data)
  }

  /**
   * 修改页签
   * @param data 页签数据
   */
  const setPageTab = (data: TabItem) => {
    themeStore.tabSetItem(data)
  }

  /**
   * 修改当前页签标题
   * @param title 标题
   */
  const setPageTabTitle = (title: string) => {
    setPageTab({ key: routeTabKey, title })
  }

  /**
   * 登录成功后跳转首页
   * @param from 登录前的地址
   */
  const goHomeRoute = (from?: string) => {
    replace(from ? decodeURIComponent(from) : HOME_ROUTE)
  }

  return {
    reloadPageTab,
    finishPageTab,
    removePageTab,
    removeLeftPageTab,
    removeRightPageTab,
    removeOtherPageTab,
    removeAllPageTab,
    setPageTabs,
    cleanPageTabs,
    addPageTab,
    setPageTab,
    setPageTabTitle,
    getRouteTabKey,
    goHomeRoute,
    routeTabKey
  }
}

/**
 * 刷新页签参数类型
 */
export interface TabReloadOptions {
  /** 路由地址 */
  fullPath?: string
}
