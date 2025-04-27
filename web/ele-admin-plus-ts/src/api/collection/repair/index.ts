import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { RepairBase, RepairQueryParams } from './model';

/**
 * 查询藏品修复记录分页列表
 * @param params 查询参数
 */
async function getRepairList(params: RepairQueryParams) {
  const res = await request.get<ApiResult<PageResult<RepairBase>>>(
    '/api/collections/repairs',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修复登记
 * @param data 修复信息
 */
async function registerRepair(data: RepairBase) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/collections/repairs/register',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询藏品修复记录详情
 * @param id 修复记录ID
 */
async function getRepairDetails(id: string) {
  const res = await request.get<ApiResult<RepairBase>>(
    '/api/collections/repairs/details',
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
  getRepairList,
  registerRepair,
  getRepairDetails
};
