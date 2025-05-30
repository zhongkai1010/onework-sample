/**
 * 菜单
 */
export interface Menu {
  /** 菜单id */
  id?: number
  /** 上级id, 0是顶级 */
  parentId?: number
  /** 菜单名称 */
  title?: string
  /** 菜单路由地址 */
  path: string
  /** 菜单组件地址 */
  component?: string
  /** 菜单类型, 0菜单, 1按钮 */
  menuType?: number
  /** 排序号 */
  sortNumber?: number
  /** 权限标识 */
  authority?: string
  /** 菜单图标 */
  icon?: string
  /** 是否隐藏, 0否,1是(仅注册路由不显示左侧菜单) */
  hide?: number
  /** 路由元信息 */
  meta?: any
  /** 创建时间 */
  createTime?: string
  /** 子菜单 */
  children?: Menu[]
  /** 打开方式 */
  openType?: number
  /** 权限树回显选中状态, 0未选中, 1选中 */
  checked?: boolean
  /** 父级重定向 */
  redirect?: string
}

/**
 * 菜单搜索参数
 */
export interface MenuParam {
  /** 菜单名称 */
  title?: string
  /** 菜单路由地址 */
  path?: string
  /** 权限标识 */
  authority?: string
  /** 上级id */
  parentId?: number
}
