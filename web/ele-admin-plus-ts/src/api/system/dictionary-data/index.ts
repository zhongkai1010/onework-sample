import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { DictionaryData, DictionaryDataParam } from './model'

/**
 * 分页查询字典数据
 */
export async function pageDictionaryData(params: DictionaryDataParam) {
  const res = await request.get<ApiResult<PageResult<DictionaryData>>>('/DictionaryData/page', {
    params
  })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询字典数据列表
 */
export async function listDictionaryData(params: DictionaryDataParam) {
  const res = await request.get<ApiResult<DictionaryData[]>>('/DictionaryData/list', { params })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 添加字典数据
 */
export async function addDictionaryData(data: DictionaryData) {
  const res = await request.post<ApiResult<unknown>>('/DictionaryData/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改字典数据
 */
export async function updateDictionaryData(data: DictionaryData) {
  const res = await request.put<ApiResult<unknown>>('/DictionaryData/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除字典数据
 */
export async function removeDictionaryData(id?: number) {
  const res = await request.post<ApiResult<unknown>>('/DictionaryData/delete', { id })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 批量删除字典数据
 */
export async function removeDictionaryDataBatch(data: (number | undefined)[]) {
  const res = await request.post<ApiResult<unknown>>('/DictionaryData/delete', {
    id: data.join()
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
