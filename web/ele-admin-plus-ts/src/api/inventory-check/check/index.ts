import type { ApiResult, PageResult } from '@/api'
import request from '@/utils/request'
import type {
  InventoryCheckCollection,
  GetInventoryCheckCollectionListParams,
  ConfirmInventoryCheckCollectionParams,
  AddInventoryCheckCollectionParams
} from './model'

/**
 * 查询盘点藏品分页列表
 * @param params 查询参数
 */
export async function getInventoryCheckCollectionList(
  params: GetInventoryCheckCollectionListParams
) {
  const res = await request.get<ApiResult<PageResult<InventoryCheckCollection>>>(
    '/mock/api/inventory-check/check/getCollection',
    { params, baseURL: '' }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 确认藏品状态
 * @param data 确认参数
 */
export async function confirmInventoryCheckCollection(data: ConfirmInventoryCheckCollectionParams) {
  const res = await request.post<ApiResult<unknown>>('/mock/api/inventory-check/check/ok', data, {
    baseURL: ''
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 登记盘盈藏品
 * @param data 登记参数
 */
export async function addInventoryCheckCollection(data: AddInventoryCheckCollectionParams) {
  const res = await request.put<ApiResult<unknown>>('/mock/api/inventory-check/check/add', data, {
    baseURL: ''
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
