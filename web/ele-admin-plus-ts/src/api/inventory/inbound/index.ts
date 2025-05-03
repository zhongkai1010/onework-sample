import type { ApiResult } from '@/api'
import request from '@/utils/request'
import type { InboundOrder, InboundCollection, InboundRegisterParams, InboundApproveParams, InboundConfirmParams, InboundQueryParams, InboundDetailsQueryParams, InboundCollectionQueryParams, InboundOrderDetail } from './model'

/**
 * 根据入库类型查询藏品列表
 * @param type 入库类型,1:初次入库，2：归还入库
 */
export async function listCollectionsByType(type: number) {
  if (!type) {
    return Promise.reject(new Error('入库类型不能为空'))
  }
  const res = await request.get<ApiResult<InboundCollection[]>>('/api/inventory/inbound/type/collection', { params: { type } })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 入库登记
 * @param data 入库信息
 */
export async function registerInbound(data: InboundRegisterParams) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/inbound/register', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询入库单分页列表
 * @param params 查询参数
 */
export async function listInbounds(params?: InboundQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number
      list: InboundOrder[]
    }>
  >('/api/inventory/inbound', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除入库单
 * @param ids 入库单ID集合
 */
export async function deleteInbound(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/api/inventory/inbound', { data: { ids } })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 入库单审核
 * @param data ID集合
 */
export async function approveInbound(data: InboundApproveParams) {
  const res = await request.post<ApiResult<unknown>>('/api/inventory/inbound/approve', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 确认入库
 * @param data 入库单ID
 */
export async function confirmInbound(data: InboundConfirmParams) {
  if (!data.id) {
    return Promise.reject(new Error('入库单ID不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/inbound/confirm', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取入库单详情
 * @param params 查询参数
 */
export async function getInboundDetails(params: InboundDetailsQueryParams) {
  if (!params.id) {
    return Promise.reject(new Error('入库单ID不能为空'))
  }
  const res = await request.get<ApiResult<InboundOrderDetail>>('/api/inventory/inbound/details', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询入库单明细
 * @param params 查询参数
 */
export async function getInboundCollections(params?: InboundCollectionQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number
      list: InboundCollection[]
    }>
  >('/api/inventory/inbound/collection', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
