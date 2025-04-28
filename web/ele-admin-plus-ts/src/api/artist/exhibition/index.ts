import request from '@/utils/request';
import type { ApiResult } from '@/api';
import type { Exhibition, AddExhibitionParams } from './model';

/**
 * 添加艺术展览
 * @param data 展览信息
 */
export async function addExhibition(data: AddExhibitionParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/artist/exhibition',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询艺术展览详情
 * @param id 展览ID
 */
export async function getExhibition(id: string) {
  const res = await request.get<ApiResult<Exhibition>>(
    `/artist/exhibition/${id}`
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改艺术展览
 * @param data 展览信息
 */
export async function updateExhibition(data: Exhibition) {
  const res = await request.put<ApiResult<unknown>>('/artist/exhibition', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除艺术展览
 * @param id 展览ID
 */
export async function deleteExhibition(id: string) {
  const res = await request.delete<ApiResult<unknown>>(
    `/artist/exhibition/${id}`
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
