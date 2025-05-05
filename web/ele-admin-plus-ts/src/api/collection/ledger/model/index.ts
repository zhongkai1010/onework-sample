import { PageParam } from '@/api'

/** 藏品修复记录 */
export interface RepairRecord {
  /** ID */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 修复单号 */
  repairCode?: string
  /** 登记日期 */
  registrationDate?: string
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品ID */
  collectionId: number
  /** 藏品名称 */
  collectionName?: string
  /** 藏品分类 */
  collectionCategory?: string
  /** 送修部门 */
  sendRepairDepartment?: string
  /** 送修人 */
  sentBy?: string
  /** 修复原因 */
  repairReason?: string
  /** 备注 */
  remarks?: string
  /** 送修日期 */
  sendRepairDate?: string
  /** 工单状态，0：修改中、1：已修复 */
  status?: number
  /** 承担机构 */
  undertakingOrganization?: string
  /** 修复人 */
  repairPerson?: string
  /** 资质证书 */
  qualificationCertificate?: string
  /** 修完日期 */
  repairCompletionDate?: string
  /** 修复情况及结果 */
  repairStatusAndResults?: string
  /** 修复前图片 */
  beforeRepairImage?: string
  /** 修复后图片 */
  afterRepairImage?: string
}

/** 藏品出库记录 */
export interface OutboundRecord {
  /** ID */
  id: number
  /** 出库单号 */
  code?: string
  /** 出库日期 */
  outboundDate?: string
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 入库日期 */
  storageDate?: string
  /** 状态，0：未审核、1：待出库、2：已出库、3：已归还 */
  status?: number
}

/** 藏品调拨记录 */
export interface TransferRecord {
  /** ID */
  id: number
  /** 调拨单号 */
  code?: string
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 原仓库 */
  originalWarehouse?: string
  /** 原仓库ID */
  originalWarehouseId: number
  /** 现仓库 */
  currentWarehouse: string
  /** 现仓库ID */
  currentWarehouseId: number
  /** 单据状态，0：待审核。1：已拨库 */
  status?: number
}

/** 图书总账 */
export interface BooksLedger {
  /** ID */
  id: number
  /** 图片信息 */
  imageInfo?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品名称 */
  collectionName?: string
  /** RFID编号 */
  rfidCode?: string
  /** 藏品分类ID */
  categoryId?: string
  /** 藏品分类名称 */
  categoryName: string
  /** ISBN */
  isbn: string
  /** 作者 */
  author?: string
  /** 仓库ID */
  warehouseId?: string
  /** 仓库名称 */
  warehouseName: string
  /** 藏品来源 */
  collectionSource?: string
  /** 图书价值 */
  bookValue?: string
  /** 保存状态 */
  preservationStatus?: string
  /** 征集日期 */
  collectionDate?: string
  /** 入藏年度 */
  collectionYear?: string
  /** 备注 */
  notes?: string
  /** 类型 */
  type?: string
}

/** 台账查询参数 */
export interface LedgerQueryParams extends PageParam {
  /** 藏品状态 */
  collectionStatus?: number
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 分页大小 */
  limit?: number
  /** 排序方式 */
  order?: string
  /** 页码 */
  page?: number
  /** 排序字段 */
  sort?: string
  /** 仓库ID */
  warehouseId?: number
  /** 地址码 */
  warehouseCode?: string
}

/** 藏品台账基础信息 */
export interface CollectionLedger {
  /** ID */
  id: number
  /** 藏品状态，1：在藏，2：修复中、3、待出库、4、待注销、5、已注销、6、yi */
  collectionStatus?: number
  /** RFID编号 */
  rfidCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 藏品类别ID */
  categoryId?: number
  /** 藏品类别 */
  categoryName?: string
  /** 存放位置 */
  warehouseId?: number
  /** 存放位置名称 */
  warehouseName?: string
  /** 年代 */
  era?: string
  /** 质地 */
  material?: string
  /** 数量 */
  quantity?: number
  /** 数量单位 */
  unit?: string
  /** 具体尺寸 */
  specificDimensions?: string
  /** 完残状况 */
  condition?: string
  /** 年代类型 */
  eraType?: string
  /** 图片信息 */
  imageInfo?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品编号 */
  collectionCode?: string
  /** 艺术家 */
  artist?: string
  /** 地域类型 */
  regionType?: string
  /** 地域 */
  region?: string
  /** 质地类型 */
  materialType?: string
  /** 通长(底径cm) */
  overallLength?: number
  /** 通宽(口径cm) */
  overallWidth?: number
  /** 通高(cm) */
  totalHeight?: number
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
