import type { PageParam } from '@/api'

/**
 * 展区信息
 */
export interface Warehouse {
  /** 展区id */
  id: number
  /** 展区编号 */
  code?: string
  /** 上级展区id */
  parentId: number
  /** 展区名称 */
  name: string
  /** 级别(1:库,2:区,3:列,4:节,5:层) */
  tier: number
  /** 类型(1:展区,2:展区) */
  type: number
  /** 拼音 */
  pingying?: string
  /** 备注 */
  remark?: string
  /** 列数 */
  columnCount?: number
  /** 节数 */
  sectionCount?: number
  /** 层数 */
  layerCount?: number
  /** 固定列类型 */
  fixedColumnType?: string
  /** 子展区 */
  children?: Warehouse[]
}

/**
 * 展区查询参数
 */
export interface WarehouseQueryParams {
  /** 展区名称 */
  name?: string
  /** 展区编号 */
  code?: string
  /** 展区类型(1:库房,2:展区) */
  type?: number
  /** 级别(1:库,2:区,3:列,4:节,5:层) */
  tier?: number
}

/**
 * 新增展区参数
 */
export interface AddWarehouseParams {
  /** 编号 */
  code?: string
  /** 上级展区 */
  parentId?: number
  /** 名称 */
  name: string
  /** 类型，1：展区，2：展区 */
  type: number
  /** 级别，1：库，2：区，3：列，4：节，5：层 */
  tier: number
  /** 备注 */
  remark?: string
  /** 列数 */
  columnCount?: number
  /** 节数 */
  sectionCount?: number
  /** 层数 */
  layerCount?: number
  /** 固定列类型 */
  fixedColumnType?: string
  /** 拼音 */
  pingying?: string
}

/**
 * 修改展区参数
 */
export interface UpdateWarehouseParams {
  /** ID 编号 */
  id: number
  /** 编号 */
  code?: string
  /** 上级展区 */
  parentId?: number
  /** 名称 */
  name?: string
  /** 类型，1：展区，2：展区 */
  type?: number
  /** 级别，1：库，2：区，3：列，4：节，5：层 */
  tier?: number
  /** 备注 */
  remark?: string
  /** 列数 */
  columnCount?: number
  /** 节数 */
  sectionCount?: number
  /** 层数 */
  layerCount?: number
  /** 固定列类型 */
  fixedColumnType?: string
  /** 拼音 */
  pingying?: string
}

/**
 * 删除展区参数
 */
export interface DeleteWarehouseParams {
  /** 展区ID */
  id: number
}

/**
 * 展区藏品信息
 */
export interface WarehouseCollection {
  /** ID */
  id: number
  /** 藏品状态 */
  collectionStatus: number
  /** 图片信息 */
  imageInfo?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 藏品类别 */
  categoryName?: string
  /** 藏品类别ID */
  categoryId?: number
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
  /** 文物级别 */
  culturalLevel?: string
  /** 藏品来源 */
  collectionSource?: string
  /** 完残状况 */
  condition?: string
  /** 保存状态 */
  preservationStatus?: string
  /** 征集日期 */
  collectionDate?: string
  /** 入藏日期范围 */
  collectionDateRange?: string
  /** 入藏年度 */
  collectionYear?: string
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
  /** 颜色类别 */
  colorCategory?: string
  /** 颜色描述 */
  colorDescription?: string
  /** 存放位置ID */
  warehouseId: string
  /** 存放位置 */
  warehouseName?: string
  /** 备注 */
  notes?: string
  /** 入馆时间 */
  museumEntryTime?: string
  /** 入藏时间 */
  collectionTime?: string
  /** 登录时间 */
  loginTime?: string
  /** 入柜时间 */
  cabinetEntryTime?: string
}

/**
 * 展区藏品查询参数
 */
export interface WarehouseCollectionQueryParams extends PageParam {
  /** 存放位置ID */
  warehouseId?: number
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 藏品分类ID */
  categoryId?: number
}

/**
 * 地址条码信息
 */
export interface Barcode {
  /** ID */
  id: number
  /** 地址信息 */
  name: string
  /** 地址码 */
  code: string
  /** 级别，1：库，2：区，3：列，4：节，5：层 */
  tier: number
}

/**
 * 地址条码查询参数
 */
export interface BarcodeQueryParams extends PageParam {
  /** 类型，1：展区，2：展区 */
  type?: number
  /** 级别，1：库，2：区，3：列，4：节，5：层 */
  tier?: number
  /** 地址信息 */
  name?: string
  /** 地址码 */
  code?: string
}

/**
 * 藏品定位信息
 */
export interface Location {
  /** ID */
  id: number
  /** 藏品编码 */
  collectionCode: string
  /** 地址码 */
  code: string
  /** 绑定时间 */
  bindingTime: string
}

/**
 * 藏品定位查询参数
 */
export interface LocationQueryParams extends PageParam {
  /** 藏品ID */
  collectionId?: number
  /** 地址条码 */
  code?: string
  /** 绑定时间 */
  bindingTime?: string
  /** 类型，1：展区，2：展区 */
  type?: number
}

/**
 * 绑定藏品位置参数
 */
export interface BindLocationParams {
  /** 藏品编码 */
  collectionCode: string
  /** 地址条码 */
  code: string
}
