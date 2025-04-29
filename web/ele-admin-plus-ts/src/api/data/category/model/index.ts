/**
 * 藏品分类
 */
export interface Category {
  /** 分类ID */
  id: number
  /** 分类名称 */
  name: string
  /** 上级分类 */
  parentId?: number
  /** 分类码 */
  code: string
  /** 描述 */
  description: string
  /** 子级 */
  children?: Category[]
}

/**
 * 编辑藏品分类参数
 */
export interface CategoryEditParams extends Omit<Category, 'id' | 'children'> {
  /** 分类ID */
  id?: number
}

/**
 * 删除藏品分类参数
 */
export interface DeleteCategoryParams {
  /** 分类ID集合 */
  ids: number[]
}

/**
 * 查询藏品分类参数
 */
export interface CategoryQueryParams extends Partial<Omit<Category, 'id' | 'children'>> {}
