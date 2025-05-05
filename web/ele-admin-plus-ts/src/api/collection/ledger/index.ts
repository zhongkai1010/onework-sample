import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { CollectionLedger, LedgerQueryParams, RepairRecord, OutboundRecord, TransferRecord, BooksLedger } from './model/index'

/**
 * 查询藏品台账分页列表
 * @param params 查询参数
 */
export async function getLedgerList(params: LedgerQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionLedger>>>('/api/collection/ledger', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品修复记录分页列表
 * @param params 查询参数
 */
export async function getRepairList(params: { collectionId: number; page: number; limit: number; sort?: string; order?: string }) {
  const res = await request.get<ApiResult<PageResult<RepairRecord>>>('/api/collection/ledger/repair', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品出库记录分页列表
 * @param params 查询参数
 */
export async function getOutboundList(params: { collectionId: number; page: number; limit: number; sort?: string; order?: string }) {
  const res = await request.get<ApiResult<PageResult<OutboundRecord>>>('/api/collection/ledger/outbound', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品调拨记录分页列表
 * @param params 查询参数
 */
export async function getTransferList(params: { collectionId: number; page: number; limit: number; sort?: string; order?: string }) {
  const res = await request.get<ApiResult<PageResult<TransferRecord>>>('/api/collection/ledger/transfer', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询图书总账分页列表
 * @param params 查询参数
 */
export async function getBooksLedgerList(params: { bookValue?: string; page?: number; limit?: number; sort?: string; order?: string }) {
  const res = await request.get<ApiResult<PageResult<BooksLedger>>>('/api/collection/books/ledger', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 藏品位置变更
 * @param data 变更数据
 */
export async function changeWarehouse(data: { collectionIds: number[]; warehouseId: string }) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  if (!data.warehouseId) {
    return Promise.reject(new Error('仓库ID不能为空'))
  }
  const res = await request.put<ApiResult<unknown>>('/api/collection/changeWarehouse', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 编入藏品组
 * @param data 编组数据
 */
export async function changeClassification(data: { collectionIds: number[]; groupId: string }) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  if (!data.groupId) {
    return Promise.reject(new Error('分组ID不能为空'))
  }
  const res = await request.put<ApiResult<unknown>>('/api/collection/changeClassification', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 导入藏品台账
 * @param file 文件对象
 */
export async function importLedgers(file: File) {
  if (!file) {
    return Promise.reject(new Error('文件不能为空'))
  }
  const formData = new FormData()
  formData.append('file', file)
  const res = await request.post<ApiResult<unknown>>('/api/collection/ledger/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 图书退回编目
 * @param data 退回数据
 */
export async function returnBooks(data: { collectionIds: number[] }) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/collection/books/return', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 藏品退回编目
 * @param data 退回数据
 */
export async function returnLedgers(data: { collectionIds: number[] }) {
  if (!data.collectionIds || data.collectionIds.length === 0) {
    return Promise.reject(new Error('藏品ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>('/api/collection/ledger/return', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
