import { PageParam } from '@/api';

/**
 * 藏品信息
 */
export interface Collection {
  /** ID */
  id: string;
  /** 藏品状态 */
  collectionStatus: string;
  /** 图片信息 */
  imageInfo: string;
  /** 编号类别 */
  numberCategory: string;
  /** 藏品编号 */
  collectionCode: string;
  /** 藏品名称 */
  collectionName: string;
  /** 藏品类别 */
  categoryName: string;
  /** 藏品类别ID */
  categoryId: string;
  /** RFID编号 */
  rfidCode: string;
  /** 数量 */
  quantity: number;
  /** 数量单位 */
  unit: string;
  /** 年代类型 */
  eraType: string;
  /** 年代 */
  era: string;
  /** 艺术家 */
  artist: string;
  /** 地域类型 */
  regionType: string;
  /** 地域 */
  region: string;
  /** 质地类型 */
  materialType: string;
  /** 质地 */
  material: string;
  /** 通长(底径cm) */
  overallLength: number;
  /** 通宽(口径cm) */
  overallWidth: number;
  /** 通高(cm) */
  totalHeight: number;
  /** 具体尺寸 */
  specificDimensions: string;
  /** 质量范围 */
  weightRange: string;
  /** 具体质量 */
  specificWeight: number;
  /** 质量单位 */
  weightUnit: string;
  /** 文物级别 */
  culturalLevel: string;
  /** 藏品来源 */
  collectionSource: string;
  /** 完残状况 */
  condition: string;
  /** 保存状态 */
  preservationStatus: string;
  /** 征集日期 */
  collectionDate: string;
  /** 入藏日期范围 */
  collectionDateRange: string;
  /** 入藏年度 */
  collectionYear: string;
  /** 类型 */
  type: string;
  /** 人文类型 */
  culturalType: string;
  /** 藏品介绍 */
  collectionIntroduction: string;
  /** 文本类型 */
  textType: string;
  /** 声像载体类型 */
  audioVisualCarrierType: string;
  /** 声像载体存放位置 */
  audioVisualStorageLocation: string;
  /** 计算机磁盘路径 */
  diskPath: string;
  /** 颜色类别 */
  colorCategory: string;
  /** 颜色描述 */
  colorDescription: string;
  /** 存放位置ID */
  warehouseId: string;
  /** 存放位置 */
  warehouseName: string;
  /** 备注 */
  notes: string;
  /** 入馆时间 */
  museumEntryTime: string;
  /** 入藏时间 */
  collectionTime: string;
  /** 登录时间 */
  loginTime: string;
  /** 入柜时间 */
  cabinetEntryTime: string;
}

/**
 * 添加藏品参数
 */
export interface AddCollectionParams {
  /** 图片信息 */
  imageInfo?: string;
  /** 编号类别 */
  numberCategory?: string;
  /** 藏品编号 */
  code?: string;
  /** 藏品名称 */
  collectionName?: string;
  /** 藏品类别ID */
  categoryId: string;
  /** RFID编号 */
  rfidCode?: string;
  /** 数量 */
  quantity?: number;
  /** 数量单位 */
  unit?: string;
  /** 年代类型 */
  eraType?: string;
  /** 年代 */
  era?: string;
  /** 艺术家 */
  artist?: string;
  /** 地域类型 */
  regionType?: string;
  /** 地域 */
  region?: string;
  /** 质地类型 */
  materialType?: string;
  /** 质地 */
  material: string;
  /** 通长(底径cm) */
  overallLength?: number;
  /** 通宽(口径cm) */
  overallWidth?: number;
  /** 通高(cm) */
  totalHeight?: number;
  /** 具体尺寸 */
  specificDimensions?: string;
  /** 质量范围 */
  weightRange?: string;
  /** 具体质量 */
  specificWeight?: number;
  /** 质量单位 */
  weightUnit?: string;
  /** 文物级别 */
  culturalLevel?: string;
  /** 藏品来源 */
  collectionSource?: string;
  /** 完残状况 */
  condition?: string;
  /** 保存状态 */
  preservationStatus?: string;
  /** 征集日期 */
  collectionDate?: string;
  /** 入藏日期范围 */
  collectionDateRange?: string;
  /** 入藏年度 */
  collectionYear?: string;
  /** 类型 */
  type?: string;
  /** 人文类型 */
  culturalType?: string;
  /** 藏品介绍 */
  collectionIntroduction?: string;
  /** 文本类型 */
  textType?: string;
  /** 声像载体类型 */
  audioVisualCarrierType?: string;
  /** 声像载体存放位置 */
  audioVisualStorageLocation?: string;
  /** 计算机磁盘路径 */
  diskPath?: string;
  /** 颜色类别 */
  colorCategory?: string;
  /** 颜色描述 */
  colorDescription?: string;
  /** 备注 */
  notes?: string;
  /** 入馆时间 */
  museumEntryTime?: string;
  /** 入藏时间 */
  collectionTime?: string;
  /** 登录时间 */
  loginTime?: string;
  /** 入柜时间 */
  cabinetEntryTime?: string;
}

/**
 * 藏品查询参数
 */
export interface CollectionQueryParams extends PageParam {
  /** 藏品编号 */
  collectionCode?: string;
  /** 藏品名称 */
  collectionName?: string;
  /** 藏品类别ID */
  categoryId?: string;
  /** 地域类型 */
  regionType?: string;
  /** 地域 */
  region?: string;
  /** 藏品来源 */
  collectionSource?: string;
  /** 入藏日期范围 */
  collectionTime?: string;
  /** 类型 */
  type?: string;
}
