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
 * 藏品来源统计响应数据项
 * @property collectionSource - 来源
 * @property count - 数量
 */
export interface CollectionSourceItem {
  collectionSource: string
  count: number
}

/**
 * 藏品状态分布统计响应数据项
 * @property name - 统计项
 * @property number - 统计值
 */
export interface CollectionStatusItem {
  name: string
  number: number
}
