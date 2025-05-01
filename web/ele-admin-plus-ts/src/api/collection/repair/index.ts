import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Repair, AddRepairParams, RepairQueryParams } from './model'

/**
 * 修复登记
 * @param data 修复记录信息
 */
export async function addRepair(data: AddRepairParams) {
  const res = await request.post<ApiResult<unknown>>('/collection/repair', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品修复记录分页列表
 * @param params 查询参数
 */
export async function getRepairList(params: RepairQueryParams) {
  const res = await request.get<ApiResult<PageResult<Repair>>>('/collection/repair', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改修复记录
 * @param data 修复记录信息
 */
export async function updateRepair(data: Repair) {
  const res = await request.put<ApiResult<unknown>>('/collection/repair', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除修复记录
 * @param id 修复记录ID
 */
export async function deleteRepair(id: string) {
  const res = await request.delete<ApiResult<unknown>>(`/collection/repair/${id}`)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修复完成
 * @param data 修复记录信息
 */
export async function completeRepair(data: Repair) {
  const res = await request.post<ApiResult<unknown>>('/collection/repair/complete', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
