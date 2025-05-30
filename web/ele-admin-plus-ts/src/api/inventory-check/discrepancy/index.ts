import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type {
  InventoryCheckDiscrepancy,
  GetInventoryCheckDiscrepancyListParams,
  UpdateInventoryCheckDiscrepancyParams
} from './model'

/**
 * 查询盘点差异藏品分页列表
 * @param params 查询参数
 */
export async function getInventoryCheckDiscrepancyList(
  params: GetInventoryCheckDiscrepancyListParams
) {
  const res = await request.get<ApiResult<PageResult<InventoryCheckDiscrepancy>>>(
    '/Inventory/getDiscrepancy',
    { params }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 补充差异说明
 * @param data 更新参数
 */
export async function updateInventoryCheckDiscrepancy(data: UpdateInventoryCheckDiscrepancyParams) {
  const res = await request.put<ApiResult<unknown>>('/Inventory/discrepancyUpdate', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
