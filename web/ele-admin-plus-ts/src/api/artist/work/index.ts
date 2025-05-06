import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type {
  ArtistWork,
  CreateArtistWorkParams,
  UpdateArtistWorkParams,
  ArtistWorkQueryParams
} from './model'

/**
 * 添加艺术家作品
 * @param data 作品信息
 */
export async function addArtistWork(data: CreateArtistWorkParams) {
  const res = await request.post<ApiResult<unknown>>('/api/artist/work', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询艺术家作品分页列表
 * @param params 查询参数
 */
export async function getArtistWorkList(params: ArtistWorkQueryParams) {
  const res = await request.get<ApiResult<PageResult<ArtistWork>>>('/api/artist/work', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询艺术家作品详情
 * @param id 作品ID
 */
export async function getArtistWorkDetails(id: number) {
  const res = await request.get<ApiResult<ArtistWork>>('/api/artist/work/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改艺术家作品
 * @param data 作品信息
 */
export async function updateArtistWork(data: UpdateArtistWorkParams) {
  const res = await request.put<ApiResult<unknown>>('/api/artist/work', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除艺术家作品
 * @param ids 作品ID数组
 */
export async function deleteArtistWork(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/api/artist/work', {
    data: ids
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
