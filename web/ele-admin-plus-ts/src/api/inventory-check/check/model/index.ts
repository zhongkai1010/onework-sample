/**
 * 盘点藏品查询参数
 */
export interface InventoryCheckCollectionQueryParams {
  /** 分页查询页码 */
  page?: number
  /** 分页查询每页数量 */
  limit?: number
  /** 排序字段 */
  sort?: string
  /** 排序方式 */
  order?: string
  /** 盘点计划ID */
  id?: string
  /** 藏品状态， 0：未盘,1：已盘到、2：已盘亏、3：已盘盈 */
  status?: string
  /** 藏品名称 */
  collectionName?: string
  /** 藏品编号 */
  code?: string
  /** 库房ID */
  warehouseId?: number
  /** 盘点计划ID */
  planId?: number
  /** 藏品类别ID */
  categoryId?: number
}

/**
 * 盘点藏品
 */
export interface InventoryCheckCollection {
  /** ID */
  id: number
  /** 藏品ID */
  collectionId: number
  /** 藏品状态， 0：未盘,1：已盘到、2：已盘亏、3：已盘盈 */
  satus: number
  /** RFID编号 */
  rfidCode: string
  /** 藏品名称 */
  collectionName: string
  /** 藏品类别ID */
  categoryId: number
  /** 藏品类别 */
  categoryName: string
  /** 存放位置 */
  warehouseId: number
  /** 存放位置ID */
  warehouseName: string
  /** 年代 */
  era: string
  /** 质地 */
  material: string
  /** 数量 */
  quantity: number
  /** 数量单位 */
  unit: string
  /** 具体尺寸 */
  specificDimensions: string
  /** 完残状况 */
  condition: string
  /** 年代类型 */
  eraType: string
  /** 图片信息 */
  imageInfo: string
  /** 编号类别 */
  numberCategory: string
  /** 藏品编号 */
  collectionCode: string
  /** 艺术家 */
  artist: string
  /** 地域类型 */
  regionType: string
  /** 地域 */
  region: string
  /** 质地类型 */
  materialType: string
  /** 通长(底径cm) */
  overallLength: number
  /** 通宽(口径cm) */
  overallWidth: number
  /** 通高(cm) */
  totalHeight: number
  /** 质量范围 */
  weightRange: string
  /** 具体质量 */
  specificWeight: number
  /** 质量单位 */
  weightUnit: string
  /** 文物级别 */
  culturalLevel: string
  /** 藏品来源 */
  collectionSource: string
  /** 保存状态 */
  preservationStatus: string
  /** 征集日期 */
  collectionDate: string
  /** 入藏日期范围 */
  collectionDateRange: string
  /** 入藏年度 */
  collectionYear: string
  /** 类型 */
  type: string
  /** 人文类型 */
  culturalType: string
  /** 藏品介绍 */
  collectionIntroduction: string
  /** 文本类型 */
  textType: string
  /** 声像载体类型 */
  audioVisualCarrierType: string
  /** 声像载体存放位置 */
  audioVisualStorageLocation: string
  /** 计算机磁盘路径 */
  diskPath: string
  /** 颜色类别 */
  colorCategory: string
  /** 颜色描述 */
  colorDescription: string
  /** 备注 */
  notes: string
  /** 入馆时间 */
  museumEntryTime: string
  /** 入藏时间 */
  collectionTime: string
  /** 登录时间 */
  loginTime: string
  /** 入柜时间 */
  cabinetEntryTime: string
}

/**
 * 确认藏品状态参数
 */
export interface UpdateInventoryCheckCollectionStatusParams {
  /** 盘点藏品清单Id */
  ids: number[]
  /** 藏品状态， 0：未盘,1：已盘到、2：已盘亏、3：已盘盈 */
  status: number
  /** 盘点情况 */
  explanation: string
}

/**
 * 登记盘盈藏品参数
 */
export interface AddInventoryCheckCollectionParams {
  /** 盘点计划ID */
  planId: number
  /** 藏品名称 */
  collectionName?: string
  /** 藏品类别ID */
  categoryId: number
  /** 藏品类别名称 */
  categoryName?: string
  /** 库房ID */
  warehouseId: number
  /** 库房名称 */
  warehouseName?: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品状态， 0：未盘,1：已盘到、2：已盘亏、3：已盘盈 */
  status?: number
  /** RFID编号 */
  rfidCode?: string
  /** 年代 */
  era?: string
  /** 地域类型 */
  regionType?: string
  /** 地域 */
  region?: string
  /** 质地类型 */
  materialType?: string
  /** 质地 */
  material?: string
  /** 通长(底径cm) */
  overallLength?: number
  /** 通宽(口径cm) */
  overallWidth?: number
  /** 通高(cm) */
  totalHeight?: number
  /** 具体尺寸 */
  specificDimensions?: string
  /** 质量范围 */
  weightRange?: string
  /** 具体质量 */
  specificWeight?: number
  /** 质量单位 */
  weightUnit?: string
  /** 颜色类别 */
  colorCategory?: string
  /** 颜色描述 */
  colorDescription?: string
  /** 完残状况 */
  condition?: string
  /** 保存状态 */
  preservationStatus?: string
  /** 藏品来源 */
  collectionSource?: string
  /** 艺术家 */
  artist?: string
  /** 征集日期 */
  collectionDate?: string
  /** 入藏日期范围 */
  collectionDateRange?: string[]
  /** 入藏年度 */
  collectionYear?: string
  /** 入馆时间 */
  museumEntryTime?: string
  /** 入藏时间 */
  collectionTime?: string
  /** 登录时间 */
  loginTime?: string
  /** 入柜时间 */
  cabinetEntryTime?: string
  /** 类型 */
  type?: string
  /** 人文类型 */
  culturalType?: string
  /** 藏品介绍 */
  collectionIntroduction?: string
  /** 文本类型 */
  textType?: string
  /** 声像载体类型 */
  audioVisualCarrierType?: string
  /** 声像载体存放位置 */
  audioVisualStorageLocation?: string
  /** 计算机磁盘路径 */
  diskPath?: string
  /** 备注 */
  notes?: string
  /** 图片信息 */
  imageInfo?: string
  /** 文物级别 */
  culturalLevel?: string
  /** 编号分类 */
  numberCategory?: string
  /** 数量 */
  quantity?: number
  /** 单位 */
  unit?: string
}
