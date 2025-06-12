import request from '@/utils/request'
import type { ApiResult } from '@/api'
import type {
  CollectionStatisticsParams,
  CollectionStatisticsResponse,
  CollectionCategoryItem,
  CollectionStatusItem
} from './model'

/**
 * 获取藏品信息统计
 * @param data 查询参数
 * @returns 返回藏品统计信息，包含在藏、出库、修复、注销总数
 */
export async function getCollectionStatistics(data: CollectionStatisticsParams) {
  const res = await request.post<ApiResult<CollectionStatisticsResponse>>(
    '/Index/collectionStatisticsTime',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取藏品分类统计
 * @param data 查询参数
 * @returns 返回藏品分类统计信息，包含分类名称和数量
 */
export async function getCollectionStatisticsCategory(data: CollectionStatisticsParams) {
  const res = await request.post<ApiResult<CollectionCategoryItem[]>>(
    '/Index/collectionStatisticsCategory',
    data
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 获取藏品状态分布
 * @param data 查询参数
 * @returns 返回藏品状态分布信息，包含状态名称和数量
 */
export async function getCollectionStatus(data: CollectionStatisticsParams) {
  const res = await request.post<ApiResult<CollectionStatusItem[]>>('/Index/collectionStatus', data)
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
