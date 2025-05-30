import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import { Collection, AddCollectionParams, CollectionQueryParams } from './model'

// 导入结果接口
export interface ImportResult {
  success: number
  error: number
  errorMessages: string[]
}

/**
 * 查询藏品编目分页列表
 */
export async function getCatalogs(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<Collection>>>('/CollectionCatalog/page', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询所有藏品【忽悠状态】
 */
export async function getAllCatalogs(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<Collection>>>('/CollectionCatalog/page_all', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 编辑藏品
 */
export async function update(data: Collection) {
  const res = await request.put<ApiResult<unknown>>('/CollectionCatalog/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除藏品
 */
export async function deleteCollections(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCatalog/delete', {
    ids
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 藏品登记
 */
export async function register(data: AddCollectionParams) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCatalog/register', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 审核通过藏品
 */
export async function approve(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCatalog/approve', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 导入藏品
 */
export async function importCollections(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await request.post<ApiResult<ImportResult>>('/CollectionCatalog/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  if (res.data.code === 0) {
    return {
      message: res.data.message,
      data: res.data.data
    }
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品详情
 */
export async function getDetails(id: number) {
  const res = await request.get<ApiResult<Collection>>('/CollectionCatalog/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询藏品预备帐分页列表
 */
export async function getPreparation(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<Collection>>>(
    '/CollectionCatalog/preparation',
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
 * 藏品退回编目
 */
export async function returnCollections(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCatalog/return', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 绑定RFID
 */
export async function bindRfid(data: { ids: number[]; rfidCode: string }) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCatalog/bindRfid', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 批量修改分类
 */
export async function updateCategory(data: { ids: number[]; categoryId: number }) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCatalog/updateCategory', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
