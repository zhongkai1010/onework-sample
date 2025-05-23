/**
 * 藏品报表数据
 */
export interface CollectionReport {
  /** 藏品编号 */
  collectionCode: string
  /** 藏品名称 */
  collectionName: string
  /** 藏品分类 */
  categoryName: string
  /** 出库次数 */
  outboundCount: number
  /** 修复次数 */
  repairCount: number
  /** 入库次数 */
  inboundCount: number
  /** 拨库次数 */
  transferCount: number
  /** 状态 */
  status: number
  /** 创建时间 */
  createTime: string
}

/**
 * 藏品统计数据
 */
export interface CollectionStatistics {
  /** 统计数据 */
  statistics: {
    /** 总数 */
    totalCount: number
    /** 出库总数 */
    outboundCount: number
    /** 修复总数 */
    repairCount: number
    /** 注销总数 */
    cancellationCount: number
  }
  /** 分类统计 */
  categoryStats: Array<{
    name: string
    value: number
  }>
  /** 状态统计 */
  statusStats: Array<{
    name: string
    value: number
  }>
}
