import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Publication, CreatePublicationParams, UpdatePublicationParams, PublicationQueryParams } from './model'

/**
 * 新增出版著作
 * @param data 出版著作信息
 */
export async function addPublication(data: CreatePublicationParams) {
  const res = await request.post<ApiResult<unknown>>('/api/artist/published-work', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询出版著作分页列表
 * @param params 查询参数
 */
export async function getPublicationList(params: PublicationQueryParams) {
  const res = await request.get<ApiResult<PageResult<Publication>>>('/api/artist/published-work', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询出版著作详情
 * @param id 出版著作ID
 */
export async function getPublicationDetails(id: number) {
  const res = await request.get<ApiResult<Publication>>('/api/artist/published-work/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改出版著作
 * @param data 出版著作信息
 */
export async function updatePublication(data: UpdatePublicationParams) {
  const res = await request.put<ApiResult<unknown>>('/api/artist/published-work', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除出版著作
 * @param ids 出版著作ID数组
 */
export async function deletePublication(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/api/artist/published-work', {
    data: ids
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
