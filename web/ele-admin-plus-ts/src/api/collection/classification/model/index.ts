// 藏品组基础信息接口
export interface CollectionGroupBase {
  /** ID 编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 藏品组名称 */
  collectionGroupName: string;
  /** 负责人 */
  responsiblePerson: string;
  /** 备注说明 */
  remarks: string;
  /** 排序 */
  sortOrder: number;
  /** 状态 */
  status: string;
}

// 藏品组查询参数接口
export interface CollectionGroupQueryParams {
  /** 分页查询页码 */
  page?: number;
  /** 分页查询每页数量 */
  limit?: number;
  /** 排序字段 */
  sort?: string;
  /** 排序方式 */
  order?: 'asc' | 'desc';
}

// 藏品组藏品信息接口
export interface CollectionGroupItem {
  /** ID 编号 */
  id: string;
  /** 藏品状态 */
  collectionStatus: string;
  /** 编号类别 */
  codeCategory: string;
  /** 藏品编号 */
  collectionId: string;
  /** 编号 */
  code: string;
  /** 藏品名称 */
  collectionName: string;
  /** 年代类型 */
  eraType: string;
  /** 具体年代 */
  specificEra: string;
  /** 藏品类别 */
  collectionCategory: string;
  /** 艺术家 */
  artist: string;
  /** 艺术作品 */
  artwork: string;
  /** 质地 */
  material: string;
  /** 藏品组 */
  collectionGroup: string;
  /** 数量 */
  quantity: number;
  /** 单位 */
  unit: string;
  /** 通长 */
  totalLength: string;
  /** 底径 */
  bottomDiameter: string;
  /** 总宽 */
  totalWidth: string;
  /** 总高 */
  totalHeight: string;
  /** 口径 */
  caliber: string;
  /** 重量 */
  weight: string;
  /** 图片信息 */
  imageInfo: ImageInfo;
}

// 图片信息接口
export interface ImageInfo {
  /** 图片URL */
  imageUrl: string;
  /** 图片尺寸 */
  imageSize: string;
}
