/**
 * 库房信息
 */
export interface Warehouse {
  /** ID 编号 */
  id: string;
  /** 编号 */
  code?: string;
  /** 上级库房 */
  parentId: string;
  /** 名称 */
  name?: string;
  /** 级别,1:库，2:区 */
  type?: string;
  /** 备注 */
  remark?: string;
  /** 列数 */
  columnCount: string;
  /** 节数 */
  sectionCount: string;
  /** 层数 */
  layerCount: string;
  /** 固定列类型 */
  fixedColumnType: string;
}

/**
 * 新增库房参数
 */
export interface AddWarehouseParams {
  /** 编号 */
  code?: string;
  /** 上级库房 */
  parentId: string;
  /** 名称 */
  name?: string;
  /** 级别,1:库，2:区 */
  type?: string;
  /** 备注 */
  remark?: string;
  /** 列数 */
  columnCount: string;
  /** 节数 */
  sectionCount: string;
  /** 层数 */
  layerCount: string;
  /** 固定列类型 */
  fixedColumnType: string;
}

/**
 * 修改库房参数
 */
export interface UpdateWarehouseParams extends AddWarehouseParams {
  /** ID 编号 */
  id: string;
}

/**
 * 删除库房参数
 */
export interface DeleteWarehouseParams {
  /** ID 编号 */
  id: string;
}

/**
 * 查询库房参数
 */
export interface WarehouseQueryParams {
  /** 名称 */
  name?: string;
}

/**
 * API 响应结果
 */
export interface ApiResult<T> {
  /** 状态码 */
  code: number;
  /** 返回数据 */
  data?: T;
  /** 错误信息 */
  error?: string;
  /** 状态信息 */
  message?: string;
}
