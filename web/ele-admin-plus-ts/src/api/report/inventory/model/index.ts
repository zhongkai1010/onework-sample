/**
 * 藏品统计查询参数
 * @property type - 统计类型：1:年度 2:季度 3:月度
 * @property typeValue - 统计值：年度格式：[2025]，季度和月度格式：['2025-01','2025-02']
 */
export interface CollectionStatisticsParams {
  type: string
  typeValue: string[]
}

/**
 * 藏品统计响应数据
 * @property collection - 藏品总数（在藏）
 * @property outbound - 出库总数
 * @property repair - 修复总数
 * @property cancellation - 注销总数
 */
export interface CollectionStatisticsResponse {
  collection: string
  outbound: string
  repair: string
  cancellation: string
}

/**
 * 藏品分类统计响应数据项
 * @property name - 分类名称
 * @property number - 数量
 */
export interface CollectionCategoryItem {
  name: string
  number: number
}

/**
 * 藏品状态分布响应数据项
 * @property name - 状态名称
 * @property number - 数量
 */
export interface CollectionStatusItem {
  name: string
  number: number
}
