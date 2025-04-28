import request from '@/utils/request';
import type { ApiResult } from '@/api';
import type {
  Category,
  CategoryEditParams,
  DeleteCategoryParams,
  CategoryQueryParams
} from './model';

/**
 * 新增藏品分类
 * @param data 分类信息
 */
export async function addCategory(data: CategoryEditParams) {
  const res = await request.post<ApiResult<unknown>>('/data/categories', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询全部藏品分类
 * @param params 查询参数
 */
export async function listCategories(params?: CategoryQueryParams) {
  const res = await request.get<ApiResult<Category[]>>('/data/categories', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除藏品分类
 * @param data 分类ID集合
 */
export async function removeCategories(data: DeleteCategoryParams) {
  const res = await request.delete<ApiResult<unknown>>('/data/categories', {
    data
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改藏品分类
 * @param data 分类信息
 */
export async function updateCategory(data: CategoryEditParams) {
  const res = await request.put<ApiResult<unknown>>('/data/categories', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入藏品分类
 * @param file 文件对象
 */
export async function importCategories(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post<ApiResult<unknown>>(
    '/data/categories/import',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
