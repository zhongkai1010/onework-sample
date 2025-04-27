import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import {
  WarehouseBase,
  WarehouseQueryParams,
  CollectionLocation,
  CollectionLocationQueryParams,
  WarehouseForm
} from './model';

/**
 * 查询所有库房
 */
async function getWarehouseList() {
  const res = await request.get<ApiResult<WarehouseBase[]>>('/warehouses');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 新增库房
 * @param data 库房信息
 */
async function addWarehouse(data: WarehouseForm) {
  const res = await request.post<ApiResult<unknown>>('/warehouses', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改库房
 * @param data 库房信息
 */
async function updateWarehouse(data: WarehouseForm) {
  const res = await request.put<ApiResult<unknown>>('/warehouses', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除库房
 * @param id 库房ID
 */
async function deleteWarehouse(id: string) {
  const res = await request.delete<ApiResult<unknown>>('/warehouses', {
    data: { id }
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 藏品定位
 * @param ids 藏品ID集合
 */
async function locateCollections(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/collections/location',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询藏品定位分页列表
 * @param params 查询参数
 */
async function getCollectionLocations(params: CollectionLocationQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionLocation>>>(
    '/api/collections/location',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询库房藏品分页列表
 * @param params 查询参数
 */
async function getWarehouseCollections(params: WarehouseQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionLocation>>>(
    '/api/warehouses/collections',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getWarehouseList,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  locateCollections,
  getCollectionLocations,
  getWarehouseCollections
};
