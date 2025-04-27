import { PageParam } from '@/api';

/**
 * 注销记录信息
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
  status: number;
}

/**
 * 添加注销记录参数
 */
export type AddCancellationParams = Omit<Cancellation, 'id'>;

/**
 * 注销记录查询参数
 */
export interface CancellationQueryParams extends PageParam {
  /** 藏品ID */
  collectionId?: string;
  /** 批准部门 */
  approvalDepartment?: string;
  /** 注销原因 */
  cancellationReason?: string;
  /** 状态 */
  status?: number;
}

/**
 * 确认注销参数
 */
export interface ConfirmCancellationParams {
  /** 分类ID集合 */
  ids: number[];
}

/**
 * 注销审核参数
 */
export interface CancellationAuditParams {
  /** 注销单ID集合 */
  ids: number[];
}
