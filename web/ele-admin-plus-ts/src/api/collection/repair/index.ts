import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Repair, AddRepairParams, RepairQueryParams } from './model'

/**
 * 修复登记
 * @param data 修复记录信息
 */
export async function addRepair(data: AddRepairParams) {
  const res = await request.post<ApiResult<unknown>>('/CollectionRepair/add', data)
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
  const res = await request.get<ApiResult<PageResult<Repair>>>('/CollectionRepair/page', {
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
  const res = await request.get<ApiResult<Repair>>('/CollectionRepair/details', {
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
  const res = await request.post<ApiResult<unknown>>('/CollectionRepair/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 上传修复记录图片
 * @param id 修复记录ID
 * @param documentImage 单据图片
 */
export async function uploadRepairImage(id: number, documentImage: string) {
  const res = await request.post<ApiResult<unknown>>('/CollectionRepair/imgs', {
    id,
    documentImage
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除修复记录
 * @param ids 修复记录ID数组
 */
export async function deleteRepair(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionRepair/delete', {
    ids: ids.map((id) => id.toString())
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
