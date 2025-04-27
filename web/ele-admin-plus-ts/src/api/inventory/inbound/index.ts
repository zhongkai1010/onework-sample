import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { InboundEntryBase, InboundEntryQueryParams } from './model';

/**
 * 查询入库单分页列表
 * @param params 查询参数
 */
async function getEntries(params: InboundEntryQueryParams) {
  const res = await request.get<ApiResult<PageResult<InboundEntryBase>>>(
    '/inventory/entries',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据入库类型查询藏品分页列表
 * @param params 查询参数
 */
async function getCollections(params: InboundEntryQueryParams) {
  const res = await request.get<ApiResult<PageResult<InboundEntryBase>>>(
    '/inventory/entries/collections',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 入库登记
 * @param data 入库信息
 */
async function register(data: InboundEntryBase) {
  const res = await request.post<ApiResult<unknown>>(
    '/inventory/entries/register',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 入库单审核
 * @param ids 入库单ID集合
 */
async function approve(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/inventory/entries/approve',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 确认入库
 */
async function confirm() {
  const res = await request.post<ApiResult<unknown>>(
    '/inventory/entries/confirm'
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询入库明细
 * @param id 入库单ID
 */
async function getDetails(id: string) {
  const res = await request.get<ApiResult<InboundEntryBase>>(
    '/inventory/entries/details',
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
  getEntries,
  getCollections,
  register,
  approve,
  confirm,
  getDetails
};
