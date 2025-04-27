import type { ApiResult } from '@/api';
import request from '@/utils/request';
import type {
  OutboundOrder,
  OutboundDetail,
  AddOutboundParams,
  ApproveOutboundParams,
  ConfirmOutboundParams,
  OutboundQueryParams,
  OutboundDetailQueryParams
} from './model';

/**
 * 新增藏品出库单
 * @param data 出库单信息
 */
export async function addOutbound(data: AddOutboundParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/outbound',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询出库单分页列表
 * @param params 查询参数
 */
export async function listOutbounds(params?: OutboundQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number;
      list: OutboundOrder[];
    }>
  >('/api/inventory/outbound', { params });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除出库单
 * @param ids 出库单ID集合
 */
export async function removeOutbounds(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/api/inventory/outbound',
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
 * 确认出库单
 * @param data 出库单ID
 */
export async function confirmOutbound(data: ConfirmOutboundParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/outbound/confirm',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 审核出库单
 * @param data ID集合
 */
export async function approveOutbound(data: ApproveOutboundParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/outbound/approve',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询出库单详情
 * @param params 查询参数
 */
export async function getOutboundDetails(params?: OutboundDetailQueryParams) {
  const res = await request.get<
    ApiResult<{
      count: number;
      list: OutboundDetail[];
    }>
  >('/api/inventory/outbound/details', { params });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
