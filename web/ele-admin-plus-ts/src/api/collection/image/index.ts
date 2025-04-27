import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type { Image, AddImageParams, ImageQueryParams } from './model';

/**
 * 添加影像
 * @param data 影像信息
 */
export async function addImage(data: AddImageParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/collection/image',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询影像分页列表
 * @param params 查询参数
 */
export async function getImageList(params: ImageQueryParams) {
  const res = await request.get<ApiResult<PageResult<Image>>>(
    '/api/collection/image',
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
 * 修改影像
 * @param data 影像信息
 */
export async function updateImage(data: Image) {
  const res = await request.put<ApiResult<unknown>>(
    '/api/collection/image',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除影像
 * @param id 影像ID
 */
export async function deleteImage(id: string) {
  const res = await request.delete<ApiResult<unknown>>(
    `/api/collection/image/${id}`
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
