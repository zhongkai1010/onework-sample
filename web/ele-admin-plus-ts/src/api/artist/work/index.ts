import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type {
  ArtistWork,
  AddArtistWorkParams,
  ArtistWorkQueryParams
} from './model';

/**
 * 添加艺术家作品
 * @param data 作品信息
 */
export async function addArtistWork(data: AddArtistWorkParams) {
  const res = await request.post<ApiResult<unknown>>('/artist/work', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询艺术家作品分页列表
 * @param params 查询参数
 */
export async function getArtistWorkList(params: ArtistWorkQueryParams) {
  const res = await request.get<ApiResult<PageResult<ArtistWork>>>(
    '/artist/work',
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
 * 修改艺术家作品
 * @param data 作品信息
 */
export async function updateArtistWork(data: ArtistWork) {
  const res = await request.put<ApiResult<unknown>>('/artist/work', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除艺术家作品
 * @param id 作品ID
 */
export async function deleteArtistWork(id: string) {
  const res = await request.delete<ApiResult<unknown>>(`/artist/work/${id}`);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
