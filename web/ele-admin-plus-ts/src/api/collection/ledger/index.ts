import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type {
  CollectionLedger,
  LedgerQueryParams,
  RepairRecord,
  OutboundRecord,
  TransferRecord,
  BooksLedger
} from './model/index'

/**
 * 查询藏品台账分页列表
 * @param params 查询参数
 */
export async function getLedgerList(params: LedgerQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionLedger>>>('/CollectionLedger/list', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品修复记录分页列表
 * @param params 查询参数
 */
export async function getCollectionRepairList(params: {
  collectionId: number
  page: number
  limit: number
  sort?: string
  order?: string
}) {
  const res = await request.get<ApiResult<PageResult<RepairRecord>>>(
    '/CollectionLedger/ledgerRepair',
    { params }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品出库记录分页列表
 * @param params 查询参数
 */
export async function getCollectionOutboundList(params: {
  collectionId: number
  page: number
  limit: number
  sort?: string
  order?: string
}) {
  const res = await request.get<ApiResult<PageResult<OutboundRecord>>>(
    '/CollectionLedger/ledgerOutbound',
    { params }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品调拨记录分页列表
 * @param params 查询参数
 */
export async function getCollectionTransferList(params: {
  collectionId: number
  page: number
  limit: number
  sort?: string
  order?: string
}) {
  const res = await request.get<ApiResult<PageResult<TransferRecord>>>(
    '/CollectionLedger/ledgerTransfer',
    { params }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询图书总账分页列表
 * @param params 查询参数
 */
export async function getBooksLedgerList(params: {
  bookValue?: string
  page?: number
  limit?: number
  sort?: string
  order?: string
}) {
  const res = await request.get<ApiResult<PageResult<BooksLedger>>>(
    '/CollectionLedger/booksLedger',
    { params }
  )
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
  const res = await request.put<ApiResult<unknown>>('/CollectionLedger/changeWarehouse', data)
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
  const res = await request.put<ApiResult<unknown>>('/CollectionLedger/changeClassification', data)
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
  const formData = new FormData()
  formData.append('file', file)
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/import', formData, {
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
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/booksReturn', data)
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
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/return', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

export async function imgsbatch(data: { id: number[]; documentImage: string }) {
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/imgsbatch', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品总账分页列表
 */
export async function getLedgers(params: LedgerQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionLedger>>>('/CollectionLedger/page', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品总账详情
 */
export async function getDetails(id: number) {
  const res = await request.get<ApiResult<CollectionLedger>>('/CollectionLedger/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品总账预备帐分页列表
 */
export async function getPreparation(params: LedgerQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionLedger>>>(
    '/CollectionLedger/preparation',
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
 * 藏品退回总账
 */
export async function returnCollections(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/return', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 绑定RFID
 */
export async function bindRfid(data: { ids: number[]; rfidCode: string }) {
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/bindRfid', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 批量修改分类
 */
export async function updateCategory(data: { ids: number[]; categoryId: number }) {
  const res = await request.post<ApiResult<unknown>>('/CollectionLedger/updateCategory', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
