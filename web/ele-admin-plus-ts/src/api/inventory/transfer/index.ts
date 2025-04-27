import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { TransferBase, TransferQueryParams } from './model';

/**
 * 查询待拨库藏品分页列表
 * @param params 查询参数
 */
async function getPendingTransfers(params: TransferQueryParams) {
  const res = await request.get<ApiResult<PageResult<TransferBase>>>(
    '/api/inventory/transfer',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 确认藏品拨库
 * @param ids 藏品ID集合
 */
async function confirmTransfer(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/collections/confirm-transfer',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询拨库单分页列表
 * @param params 查询参数
 */
async function getTransferList(params: TransferQueryParams) {
  const res = await request.get<ApiResult<PageResult<TransferBase>>>(
    '/api/transfer/entries',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除拨库单
 * @param ids 拨库单ID集合
 */
async function deleteTransfers(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/api/transfer/entries',
    { data: { ids } }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 审核拨库单
 * @param ids 拨库单ID集合
 */
async function approveTransfer(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/transfer/entries/approve',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 确认拨库单
 * @param id 拨库单ID
 */
async function confirmTransferEntry(id: string) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/transfer/entries/confirm',
    { id }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询拨库单详情
 * @param id 拨库单ID
 */
async function getTransferDetails(id: string) {
  const res = await request.get<ApiResult<TransferBase>>(
    '/api/transfer/entries/details',
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
  getPendingTransfers,
  confirmTransfer,
  getTransferList,
  deleteTransfers,
  approveTransfer,
  confirmTransferEntry,
  getTransferDetails
};
