/**
 * 入库藏品
 */
export interface InboundCollection {
  /** 藏品ID */
  id: string
  /** 藏品名称 */
  collectionName: string
  /** 藏品编码 */
  collectionCode: string
}

/**
 * 入库单
 */
export interface InboundOrder {
  /** ID 编号 */
  id: string
  /** 单据图片 */
  documentImage?: string
  /** 单据状态 */
  status?: string
  /** 入库单号 */
  code?: string
  /** 入库类型 */
  type?: string
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: string
  /** 库房名称 */
  warehouseName: string
  /** 入库日期 */
  storageDate?: string
  /** 备注 */
  remarks?: string
}

/**
 * 入库登记参数
 */
export interface InboundRegisterParams {
  /** 入库类型,1:初次入库，2：归还入库 */
  type?: string
  /** 藏品ID集合 */
  collectionIds: string[]
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: string
  /** 入库日期 */
  storageDate?: string
  /** 备注 */
  remarks?: string
}

/**
 * 入库单审核参数
 */
export interface InboundApproveParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 确认入库参数
 */
export interface InboundConfirmParams {
  /** 入库单ID */
  id: string
}

/**
 * 查询入库单参数
 */
export interface InboundQueryParams {
  /** 单据状态 */
  status?: string
  /** 入库类型 */
  type?: string
  /** 藏品ID */
  collectionId?: string
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: string
  /** 备注 */
  remarks?: string
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
 * 查询入库明细参数
 */
export interface InboundDetailsQueryParams {
  /** 入库单ID */
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
