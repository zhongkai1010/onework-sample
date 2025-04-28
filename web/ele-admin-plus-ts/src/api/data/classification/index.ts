import type { ApiResult } from '@/api';
import request from '@/utils/request';
import type {
  Classification,
  AddClassificationParams,
  UpdateClassificationParams,
  DeleteClassificationParams,
  ClassificationQueryParams
} from './model';

/**
 * 查询藏品组分页列表
 * @param params 查询参数
 */
export async function listClassifications(params?: ClassificationQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number;
      list: Classification[];
    }>
  >('/data/classification', { params });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 新增藏品组
 * @param data 藏品组信息
 */
export async function addClassification(data: AddClassificationParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/data/classification',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改藏品组
 * @param data 藏品组信息
 */
export async function updateClassification(data: UpdateClassificationParams) {
  const res = await request.put<ApiResult<unknown>>(
    '/data/classification',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除藏品组
 * @param data ID集合
 */
export async function removeClassifications(data: DeleteClassificationParams) {
  const res = await request.delete<ApiResult<unknown>>('/data/classification', {
    data
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
