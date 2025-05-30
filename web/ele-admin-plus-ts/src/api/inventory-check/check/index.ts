import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type {
  InventoryCheckCollection,
  InventoryCheckCollectionQueryParams,
  AddInventoryCheckCollectionParams,
  UpdateInventoryCheckCollectionStatusParams
} from './model'

/**
 * 查询盘点藏品分页列表
 */
export async function getInventoryCheckCollectionPage(params: InventoryCheckCollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<InventoryCheckCollection>>>(
    '/Inventory/getCollection',
    {
      params
    }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 新增盘点藏品
 */
export async function addInventoryCheckCollection(data: AddInventoryCheckCollectionParams) {
  const res = await request.put<ApiResult<unknown>>('/Inventory/checkAdd', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 更新盘点藏品状态
 */
export async function updateInventoryCheckCollectionStatus(
  data: UpdateInventoryCheckCollectionStatusParams
) {
  const res = await request.post<ApiResult<unknown>>('/Inventory/checkUpdate', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
