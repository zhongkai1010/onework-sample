import type { PageParam } from '@/api'

/**
 * 注销单信息
 */
export interface Cancellation {
  /** ID 编号 */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 注销单号 */
  code: string
  /** 注销时间 */
  cancellationTime: string
  /** 批准部门 */
  approvalDepartment: string
  /** 注销原因 */
  cancellationReason: string
  /** 状态：0：待注销、1：已注销，2：已恢复 */
  status: number
}

/**
 * 新增注销单参数
 */
export interface AddCancellationParams {
  /** 注销时间 */
  cancellationTime?: string
  /** 批准部门 */
  approvalDepartment?: string
  /** 注销原因 */
  cancellationReason?: string
  /** 藏品ID集合 */
  collectionIds: number[]
}

/**
 * 审核注销单参数
 */
export interface ApproveCancellationParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 恢复注销单参数
 */
export interface RecoverCancellationParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 注销单查询参数
 */
export interface CancellationQueryParams extends PageParam {
  /** 藏品ID */
  collectionId?: number
  /** 批准部门 */
  approvalDepartment?: string
  /** 注销原因 */
  cancellationReason?: string
  /** 状态：0：待注销、1：已注销，2：已恢复 */
  status?: number
}

/**
 * 注销单详情信息
 */
export interface CancellationDetailInfo {
  /** ID 编号 */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 注销单号 */
  code: string
  /** 注销时间 */
  cancellationTime: string
  /** 批准部门 */
  approvalDepartment: string
  /** 注销原因 */
  cancellationReason: string
  /** 状态：0：待注销、1：已注销，2：已恢复 */
  status: number
  /** 藏品列表 */
  collections: CancellationCollection[]
}

/**
 * 注销藏品信息
 */
export interface CancellationCollection {
  /** ID 编号 */
  id: number
  /** 注销单号 */
  code: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 注销日期 */
  cancellationTime: string
  /** 单据状态  ，0：待审核，1：已审核、2：已入库 */
  status: number
}

/**
 * 注销目录查询参数
 */
export interface CancellationCatalogQueryParams extends PageParam {
  /** 注销单号 */
  code?: string
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 状态：0：待注销、1：已注销，2：已恢复 */
  status?: number
}

/**
 * 注销目录项
 */
export interface CancellationCatalogItem {
  /** ID 编号 */
  id: number
  /** 注销单号 */
  code: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 注销日期 */
  cancellationTime: string
  /** 状态：0：待注销、1：已注销，2：已恢复 */
  status: number
}
