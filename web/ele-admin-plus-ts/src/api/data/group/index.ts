import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Group, GroupQueryParams, GroupEditParams, DeleteGroupParams, GroupCollectionQueryParams, GroupCollection } from './model'

/**
 * 查询藏品组分页列表
 * @param params 查询参数
 * @returns 藏品组分页数据
 */
export async function getGroupPage(params: GroupQueryParams) {
  const res = await request.get<ApiResult<PageResult<Group>>>('/api/data/group', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 查询全部藏品分组
 * @param groupName 分组名称
 * @returns 藏品组列表
 */
export async function getAllGroups(groupName?: string) {
  const res = await request.get<ApiResult<Group[]>>('/api/data/group/all', {
    params: { groupName }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 根据藏品组查询藏品分页列表
 * @param params 查询参数
 * @returns 藏品分页数据
 */
export async function getGroupCollections(params: GroupCollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<GroupCollection>>>('/api/data/group/collection', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 查询藏品组详情
 * @param id 藏品组ID
 * @returns 藏品组详情
 */
export async function getGroupDetails(id: number) {
  const res = await request.get<ApiResult<Group>>('/api/data/group/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 新增藏品组
 * @param data 藏品组信息
 * @returns 操作结果消息
 */
export async function addGroup(data: Omit<GroupEditParams, 'id'>) {
  const res = await request.post<ApiResult<null>>('/api/data/group', data)
  if (res.data.code === 0) {
    return res.data.message || '新增成功'
  }
  return Promise.reject(new Error(res.data.message || '新增失败'))
}

/**
 * 修改藏品组
 * @param data 藏品组信息
 * @returns 操作结果消息
 */
export async function updateGroup(data: GroupEditParams) {
  const res = await request.put<ApiResult<null>>('/api/data/group', data)
  if (res.data.code === 0) {
    return res.data.message || '修改成功'
  }
  return Promise.reject(new Error(res.data.message || '修改失败'))
}

/**
 * 删除藏品组
 * @param data 藏品组ID集合
 * @returns 操作结果消息
 */
export async function removeGroups(data: DeleteGroupParams) {
  const res = await request.delete<ApiResult<null>>('/api/data/group', {
    data
  })
  if (res.data.code === 0) {
    return res.data.message || '删除成功'
  }
  return Promise.reject(new Error(res.data.message || '删除失败'))
}

/**
 * 审核分组
 * @param data 藏品组ID集合
 * @returns 操作结果消息
 */
export async function approveGroups(data: DeleteGroupParams) {
  const res = await request.post<ApiResult<null>>('/api/data/group/approve', data)
  if (res.data.code === 0) {
    return res.data.message || '审核成功'
  }
  return Promise.reject(new Error(res.data.message || '审核失败'))
}
