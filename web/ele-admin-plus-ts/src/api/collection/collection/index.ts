import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import type {
  CollectionBase,
  AddCollectionParams,
  CollectionQueryParams
} from './model';

/**
 * 查询藏品台账分页列表
 * @param params 查询参数
 */
export async function getAccounts(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionBase>>>(
    '/collection/collections/accounts',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询藏品编目分页列表
 * @param params 查询参数
 */
export async function getCatalogs(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionBase>>>(
    '/collection/catalog',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询藏品预备帐分页列表
 * @param params 查询参数
 */
export async function getPreparatory(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionBase>>>(
    '/collection/collections/preparatory',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 藏品登记
 * @param data 藏品信息
 */
export async function register(data: AddCollectionParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/collection/collections/register',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 编辑藏品
 * @param data 藏品信息
 */
export async function update(data: CollectionBase) {
  const res = await request.put<ApiResult<unknown>>(
    '/collection/catalog',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除藏品
 * @param ids 藏品ID集合
 */
export async function deleteCollections(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/collection/catalog', {
    data: { ids }
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 审核通过藏品
 * @param ids 藏品ID集合
 */
export async function approve(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/collection/catalog/approve',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入藏品
 * @param file 文件
 */
export async function importCollections(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post<ApiResult<unknown>>(
    '/collection/catalog/import',
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

/**
 * 查询藏品详情
 * @param id 藏品ID
 */
export async function getDetails(id: string) {
  const res = await request.get<ApiResult<CollectionBase>>(
    '/collection/catalog/details',
    { params: { id } }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
