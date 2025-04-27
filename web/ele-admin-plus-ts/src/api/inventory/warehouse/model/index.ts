// 仓库基础信息接口
export interface WarehouseBase {
  id: string;
  code: string;
  parentId: string;
  name: string;
  encoding: string;
  level: string;
}

// 仓库查询参数接口
export interface WarehouseQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// 藏品定位信息接口
export interface CollectionLocation {
  collectionId: string;
  addressBarcode: string;
  bindingTime: string;
}

// 藏品定位查询参数接口
export interface CollectionLocationQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}
