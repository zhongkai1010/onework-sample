import type { PageParam } from '@/api'

/**
 * 角色
 */
export interface Role {
  /** 角色id */
  id?: number
  /** 角色标识 */
  roleCode?: string
  /** 角色名称 */
  roleName?: string
  /** 备注 */
  comments?: string
  /** 创建时间 */
  createTime?: string
}

/**
 * 角色搜索条件
 */
export interface RoleParam extends PageParam {
  /** 角色名称 */
  roleName?: string
  /** 角色标识 */
  roleCode?: string
  /** 备注 */
  comments?: string
}
