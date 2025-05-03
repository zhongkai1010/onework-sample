import type { ApiResult } from '@/api'
import request from '@/utils/request'
import type { OutboundOrder, AddOutboundParams, OutboundQueryParams, OutboundDetailQueryParams, OutboundCatalogQueryParams, PageResult, OutboundDetailInfo, OutboundCatalogItem } from './model'

/**
 * 新增藏品出库单
 * @param data 出库单信息
 */
export async function addOutbound(data: AddOutboundParams) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/outbound/', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询出库单分页列表
 * @param params 查询参数
 */
export async function listOutbounds(params?: OutboundQueryParams) {
  const res = await request.get<ApiResult<PageResult<OutboundOrder>>>('/api/inventory/outbound', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除出库单
 * @param id 出库单ID
 */
export async function deleteOutbound(id: number) {
  if (!id) {
    return Promise.reject(new Error('出库单ID不能为空'))
  }
  const res = await request.delete<ApiResult<unknown>>('/api/inventory/outbound', { params: { id } })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 确认出库单
 * @param id 出库单ID
 */
export async function confirmOutbound(id: number) {
  if (!id) {
    return Promise.reject(new Error('出库单ID不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/outbound/confirm', { id })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 审核出库单
 * @param ids 出库单ID集合
 */
export async function approveOutbounds(ids: number[]) {
  if (!ids || ids.length === 0) {
    return Promise.reject(new Error('出库单ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/outbound/approve', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询出库单详情
 * @param params 查询参数
 */
export async function getOutboundDetails(params: OutboundDetailQueryParams) {
  if (!params.id) {
    return Promise.reject(new Error('出库单ID不能为空'))
  }
  const res = await request.get<ApiResult<OutboundDetailInfo>>('/api/inventory/outbound/details', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询出库目录
 * @param params 查询参数
 */
export async function getOutboundCatalog(params?: OutboundCatalogQueryParams) {
  const res = await request.get<ApiResult<PageResult<OutboundCatalogItem>>>('/api/inventory/outbound/catalog', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
