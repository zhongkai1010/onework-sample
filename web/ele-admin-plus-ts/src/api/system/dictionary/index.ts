import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type { Dictionary, DictionaryParam } from './model'

/**
 * 分页查询字典列表
 */
export async function pageDictionaries(params: DictionaryParam) {
  const res = await request.get<ApiResult<Dictionary[]>>('/system/dictionary/page', { params })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询字典列表
 */
export async function listDictionaries(params?: DictionaryParam) {
  const res = await request.get<ApiResult<Dictionary[]>>('/dictionary/list', {
    params
  })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 添加字典
 */
export async function addDictionary(data: Dictionary) {
  const res = await request.post<ApiResult<unknown>>('/dictionary/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改字典
 */
export async function updateDictionary(data: Dictionary) {
  const res = await request.put<ApiResult<unknown>>('/dictionary/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除字典
 */
export async function removeDictionary(id?: number) {
  const res = await request.post<ApiResult<unknown>>('/dictionary/delete', {
    id
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
