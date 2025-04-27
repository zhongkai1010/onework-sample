import { PageParam } from '@/api';

// 图片信息接口
export interface ImageInfo {
  /** 图片链接 */
  imageUrl: string;
  /** 图片大小 */
  imageSize: string;
}

// 出库单基础信息接口
export interface OutboundBase {
  /** ID */
  id: string;
  /** 藏品状态 */
  collectionStatus: string;
  /** 图片信息 */
  imageInfo: ImageInfo;
  /** 编号类别 */
  category: string;
  /** 藏品编号 */
  collectionId: string;
  /** 藏品名称 */
  collectionName: string;
  /** 藏品类别 */
  collectionCategory: string;
  /** 编号 */
  code: string;
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
  /** 通长 */
  length: number;
  /** 底径 */
  diameter: number;
  /** 通宽 */
  width: number;
  /** 口径 */
  caliber: number;
  /** 通高 */
  height: number;
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
  /** 存放位置 */
  storageLocation: string;
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

// 出库单查询参数接口
export interface OutboundQueryParams extends PageParam {
  // 可以添加额外的查询参数
}
