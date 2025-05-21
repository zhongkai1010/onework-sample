import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type { User } from '@/api/system/user/model'
import type { UpdatePasswordParam } from './model'

/**
 * 获取当前登录用户的个人信息/菜单/权限/角色
 */
export async function getUserInfo(): Promise<User> {
  const res = await request.get<ApiResult<User>>('/Personal/user', {
    // baseURL: '/mock'
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改当前登录用户的密码
 */
export async function updatePassword(data: UpdatePasswordParam): Promise<string> {
  const res = await request.put<ApiResult<unknown>>('/Personal/updatePassword', data)
  if (res.data.code === 0) {
    return res.data.message ?? '修改成功'
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改当前登录用户的个人信息
 */
export async function updateUserInfo(data: User): Promise<User> {
  const res = await request.put<ApiResult<User>>('/Personal/update', data)
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
