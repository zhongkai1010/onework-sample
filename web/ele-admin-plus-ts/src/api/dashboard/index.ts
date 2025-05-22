import request from '@/utils/request'
import type { ApiResult } from '@/api'

/**
 * 文物状态统计数据
 */
export interface ArtifactStatusStatistics {
  count1: string // 未审核
  count2: string // 在藏
  count3: string // 维修中
  count4: string // 出库中
  count5: string // 已注销
}

/**
 * 藏品级别统计数据
 */
export interface GradeStatistics {
  id: string // id
  name: string // 级别名
  number: string // 数量
}

/**
 * 入藏年度统计数据
 */
export interface AnnualStatistics {
  time: string // 时间
  number: number // 数量
}

/**
 * 获取文物状态统计
 * @returns 文物状态统计数据
 */
export async function getArtifactStatusStatistics() {
  const res = await request.get<ApiResult<ArtifactStatusStatistics>>(
    '/Index/artifactStatusStatistics'
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 获取藏品级别统计
 * @returns 藏品级别统计数据
 */
export async function getGradeStatistics() {
  const res = await request.get<ApiResult<GradeStatistics[]>>('/Index/gradeStatistics')
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 获取入藏年度统计
 * @returns 入藏年度统计数据
 */
export async function getAnnualStatistics() {
  const res = await request.get<ApiResult<AnnualStatistics[]>>('/Index/annualStatistics')
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}
