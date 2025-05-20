import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type {
  Exhibition,
  CreateExhibitionParams,
  UpdateExhibitionParams,
  ExhibitionQueryParams
} from './model'

/**
 * 获取艺术展览列表
 * @param params 查询参数
 */
export async function getExhibitionList(params: ExhibitionQueryParams) {
  const res = await request.get<ApiResult<{ list: Exhibition[]; count: number }>>(
    '/ArtistExhibition/page',
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
 * 添加艺术展览
 * @param data 展览信息
 */
export async function addExhibition(data: CreateExhibitionParams) {
  const res = await request.post<ApiResult<unknown>>('/ArtistExhibition/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询艺术展览详情
 * @param id 展览ID
 */
export async function getExhibitionDetail(id: string) {
  const res = await request.get<ApiResult<Exhibition>>('/ArtistExhibition/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改艺术展览
 * @param data 展览信息
 */
export async function updateExhibition(data: UpdateExhibitionParams) {
  const res = await request.put<ApiResult<unknown>>('/ArtistExhibition/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除艺术展览
 * @param ids 展览ID数组
 */
export async function deleteExhibition(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/ArtistExhibition/delete', {
    ids
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
