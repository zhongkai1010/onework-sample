import { PageParam } from '@/api';

/**
 * 注销单信息
 */
export interface Cancellation {
  /** ID编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 单据图片 */
  documentImage: string;
  /** 注销单号 */
  cancellationCode: string;
  /** 注销时间 */
  cancellationTime: string;
  /** 批准部门 */
  approvalDepartment: string;
  /** 注销原因 */
  cancellationReason: string;
  /** 状态 */
  status: string;
}

/**
 * 添加注销单参数
 */
export type AddCancellationParams = Omit<Cancellation, 'id'>;

/**
 * 注销单查询参数
 */
export interface CancellationQueryParams extends PageParam {
  /** 注销单号 */
  cancellationCode?: string;
  /** 批准部门 */
  approvalDepartment?: string;
  /** 状态 */
  status?: string;
}

/**
 * 注销确认参数
 */
export interface CancellationConfirmParams {
  /** 注销单ID集合 */
  ids: number[];
}

/**
 * 注销审核参数
 */
export interface CancellationAuditParams {
  /** 注销单ID集合 */
  ids: number[];
}
