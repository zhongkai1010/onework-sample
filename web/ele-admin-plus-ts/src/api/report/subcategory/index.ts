import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type {
  CollectionStatisticsParams,
  CollectionSourceItem,
  CollectionStatusItem
} from './model'

/**
 * 获取藏品来源统计
 * @param data 查询参数
 * @returns 返回藏品来源统计信息列表，每个项包含来源和对应数量
 */
export async function getCollectionSourceStatistics(data: CollectionStatisticsParams) {
  const res = await request.post<ApiResult<CollectionSourceItem[]>>(
    '/Index/collectionStatisticsSource',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取藏品状态分布统计
 * @param data 查询参数
 * @returns 返回藏品状态分布统计信息列表，每个项包含状态名称和对应数量
 */
export async function getCollectionStatusStatistics(data: CollectionStatisticsParams) {
  const res = await request.post<ApiResult<CollectionStatusItem[]>>(
    '/Index/collectionStatisticsStatus',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
