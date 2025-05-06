import type { ApiResult } from '@/api'
import request from '@/utils/request'
import type {
  InboundOrder,
  InboundCollection,
  InboundRegisterParams,
  InboundApproveParams,
  InboundConfirmParams,
  InboundQueryParams,
  InboundDetailsQueryParams,
  InboundCollectionQueryParams,
  InboundOrderDetail
} from './model'

/**
 * 根据入库类型查询藏品列表
 * 用于入库的时候选择藏品
 * @param type 入库类型,1:初次入库，2：归还入库
 */
export async function getCollectionsByType(type: number) {
  if (!type) {
    return Promise.reject(new Error('入库类型不能为空'))
  }
  const res = await request.get<ApiResult<InboundCollection[]>>(
    '/api/inventory/inbound/type/collection',
    { params: { type } }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 入库登记
 * 用于登记新的入库单
 * @param data 入库信息
 * @param data.type 入库类型,1:初次入库，2：归还入库
 * @param data.collectionIds 藏品ID集合
 * @param data.operator 经办人
 * @param data.warehouseId 接收库房
 * @param data.storageDate 入库日期
 * @param data.remarks 备注
 */
export async function createInbound(data: InboundRegisterParams) {
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
 * 用于查询入库单的列表信息
 * @param params 查询参数
 * @param params.status 单据状态，0：待审核，1：已审核、2：已入库
 * @param params.type 入库类型,1:初次入库，2：归还入库
 * @param params.collectionId 藏品ID
 * @param params.operator 经办人
 * @param params.warehouseId 接收库房
 * @param params.remarks 备注
 * @param params.limit 分页查询每页数量
 * @param params.page 分页查询页码
 * @param params.order 排序方式
 * @param params.sort 排序字段
 */
export async function getInboundList(params?: InboundQueryParams) {
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
 * 用于删除指定的入库单
 * @param ids 入库单ID集合
 */
export async function deleteInboundList(ids: number[]) {
  if (!ids || ids.length === 0) {
    return Promise.reject(new Error('入库单ID集合不能为空'))
  }
  const res = await request.delete<ApiResult<unknown>>('/api/inventory/inbound', { data: { ids } })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 入库单审核
 * 用于审核入库单
 * @param data ID集合
 * @param data.ids 需要审核的入库单ID集合
 */
export async function approveInboundList(data: InboundApproveParams) {
  const res = await request.post<ApiResult<unknown>>('/api/inventory/inbound/approve', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 确认入库
 * 用于确认入库单已完成入库
 * @param data 入库单ID
 * @param data.id 需要确认的入库单ID
 */
export async function confirmInboundOrder(data: InboundConfirmParams) {
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
 * 用于查询入库单的详细信息
 * @param params 查询参数
 * @param params.id 单据ID
 */
export async function getInboundOrderDetail(params: InboundDetailsQueryParams) {
  if (!params.id) {
    return Promise.reject(new Error('入库单ID不能为空'))
  }
  const res = await request.get<ApiResult<InboundOrderDetail>>('/api/inventory/inbound/details', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询可选择藏品分页列表（注销、出库、拨库）
 * 用于查询可选择进行注销、出库、拨库操作的藏品列表
 * @param params 查询参数
 * @param params.limit 分页查询每页数量
 * @param params.order 排序方式
 * @param params.page 分页查询页码
 * @param params.sort 排序字段
 */
export async function getInboundCollectionList(params?: InboundCollectionQueryParams) {
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

/**
 * 查询入库单明细（新）
 * 用于查询入库单的藏品明细列表
 * @param params 查询参数
 * @param params.code 入库单号
 * @param params.collectionId 藏品ID
 * @param params.warehouseId 接收库房ID
 * @param params.status 单据状态，0：待审核，1：已审核、2：已入库
 * @param params.limit 分页查询每页数量
 * @param params.order 排序方式
 * @param params.page 分页查询页码
 * @param params.sort 排序字段
 */
export async function getInboundCollectionCatalog(params?: InboundCollectionQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number
      list: InboundCollection[]
    }>
  >('/api/inventory/inbound/catalog', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
