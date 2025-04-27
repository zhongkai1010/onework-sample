import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { CollectionBase, CollectionQueryParams } from './model';

/**
 * 查询藏品台账分页列表
 * @param params 查询参数
 */
async function getAccounts(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionBase>>>(
    '/collections/accounts',
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
async function getCatalogs(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionBase>>>(
    '/collections/catalogs',
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
async function getPreparatory(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionBase>>>(
    '/collections/preparatory',
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
async function register(data: CollectionBase) {
  const res = await request.post<ApiResult<unknown>>(
    '/collections/register',
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
async function update(data: CollectionBase) {
  const res = await request.put<ApiResult<unknown>>('/collections', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除藏品
 * @param ids 藏品ID集合
 */
async function deleteCollections(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/collections/batch', {
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
async function approve(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/collections/approve', {
    ids
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入藏品
 * @param file 文件
 */
async function importCollections(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post<ApiResult<unknown>>(
    '/collections/import',
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
async function getDetails(id: string) {
  const res = await request.get<ApiResult<CollectionBase>>(
    '/collections/details',
    {
      params: { id }
    }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getAccounts,
  getCatalogs,
  getPreparatory,
  register,
  update,
  deleteCollections,
  approve,
  importCollections,
  getDetails
};
