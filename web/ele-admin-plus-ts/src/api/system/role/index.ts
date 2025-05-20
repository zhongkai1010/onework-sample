import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Role, RoleParam } from './model'
import type { Menu } from '../menu/model'

/**
 * 分页查询角色
 */
export async function pageRoles(params: RoleParam) {
  const res = await request.get<ApiResult<PageResult<Role>>>('/Role/page', { params })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询角色列表
 */
export async function listRoles(params?: RoleParam) {
  const res = await request.get<ApiResult<Role[]>>('/Role/list', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 添加角色
 */
export async function addRole(data: Role) {
  const res = await request.post<ApiResult<unknown>>('/Role/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改角色
 */
export async function updateRole(data: Role) {
  const res = await request.put<ApiResult<unknown>>('/Role/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除角色
 */
export async function removeRole(id?: number) {
  const res = await request.post<ApiResult<unknown>>('/Role/delete', { id })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 批量删除角色
 */
export async function removeRoles(data: (number | undefined)[]) {
  const res = await request.post<ApiResult<unknown>>('/Role/delete', {
    id: data.join()
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取角色分配的菜单
 */
export async function listRoleMenus(roleId?: number) {
  const res = await request.get<ApiResult<Menu[]>>('/Role/getRoleMenu', {
    params: {
      roleId
    }
  })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改角色菜单
 */
export async function updateRoleMenus(roleId?: number, data?: number[]) {
  const res = await request.post<ApiResult<unknown>>('/Role/updateRoleMenu', {
    roleId,
    menuIds: data
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
