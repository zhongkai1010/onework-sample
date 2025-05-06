import type { ApiResult, PageResult } from '@/api'
import request from '@/utils/request'
import type {
  TransferOrder,
  AddTransferParams,
  ApproveTransferParams,
  ConfirmTransferParams,
  TransferQueryParams,
  TransferDetailQueryParams,
  TransferCatalogQueryParams,
  TransferDetailInfo,
  TransferCatalogItem
} from './model'

/**
 * 新增藏品拨库单
 * @param data 拨库单信息
 */
export async function addTransfer(data: AddTransferParams) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  if (!data.transferDate) {
    return Promise.reject(new Error('调拨日期不能为空'))
  }
  if (!data.warehouseId) {
    return Promise.reject(new Error('调拨仓库ID不能为空'))
  }
  if (!data.receiver) {
    return Promise.reject(new Error('接收人不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/transfer', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询拨库单分页列表
 * @param params 查询参数
 */
export async function listTransfers(params?: TransferQueryParams) {
  const res = await request.get<ApiResult<PageResult<TransferOrder>>>('/api/inventory/transfer', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除拨库单
 * @param ids 拨库单ID集合
 */
export async function removeTransfers(ids: number[]) {
  if (!ids || ids.length === 0) {
    return Promise.reject(new Error('拨库单ID集合不能为空'))
  }
  const res = await request.delete<ApiResult<unknown>>('/api/inventory/transfer', {
    data: { ids }
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 审核拨库单
 * @param data ID集合
 */
export async function approveTransfer(data: ApproveTransferParams) {
  if (!data.ids || data.ids.length === 0) {
    return Promise.reject(new Error('拨库单ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/transfer/approve', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 确认拨库单
 * @param data 拨库单ID
 */
export async function confirmTransfer(data: ConfirmTransferParams) {
  if (!data.id) {
    return Promise.reject(new Error('拨库单ID不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/inventory/transfer/confirm', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询拨库单详情
 * @param params 查询参数
 */
export async function getTransferDetails(params: TransferDetailQueryParams) {
  if (!params.id) {
    return Promise.reject(new Error('拨库单ID不能为空'))
  }
  const res = await request.get<ApiResult<TransferDetailInfo>>('/api/inventory/transfer/details', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询拨库目录分页列表
 * @param params 查询参数
 */
export async function getTransferCatalog(params?: TransferCatalogQueryParams) {
  const res = await request.get<ApiResult<PageResult<TransferCatalogItem>>>(
    '/api/inventory/transfer/catalog',
    { params }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
