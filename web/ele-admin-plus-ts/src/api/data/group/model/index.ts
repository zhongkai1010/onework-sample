import { PageParam } from '@/api'

/**
 * 藏品组信息
 */
export interface Group {
  /** ID 编号 */
  id: number
  /** 藏品组名称 */
  groupName: string
  /** 负责人 */
  personInCharge?: string
  /** 备注说明 */
  remarks?: string
  /** 排序 */
  sortOrder?: number
  /** 状态，0：未审核，1：已审核 */
  status?: number
}

/**
 * 藏品组查询参数
 */
export interface GroupQueryParams extends PageParam {
  /** 组名称 */
  groupName?: string
}

/**
 * 藏品组编辑参数
 */
export interface GroupEditParams {
  /** ID 编号 */
  id?: number
  /** 藏品组名称 */
  groupName: string
  /** 负责人 */
  personInCharge?: string
  /** 备注说明 */
  remarks?: string
  /** 排序 */
  sortOrder?: number
  /** 状态，0：未审核，1：已审核 */
  status?: number
}

/**
 * 删除藏品组参数
 */
export interface DeleteGroupParams {
  /** ID集合 */
  ids: number[]
}

/**
 * 藏品组藏品查询参数
 */
export interface GroupCollectionQueryParams extends PageParam {
  /** 藏品分组ID */
  groupId?: number
}

/**
 * 藏品组藏品信息
 */
export interface GroupCollection {
  /** ID 编号 */
  id: number
  /** 藏品状态 */
  collectionStatus?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品编号 */
  code?: string
  /** 藏品名称 */
  collectionName?: string
  /** RFID编号 */
  rfidCode?: string
  /** 藏品分类ID */
  categoryId?: number
  /** 藏品分类名称 */
  categoryName?: string
  /** 分组ID */
  groupId?: number
  /** 分组名称 */
  groupName?: string
  /** 数量 */
  quantity?: number
  /** 数量单位 */
  unit?: string
  /** 年代 */
  era?: string
  /** 艺术家 */
  artist?: string
  /** 地域类型 */
  regionType?: string
  /** 地域 */
  region?: string
  /** 质地 */
  material?: string
  /** 质地类型 */
  materialType?: string
  /** 通长(底径cm) */
  overallLength?: string
  /** 通宽(口径cm) */
  overallWidth?: string
  /** 通高(cm) */
  totalHeight?: string
  /** 具体尺寸 */
  specificDimensions?: string
  /** 质量范围 */
  qualityRange?: string
  /** 具体质量 */
  specificQuality?: string
  /** 质量单位 */
  qualityUnit?: string
  /** 文物级别 */
  culturalRelicLevel?: string
  /** 藏品来源 */
  collectionSource?: string
  /** 保存状态 */
  preservationStatus?: string
  /** 入藏日期范围 */
  collectionDateRange?: string
  /** 入藏年度 */
  collectionYear?: string
  /** 完残程度 */
  completenessDegree?: string
  /** 完残状况 */
  completenessStatus?: string
}
