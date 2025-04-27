import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { OutboundBase, OutboundQueryParams } from './model';

// 图片信息接口
export interface ImageInfo {
  imageUrl: string;
  imageSize: string;
}

// 分页查询参数接口

/**
 * 查询已入库藏品分页列表
 * @param params 查询参数
 */
async function getReceivedCollections(params: OutboundQueryParams) {
  const res = await request.get<ApiResult<PageResult<OutboundBase>>>(
    '/api/inventory/collections/received',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 确认藏品出库
 * @param ids 藏品ID集合
 */
async function confirmOutbound(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/collections/confirm-out',
    { ids }
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
async function getOutboundList(params: OutboundQueryParams) {
  const res = await request.get<ApiResult<PageResult<OutboundBase>>>(
    '/api/outbound',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 审核出库单
 * @param ids 出库单ID集合
 */
async function approveOutbound(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/outbound/entries/approve',
    { ids }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getReceivedCollections,
  confirmOutbound,
  getOutboundList,
  approveOutbound
};
