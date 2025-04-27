/**
 * 藏品分类
 */
export interface Category {
  /** 分类ID */
  id?: number;
  /** 分类名称 */
  name?: string;
  /** 上级分类ID */
  parentId?: number;
}

/**
 * 新增藏品分类参数
 */
export interface AddCategoryParam {
  /** 分类名称 */
  name: string;
  /** 上级分类ID */
  parentId: number;
}

/**
 * 修改藏品分类参数
 */
export interface UpdateCategoryParam extends AddCategoryParam {
  /** 分类ID */
  id: number;
}

/**
 * 删除藏品分类参数
 */
export interface DeleteCategoryParam {
  /** 分类ID集合 */
  ids: number[];
}

/**
 * 查询藏品分类参数
 */
export interface CategoryParam {
  /** 分类名称 */
  name?: string;
  /** 上级分类ID */
  parentId?: string;
}
