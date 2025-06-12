/**
 * 操作日志统计查询参数
 * @property startTime - 开始时间（默认本月）
 * @property endTime - 结束时间（默认本月）
 */
export interface OperateLogParams {
  startTime: string
  endTime: string
}

/**
 * 操作日志统计响应数据
 * @property number - 本月操作总次数
 * @property people - 操作人数量
 * @property avg_number - 平均每日次数
 */
export interface OperateLogStatisticsResponse {
  number: number
  people: number
  avg_number: number
}

/**
 * 操作类型统计响应数据项
 * @property name - 统计项
 * @property number - 统计值
 */
export interface OperateLogStatusItem {
  name: string
  number: number
}

/**
 * 操作频率时间趋势数据项
 * @property date - 日期
 * @property number - 次数
 */
export interface OperateLogTimeItem {
  date: string
  number: number
}

/**
 * 操作人活跃度排行数据项
 * @property userId - 用户id
 * @property username - 用户昵称
 * @property count - 数量
 */
export interface OperateLogLivenessItem {
  userId: string
  username: string
  count: number
}
