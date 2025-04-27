import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type {
  Cancellation,
  AddCancellationParams,
  CancellationQueryParams,
  ConfirmCancellationParams
} from './model';

/**
 * 添加注销记录
 * @param data 注销记录信息
 */
export async function addCancellation(data: AddCancellationParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/collection/cancellation',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询注销单分页列表
 * @param params 查询参数
 */
export async function getCancellationList(params: CancellationQueryParams) {
  const res = await request.get<ApiResult<PageResult<Cancellation>>>(
    '/api/collection/cancellation',
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
 * 修改注销记录
 * @param data 注销记录信息
 */
export async function updateCancellation(data: Cancellation) {
  const res = await request.put<ApiResult<unknown>>(
    '/api/collection/cancellation',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除注销记录
 * @param id 注销记录ID
 */
export async function deleteCancellation(id: string) {
  const res = await request.delete<ApiResult<unknown>>(
    `/api/collection/cancellation/${id}`
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 确认注销藏品
 * @param data 确认注销参数
 */
export async function confirmCancellation(data: ConfirmCancellationParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/collection/cancellation/confirm',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
