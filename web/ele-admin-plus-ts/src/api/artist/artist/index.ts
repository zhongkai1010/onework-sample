import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { Artist, ArtistQueryParams } from './model';

/**
 * 获取艺术家列表
 * @param params 查询参数
 */
async function getArtistList(params: ArtistQueryParams) {
  const res = await request.get<ApiResult<PageResult<Artist>>>('/artist/list', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取艺术家详情
 * @param id 艺术家ID
 */
async function getArtistDetail(id: number) {
  const res = await request.get<ApiResult<Artist>>(`/artist/${id}`);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 创建艺术家
 * @param data 艺术家信息
 */
async function createArtist(
  data: Omit<Artist, 'id' | 'createTime' | 'updateTime'>
) {
  const res = await request.post<ApiResult<unknown>>('/artist', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 更新艺术家
 * @param data 艺术家信息
 */
async function updateArtist(data: Partial<Artist>) {
  const res = await request.put<ApiResult<unknown>>('/artist', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除艺术家
 * @param id 艺术家ID
 */
async function deleteArtist(id: number) {
  const res = await request.delete<ApiResult<unknown>>(`/artist/${id}`);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getArtistList,
  getArtistDetail,
  createArtist,
  updateArtist,
  deleteArtist
};
