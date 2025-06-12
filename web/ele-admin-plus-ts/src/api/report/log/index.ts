import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type {
  OperateLogParams,
  OperateLogStatisticsResponse,
  OperateLogStatusItem,
  OperateLogTimeItem,
  OperateLogLivenessItem
} from './model'

/**
 * 获取操作日志统计
 * @param data 查询参数
 * @returns 返回操作日志统计信息，包含操作总次数、操作人数量、平均每日次数
 */
export async function getOperateLogStatistics(data: OperateLogParams) {
  const res = await request.post<ApiResult<OperateLogStatisticsResponse>>(
    '/Index/operateLogStatistics',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取操作类型统计
 * @param data 查询参数
 * @returns 返回各类型操作数量统计列表
 */
export async function getOperateLogStatus(data: OperateLogParams) {
  const res = await request.post<ApiResult<OperateLogStatusItem[]>>(
    '/Index/operateLogStatisticsStatus',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取操作频率时间趋势
 * @param data 查询参数
 * @returns 返回每日操作次数统计列表
 */
export async function getOperateLogTime(data: OperateLogParams) {
  const res = await request.post<ApiResult<OperateLogTimeItem[]>>(
    '/Index/operateLogStatisticsTime',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取操作人活跃度排行
 * @param data 查询参数
 * @returns 返回用户操作次数排行列表
 */
export async function getOperateLogLiveness(data: OperateLogParams) {
  const res = await request.post<ApiResult<OperateLogLivenessItem[]>>(
    '/Index/operateLogStatisticsLiveness',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
