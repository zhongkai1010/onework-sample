/**
 * 调拨单
 */
export interface TransferOrder {
  /** ID */
  id: string
  /** 单据图片 */
  documentImage?: string
  /** 调拨单号 */
  code?: string
  /** 单据状态 */
  status?: string
  /** 调拨日期 */
  transferDate?: string
  /** 调拨仓库ID */
  warehouseId?: string
  /** 调拨仓库 */
  warehouseName: string
  /** 接收人 */
  receiver?: string
  /** 调拨原因 */
  transferReason?: string
  /** 备注 */
  remarks?: string
}

/**
 * 调拨明细
 */
export interface TransferDetail {
  /** ID */
  id: string
  /** 藏品状态 */
  collectionStatus?: string
  /** 图片信息 */
  imageInfo?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 藏品类别 */
  categoryName?: string
  /** 藏品类别ID */
  categoryId?: string
}

/**
 * 新增调拨单参数
 */
export interface AddTransferParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 调拨单审核参数
 */
export interface ApproveTransferParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 确认调拨参数
 */
export interface ConfirmTransferParams {
  /** ID 编号 */
  id: string
}

/**
 * 查询调拨单参数
 */
export interface TransferQueryParams {
  /** 单据状态 */
  status?: string
  /** 调拨仓库 */
  warehouseId?: string
  /** 分页查询每页数量 */
  limit?: number
  /** 分页查询页码 */
  page?: number
  /** 排序方式 */
  order?: string
  /** 排序字段 */
  sort?: string
}

/**
 * 查询调拨明细参数
 */
export interface TransferDetailQueryParams {
  /** 调拨单ID */
  id?: string
  /** 分页查询每页数量 */
  limit?: number
  /** 分页查询页码 */
  page?: number
  /** 排序方式 */
  order?: string
  /** 排序字段 */
  sort?: string
}
