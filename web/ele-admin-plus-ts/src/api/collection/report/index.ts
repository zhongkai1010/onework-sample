import request from '@/utils/request'
import type { PageResult } from '@/utils/request'
import type { CollectionReport, CollectionStatistics } from './model'

/**
 * 获取藏品报表数据
 */
export function getCollectionReport(params: any) {
  return request<PageResult<CollectionReport>>({
    url: '/collection/report',
    method: 'get',
    params
  })
}

/**
 * 获取藏品统计数据
 */
export function getCollectionStatistics() {
  return request<CollectionStatistics>({
    url: '/collection/statistics',
    method: 'get'
  })
}
