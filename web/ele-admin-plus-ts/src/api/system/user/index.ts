import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { User, UserParam } from './model'

/**
 * 分页查询用户
 */
export async function pageUsers(params: UserParam) {
  const res = await request.get<ApiResult<PageResult<User>>>('/user/page', { params })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询用户列表
 */
export async function listUsers(params?: UserParam) {
  const res = await request.get<ApiResult<User[]>>('/user/list', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 根据id查询用户
 */
export async function getUser(id: number) {
  const res = await request.get<ApiResult<User>>('/user/get?id=' + id)
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 添加用户
 */
export async function addUser(data: User) {
  const res = await request.post<ApiResult<unknown>>('/user/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改用户
 */
export async function updateUser(data: User) {
  const res = await request.put<ApiResult<unknown>>('/user/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除用户
 */
export async function removeUser(id?: number) {
  const res = await request.delete<ApiResult<unknown>>('/user/update' + id)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 批量删除用户
 */
export async function removeUsers(data: (number | undefined)[]) {
  const res = await request.post<ApiResult<unknown>>('/user/delete', { ids: data })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改用户状态
 */
export async function updateUserStatus(id?: number, status?: number) {
  const res = await request.put<ApiResult<unknown>>('/user/updateStatus', {
    id,
    status
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 重置用户密码
 */
export async function updateUserPassword(id?: number, password = '123456') {
  const res = await request.put<ApiResult<unknown>>('/user/resetPassword', {
    id,
    password
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 导入用户
 */
export async function importUsers(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await request.post<ApiResult<unknown>>('/system/user/import', formData)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 检查用户是否存在
 */
export async function checkExistence(field: string, value: string, id?: number) {
  const res = await request.get<ApiResult<{ exists: boolean }>>('/user/checkExistence', {
    params: { field, value, id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data.exists
  }
  return Promise.reject(new Error(res.data.message))
}
