/**
 * 藏品分类
 */
export interface Category {
  /** 分类ID */
  id: number;
  /** 分类名称 */
  name: string;
  /** 上级分类 */
  parentId: number;
}

/**
 * 新增藏品分类参数
 */
export interface AddCategoryParams {
  /** 名称 */
  name: string;
  /** 上级分类 */
  parentId: number;
}

/**
 * 修改藏品分类参数
 */
export interface UpdateCategoryParams {
  /** 分类ID */
  id: number;
  /** 名称 */
  name: string;
  /** 上级分类 */
  parentId: number;
}

/**
 * 删除藏品分类参数
 */
export interface DeleteCategoryParams {
  /** 分类ID集合 */
  ids: number[];
}

/**
 * 查询藏品分类参数
 */
export interface CategoryQueryParams {
  /** 分类名称 */
  name?: string;
  /** 上级分类 */
  parentId?: string;
}
