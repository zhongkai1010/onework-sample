import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Repair, AddRepairParams, RepairQueryParams } from './model'

/**
 * 修复登记
 * @param data 修复记录信息
 */
export async function addRepair(data: AddRepairParams) {
  const res = await request.post<ApiResult<unknown>>('/api/collection/repair', data)
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
  const res = await request.get<ApiResult<PageResult<Repair>>>('/api/collection/repair', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品修复记录详情
 * @param id 修复记录ID
 */
export async function getRepairDetails(id: number) {
  const res = await request.get<ApiResult<Repair>>('/api/collection/repair/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修复入藏
 * @param data 修复记录信息
 */
export async function repairInbound(data: Repair) {
  const res = await request.post<ApiResult<unknown>>('/api/collection/repair/inbound', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
