import { ApiResult, PageResult } from '@/api';
import {
  Cancellation,
  AddCancellationParams,
  CancellationQueryParams,
  CancellationConfirmParams,
  CancellationAuditParams
} from './model';
import request from '@/utils/request';

/**
 * 添加注销单
 */
export const addCancellation = (data: AddCancellationParams) => {
  return request.post<ApiResult<void>>('/collection-cancellations', data);
};

/**
 * 查询注销单分页列表
 */
export const getCancellationList = (params: CancellationQueryParams) => {
  return request.get<ApiResult<PageResult<Cancellation>>>(
    '/collection-cancellations',
    { params }
  );
};

/**
 * 修改注销单
 */
export const updateCancellation = (data: Cancellation) => {
  return request.put<ApiResult<void>>('/collection-cancellations', data);
};

/**
 * 删除注销单
 */
export const deleteCancellation = (id: string) => {
  return request.delete<ApiResult<void>>(`/collection-cancellations/${id}`);
};

/**
 * 确认注销
 */
export const confirmCancellation = (data: CancellationConfirmParams) => {
  return request.post<ApiResult<void>>('/collection-cancellations', data);
};

/**
 * 审核注销单
 */
export const auditCancellation = (data: CancellationAuditParams) => {
  return request.post<ApiResult<void>>('/collection-cancellations/audit', data);
};
