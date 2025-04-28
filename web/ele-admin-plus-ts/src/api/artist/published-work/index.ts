import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type {
  Publication,
  AddPublicationParams,
  PublicationQueryParams
} from './model';

/**
 * 新增出版著作
 * @param data 出版著作信息
 */
export async function addPublication(data: AddPublicationParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/artist/published-work',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询出版著作分页列表
 * @param params 查询参数
 */
export async function getPublicationList(params: PublicationQueryParams) {
  const res = await request.get<ApiResult<PageResult<Publication>>>(
    '/artist/published-work',
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
 * 修改出版著作
 * @param data 出版著作信息
 */
export async function updatePublication(data: Publication) {
  const res = await request.put<ApiResult<unknown>>(
    `/artist/published-work/${data.id}`,
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除出版著作
 * @param id 出版著作ID
 */
export async function deletePublication(id: string) {
  const res = await request.delete<ApiResult<unknown>>(
    `/artist/published-work/${id}`
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
