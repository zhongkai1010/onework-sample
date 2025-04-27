import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import {
  CollectionGroupBase,
  CollectionGroupQueryParams,
  CollectionGroupItem
} from './model';

/**
 * 查询藏品组分页列表
 * @param params 查询参数
 */
async function getCollectionGroups(params: CollectionGroupQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionGroupBase>>>(
    '/api/collection-groups',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 新增藏品组
 * @param data 藏品组信息
 */
async function addCollectionGroup(
  data: Omit<CollectionGroupBase, 'id' | 'status'>
) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/collection-groups',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 编辑藏品组
 * @param data 藏品组信息
 */
async function updateCollectionGroup(data: CollectionGroupBase) {
  const res = await request.put<ApiResult<unknown>>(
    '/api/collection-groups',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除藏品组
 * @param ids 藏品组ID集合
 */
async function deleteCollectionGroups(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/api/collection-groups',
    {
      data: { ids }
    }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据藏品组查询藏品分页列表
 * @param params 查询参数
 */
async function getCollectionGroupItems(params: CollectionGroupQueryParams) {
  const res = await request.get<ApiResult<PageResult<CollectionGroupItem>>>(
    '/api/collection-groups/collections',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getCollectionGroups,
  addCollectionGroup,
  updateCollectionGroup,
  deleteCollectionGroups,
  getCollectionGroupItems
};
