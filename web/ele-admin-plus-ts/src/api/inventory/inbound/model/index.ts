import { PageParam } from '@/api';

// 图片信息接口
export interface ImageInfo {
  imageUrl: string; // 图片链接
  imageSize: string; // 图片大小
}

// 入库单基础接口
export interface InboundEntryBase {
  id: string; // ID
  collectionStatus: string; // 藏品状态
  imageInfo: ImageInfo; // 图片信息
  category: string; // 编号类别
  collectionId: string; // 藏品编号
  collectionName: string; // 藏品名称
  collectionCategory: string; // 藏品类别
  code: string; // 编号
  quantity: number; // 数量
  unit: string; // 数量单位
  eraType: string; // 年代类型
  era: string; // 年代
  artist: string; // 艺术家
  regionType: string; // 地域类型
  region: string; // 地域
  materialType: string; // 质地类型
  material: string; // 质地
  length: number; // 通长
  diameter: number; // 底径
  width: number; // 通宽
  caliber: number; // 口径
  height: number; // 通高
  specificDimensions: string; // 具体尺寸
  weightRange: string; // 质量范围
  specificWeight: number; // 具体质量
  weightUnit: string; // 质量单位
  culturalLevel: string; // 文物级别
  collectionSource: string; // 藏品来源
  condition: string; // 完残状况
  preservationStatus: string; // 保存状态
  collectionDate: string; // 征集日期
  collectionDateRange: string; // 入藏日期范围
  collectionYear: string; // 入藏年度
  type: string; // 类型
  culturalType: string; // 人文类型
  collectionIntroduction: string; // 藏品介绍
  textType: string; // 文本类型
  audioVisualCarrierType: string; // 声像载体类型
  audioVisualStorageLocation: string; // 声像载体存放位置
  diskPath: string; // 计算机磁盘路径
  colorCategory: string; // 颜色类别
  colorDescription: string; // 颜色描述
  storageLocation: string; // 存放位置
  notes: string; // 备注
  museumEntryTime: string; // 入馆时间
  collectionTime: string; // 入藏时间
  loginTime: string; // 登录时间
  cabinetEntryTime: string; // 入柜时间
}

// 入库单查询参数接口
export interface InboundEntryQueryParams extends PageParam {
  documentStatus?: string; // 单据状态
  inputStorageType?: string; // 入库类型
  collectionSelection?: string; // 藏品选择
  agent?: string; // 经办人
  receivingWarehouse?: string; // 接收库房
  remarks?: string; // 备注
}

// 分页结果接口
