/**
 * 分类信息
 */
export interface Category {
  /** 分类ID */
  id: number
  /** 分类名称 */
  name: string
  /** 分类编码 */
  code: string
  /** 父级ID */
  parentId: number | null
  /** 排序 */
  sort: number
  /** 创建时间 */
  createTime: string
}
