/**
 * 藏品组
 */
export interface Classification {
  /** ID 编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 藏品组名称 */
  classificationName: string;
  /** 负责人 */
  personInCharge: string;
  /** 备注说明 */
  remarks?: string;
  /** 排序 */
  sortOrder?: number;
  /** 状态，0：未审核，1：已审核 */
  auditStatus?: number;
}

/**
 * 新增藏品组参数
 */
export interface AddClassificationParams {
  /** 编号 */
  code: string;
  /** 藏品组名称 */
  classificationName: string;
  /** 负责人 */
  personInCharge: string;
  /** 备注说明 */
  remarks?: string;
  /** 排序 */
  sortOrder?: number;
  /** 状态，0：未审核，1：已审核 */
  auditStatus?: number;
}

/**
 * 修改藏品组参数
 */
export interface UpdateClassificationParams {
  /** ID 编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 藏品组名称 */
  classificationName: string;
  /** 负责人 */
  personInCharge: string;
  /** 备注说明 */
  remarks?: string;
  /** 排序 */
  sortOrder?: number;
}

/**
 * 删除藏品组参数
 */
export interface DeleteClassificationParams {
  /** ID集合 */
  ids: number[];
}

/**
 * 查询藏品组参数
 */
export interface ClassificationQueryParams {
  /** 组名称 */
  classificationName?: string;
  /** 分页查询每页数量 */
  limit?: number;
  /** 分页查询页码 */
  page?: number;
  /** 排序方式 */
  order?: string;
  /** 排序字段 */
  sort?: string;
}
