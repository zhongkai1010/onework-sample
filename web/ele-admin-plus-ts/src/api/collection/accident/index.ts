import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type {
  Accident,
  AddAccidentParams,
  AccidentQueryParams,
  HandleAccidentParams
} from './model'

/**
 * 添加事故记录
 * @param data 事故记录信息
 */
export async function addAccident(data: AddAccidentParams) {
  const res = await request.post<ApiResult<unknown>>('/api/collection/accident', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询事故登记分页列表
 * @param params 查询参数
 */
export async function getAccidentList(params: AccidentQueryParams) {
  const res = await request.get<ApiResult<PageResult<Accident>>>('/api/collection/accident', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查看事故记录详情
 * @param id 事故记录ID
 */
export async function getAccidentDetails(id: number) {
  const res = await request.get<ApiResult<Accident>>('/api/collection/accident/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除事故记录
 * @param ids 事故记录ID集合
 */
export async function deleteAccidents(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/api/collection/accident', {
    data: { ids }
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 处理事故
 * @param data 处理信息
 */
export async function handleAccident(data: HandleAccidentParams) {
  const res = await request.post<ApiResult<unknown>>('/api/collection/accident/handle', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
