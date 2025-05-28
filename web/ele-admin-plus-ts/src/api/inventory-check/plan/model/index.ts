import type { PageParam } from '@/api'

/** 盘点计划 */
export interface InventoryCheckPlan {
  /** ID 编号 */
  id: number
  /** 盘点标题 */
  inventoryTitle: string
  /** 盘点开始时间 */
  startTime: string
  /** 盘点结束时间 */
  endTime: string
  /** 盘点目的 */
  inventoryPurpose: string
  /** 盘点计划人 */
  planner: string
  /** 盘点执行人 */
  executor: string
  /** 存放地点 */
  storageLocation: string
  /** 类别集合 */
  categories: Array<{
    /** 分类ID */
    categoryId: number
    /** 分类名称 */
    categoryName: string
  }>
  /** 验收日期 */
  acceptanceDate: string
  /** 状态：0:待启动，1：已开始，2：已结束 */
  status: number
}

/** 盘点计划藏品清单 */
export interface InventoryCheckPlanCollection {
  /** ID */
  id: number
  /** 藏品ID */
  collectionId: string
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

/** 创建盘点计划参数 */
export interface CreateInventoryCheckPlanParams {
  /** 盘点标题 */
  inventoryTitle: string
  /** 盘点开始时间 */
  startTime: string
  /** 盘点结束时间 */
  endTime: string
  /** 盘点目的 */
  inventoryPurpose: string
  /** 盘点计划人 */
  planner: string
  /** 盘点执行人 */
  executor: string
  /** 存放地点 */
  storageLocation: string
  /** 类别[多选] */
  categoryIds: number[]
  /** 验收日期 */
  acceptanceDate: string
}

/** 更新盘点计划参数 */
export interface UpdateInventoryCheckPlanParams extends CreateInventoryCheckPlanParams {
  /** ID 编号 */
  id: string
}

/** 获取盘点计划列表参数 */
export interface GetInventoryCheckPlanListParams extends PageParam {
  /** 盘点标题 */
  inventoryTitle?: string
}

/** 删除盘点计划参数 */
export interface DeleteInventoryCheckPlanParams {
  /** ID集合 */
  ids: number[]
}

/** 开始盘点参数 */
export interface StartInventoryCheckParams {
  /** ID 编号 */
  id: number
}

/** 结束盘点参数 */
export interface FinishInventoryCheckParams {
  /** ID 编号 */
  id: number
}
