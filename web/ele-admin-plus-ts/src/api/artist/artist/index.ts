import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Artist, ArtistQueryParams } from './model';

/**
 * 查询艺术家分页列表
 * @param params 查询参数
 */
export async function getArtistList(params: ArtistQueryParams) {
  const res = await request.get<ApiResult<PageResult<Artist>>>(
    '/api/artist/artist',
    {
      params
    }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询艺术家详情
 * @param id 艺术家ID
 */
export async function getArtistDetail(id: string) {
  const res = await request.get<ApiResult<Artist>>(`/api/artist/artist/${id}`);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加艺术家
 * @param data 艺术家信息
 */
export async function createArtist(data: Omit<Artist, 'id'>) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/artist/artist',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改艺术家
 * @param data 艺术家信息
 */
export async function updateArtist(data: Artist) {
  const res = await request.put<ApiResult<unknown>>('/api/artist/artist', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除艺术家
 * @param id 艺术家ID
 */
export async function deleteArtist(id: string) {
  const res = await request.delete<ApiResult<unknown>>(
    `/api/artist/artist/${id}`
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
