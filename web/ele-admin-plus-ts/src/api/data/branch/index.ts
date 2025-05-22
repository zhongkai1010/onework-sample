import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type {
  BranchInfo,
  BranchQueryParams,
  BranchAddParams,
  BranchUpdateParams,
  BranchDeleteParams,
  BranchPageResult
} from './model'

/**
 * 查询分馆列表
 * @param params 查询参数
 */
export async function getBranchList(params?: BranchQueryParams) {
  const res = await request.get<ApiResult<BranchInfo[]>>('/BranchHall/list', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 分页查询分馆
 * @param params 查询参数
 */
export async function getBranchPage(params?: BranchQueryParams) {
  const res = await request.get<ApiResult<BranchPageResult>>('/BranchHall/page', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 添加分馆
 * @param data 分馆信息
 */
export async function addBranch(data: BranchAddParams) {
  const res = await request.post<ApiResult<unknown>>('/BranchHall/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 更新分馆
 * @param data 分馆信息
 */
export async function updateBranch(data: BranchUpdateParams) {
  const res = await request.post<ApiResult<unknown>>('/BranchHall/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除分馆
 * @param data 分馆ID集合
 */
export async function deleteBranch(data: BranchDeleteParams) {
  const res = await request.post<ApiResult<unknown>>('/BranchHall/delete', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取分馆详情
 * @param id 分馆ID
 */
export async function getBranchInfo(id: string) {
  const res = await request.get<ApiResult<BranchInfo>>('/BranchHall/get', { params: { id } })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
