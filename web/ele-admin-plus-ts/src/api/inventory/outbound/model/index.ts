/**
 * 出库单
 */
export interface OutboundOrder {
  /** 单据图片 */
  documentImage?: string
  /** 单据状态 */
  status?: string
  /** 出库单号 */
  code?: string
  /** 出库日期 */
  outboundDate?: string
  /** 经办人 */
  operator?: string
  /** 提借部门 */
  borrowDepartment?: string
  /** 提借人 */
  borrower?: string
  /** 提借类型 */
  borrowType?: string
  /** 拟归日期 */
  proposedReturnDate?: string
  /** 备注 */
  remarks?: string
}

/**
 * 出库明细
 */
export interface OutboundDetail {
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
  /** RFID编号 */
  rfidCode?: string
  /** 数量 */
  quantity?: number
  /** 数量单位 */
  unit?: string
  /** 年代类型 */
  eraType?: string
  /** 年代 */
  era?: string
  /** 艺术家 */
  artist?: string
  /** 地域类型 */
  regionType?: string
  /** 地域 */
  region?: string
}

/**
 * 新增出库单参数
 */
export interface AddOutboundParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 出库单审核参数
 */
export interface ApproveOutboundParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 确认出库参数
 */
export interface ConfirmOutboundParams {
  /** 出库单ID */
  id: string
}

/**
 * 查询出库单参数
 */
export interface OutboundQueryParams {
  /** 提借类型 */
  borrowType?: string
  /** 单据状态 */
  status?: string
  /** 出库单号 */
  code?: string
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
 * 查询出库明细参数
 */
export interface OutboundDetailQueryParams {
  /** 出库单ID */
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
