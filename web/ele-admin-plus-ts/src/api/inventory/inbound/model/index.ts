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
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 单据状态 0：待审核，1：已审核、2：已入库 */
  status?: number
  /** 入库单号 */
  code?: string
  /** 入库类型 1:初次入库，2：归还入库 */
  type?: number
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: number
  /** 库房名称 */
  warehouseName: string
  /** 入库日期 */
  storageDate?: string
  /** 备注 */
  remark?: string
}

/**
 * 入库登记参数
 */
export interface InboundRegisterParams {
  /** 入库类型,1:初次入库，2：归还入库 */
  type?: number
  /** 藏品ID集合 */
  collectionIds: number[]
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: number
  /** 入库日期 */
  storageDate?: string
  /** 备注 */
  remark?: string
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
  id: number
}

/**
 * 查询入库单参数
 */
export interface InboundQueryParams {
  /** 单据状态 0：待审核，1：已审核、2：已入库 */
  status?: number
  /** 入库类型 1:初次入库，2：归还入库 */
  type?: number
  /** 藏品ID */
  collectionId?: number
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: number
  /** 备注 */
  remark?: string
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
  /** 单据ID */
  id: number
}

/**
 * 查询入库单详情参数
 */
export interface InboundOrderDetailsQueryParams {
  /** ID 编号 */
  id?: number
}

/**
 * 查询入库单明细参数
 */
export interface InboundCollectionQueryParams {
  /** 入库单号 */
  collectionStatus?: string
  /** 藏品选择 */
  collectionCode?: number
  /** 接收库房 */
  collectionName?: number
  /** 分页查询每页数量 */
  limit?: number
  /** 排序方式 */
  order?: string
  /** 分页查询页码 */
  page?: number
  /** 排序字段 */
  sort?: string
}

/**
 * 入库单明细
 */
export interface InboundCollection {
  /** ID 编号 */
  id: string
  /** 入库单号 */
  code: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 接收库房 */
  warehouseId: number
  /** 库房名称 */
  warehouseName: string
  /** 入库日期 */
  storageDate: string
  /** 单据状态 0：待审核，1：已审核、2：已入库 */
  status: number
}

/**
 * 入库单详情藏品
 */
export interface InboundOrderDetailCollection {
  /** ID 编号 */
  id: number
  /** 入库单号 */
  code: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 接收库房 */
  warehouseId: number
  /** 库房名称 */
  warehouseName: string
  /** 入库日期 */
  storageDate: string
  /** 单据状态 0：待审核，1：已审核、2：已入库 */
  status: number
}

/**
 * 入库单详情
 */
export interface InboundOrderDetail {
  /** ID 编号 */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 单据状态 0：待审核，1：已审核、2：已入库 */
  status?: number
  /** 入库单号 */
  warehouseNumber?: string
  /** 入库类型 1:初次入库，2：归还入库 */
  type?: number
  /** 经办人 */
  operator?: string
  /** 接收库房 */
  warehouseId?: number
  /** 库房名称 */
  warehouseName: string
  /** 入库日期 */
  storageDate?: string
  /** 备注 */
  remark?: string
  /** 入库藏品明细 */
  collections: InboundOrderDetailCollection[]
}
