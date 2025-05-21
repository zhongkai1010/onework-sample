import type { ApiResult, PageResult } from '@/api'
import request from '@/utils/request'
import type {
  TransferOrder,
  AddTransferParams,
  ApproveTransferParams,
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
  const res = await request.post<ApiResult<unknown>>('/WarehouseCollectionTransfer/transfer', data)
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
  const res = await request.get<ApiResult<PageResult<TransferOrder>>>(
    '/WarehouseCollectionTransfer/list',
    {
      params
    }
  )
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
  const res = await request.post<ApiResult<unknown>>('/WarehouseCollectionTransfer/delete', {
    ids
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
  const res = await request.post<ApiResult<unknown>>('/WarehouseCollectionTransfer/approve', data)
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
  const res = await request.get<ApiResult<TransferDetailInfo>>(
    '/WarehouseCollectionTransfer/details',
    {
      params
    }
  )
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
    '/WarehouseCollectionTransfer/catalog',
    { params }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

export async function WarehouseCollectionTransferImgs(data: { id: number; documentImage: string }) {
  const res = await request.post<ApiResult<unknown>>('/WarehouseCollectionTransfer/imgs', data)

  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
