import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api';
import {
  Collection,
  AddCollectionParams,
  CollectionQueryParams
} from './model';

/**
 * 查询藏品编目分页列表
 */
export async function getCatalogs(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<Collection>>>(
    '/collection/catalog',
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
 * 编辑藏品
 */
export async function update(data: Collection) {
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
 * 藏品登记
 */
export async function register(data: AddCollectionParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/collection/catalog/register',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 审核通过藏品
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
 */
export async function getDetails(id: number) {
  const res = await request.get<ApiResult<Collection>>(
    '/collection/catalog/details',
    {
      params: { id }
    }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询藏品预备帐分页列表
 */
export async function getPreparation(params: CollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<Collection>>>(
    '/collection/catalog/preparation',
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
 * 藏品退回编目
 */
export async function returnCollections(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/collection/catalog/return',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 绑定RFID
 */
export async function bindRfid(data: { ids: number[]; rfidCode: string }) {
  const res = await request.post<ApiResult<unknown>>(
    '/collection/catalog/bind-rfid',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量修改分类
 */
export async function updateCategory(data: {
  ids: number[];
  categoryId: number;
}) {
  const res = await request.post<ApiResult<unknown>>(
    '/collection/catalog/update-category',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
