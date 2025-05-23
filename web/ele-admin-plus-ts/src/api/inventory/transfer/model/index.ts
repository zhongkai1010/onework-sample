/**
 * 调拨单
 */
export interface TransferOrder {
  /** ID */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 调拨单号 */
  code: string
  /** 单据状态  ，0：待审核。1：已拨库 */
  status: string
  /** 调拨日期 */
  transferDate: string
  /** 调拨仓库ID */
  warehouseId: string
  /** 调拨仓库 */
  warehouseName: string
  /** 接收人 */
  receiver: string
  /** 调拨原因 */
  transferReason?: string
  /** 备注 */
  remark?: string
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
  /** 调拨日期 */
  transferDate: string
  /** 调拨仓库ID */
  warehouseId: number
  /** 接收人 */
  receiver: string
  /** 调拨原因 */
  transferReason?: string
  /** 备注 */
  remark?: string
  /** 藏品ID集合 */
  collectionIds: number[]
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
  /** 拨库单ID */
  id: number
}

/**
 * 查询调拨单参数
 */
export interface TransferQueryParams {
  /** 单据状态  ，0：待审核。1：已拨库 */
  status?: number
  /** 调拨仓库 */
  warehouseId?: number
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
 * 查询调拨明细参数
 */
export interface TransferDetailQueryParams {
  /** 拨库单ID */
  id: number
}

/**
 * 拨库单详情信息
 */
export interface TransferDetailInfo {
  /** ID */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 调拨单号 */
  code: string
  /** 单据状态  ，0：待审核。1：已拨库 */
  status: string
  /** 调拨日期 */
  transferDate: string
  /** 调拨仓库ID */
  warehouseId: string
  /** 调拨仓库 */
  warehouseName: string
  /** 接收人 */
  receiver: string
  /** 调拨原因 */
  transferReason?: string
  /** 备注 */
  remark?: string
  /** 藏品列表 */
  collections: TransferCollection[]
}

/**
 * 拨库藏品信息
 */
export interface TransferCollection {
  /** ID 编号 */
  id: number
  /** 出库单号 */
  code: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 原出库 */
  originalWarehouse: string
  /** 原仓库ID */
  originalWarehouseId: number
  /** 现仓库 */
  currentWarehouse: string
  /** 现仓库ID */
  currentWarehouseId: number
  /** 单据状态  ，0：待审核。1：已拨库 */
  status: number
}

/**
 * 拨库目录查询参数
 */
export interface TransferCatalogQueryParams {
  /** 拨库单号 */
  code?: string
  /** 拨库日期 */
  transferDate?: string
  /** 藏品选择 */
  collectionId?: number
  /** 状态  ，0：待审核。1：已拨库 */
  status?: number
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
 * 拨库目录项
 */
export interface TransferCatalogItem {
  /** ID 编号 */
  id: number
  /** 出库单号 */
  code: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 原出库 */
  originalWarehouse: string
  /** 原仓库ID */
  originalWarehouseId: number
  /** 现仓库 */
  currentWarehouse: string
  /** 现仓库ID */
  currentWarehouseId: number
  /** 单据状态  ，0：待审核。1：已拨库 */
  status: number
}
