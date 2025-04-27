import request from '@/utils/request';
import type { ApiResult } from '@/api';
import type {
  Category,
  AddCategoryParam,
  UpdateCategoryParam,
  DeleteCategoryParam,
  CategoryParam
} from './category/model';

/**
 * 新增藏品分类
 * @param data 分类信息
 */
async function addCategory(data: AddCategoryParam) {
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
async function listCategories(params?: CategoryParam) {
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
async function removeCategories(data: DeleteCategoryParam) {
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
async function updateCategory(data: UpdateCategoryParam) {
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
async function importCategories(file: File) {
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

export default {
  addCategory,
  listCategories,
  removeCategories,
  updateCategory,
  importCategories
};
