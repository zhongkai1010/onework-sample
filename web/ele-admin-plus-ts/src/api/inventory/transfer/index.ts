import type { ApiResult } from '@/api';
import request from '@/utils/request';
import type {
  TransferOrder,
  TransferDetail,
  AddTransferParams,
  ApproveTransferParams,
  ConfirmTransferParams,
  TransferQueryParams,
  TransferDetailQueryParams
} from './model';

/**
 * 新增藏品拨库单
 * @param data 拨库单信息
 */
export async function addTransfer(data: AddTransferParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/transfer',
    data
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
export async function listTransfers(params?: TransferQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number;
      list: TransferOrder[];
    }>
  >('/api/inventory/transfer', { params });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除拨库单
 * @param ids 拨库单ID集合
 */
export async function removeTransfers(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/api/inventory/transfer',
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
 * 审核拨库单
 * @param data ID集合
 */
export async function approveTransfer(data: ApproveTransferParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/transfer/approve',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 确认拨库单
 * @param data 拨库单ID
 */
export async function confirmTransfer(data: ConfirmTransferParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/transfer/confirm',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询拨库单详情
 * @param params 查询参数
 */
export async function getTransferDetails(params?: TransferDetailQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number;
      list: TransferDetail[];
    }>
  >('/api/inventory/transfer/details', { params });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
