import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { Warehouse, WarehouseQueryParams, AddWarehouseParams, UpdateWarehouseParams, DeleteWarehouseParams, WarehouseCollection, WarehouseCollectionQueryParams, Barcode, BarcodeQueryParams, Location, LocationQueryParams, BindLocationParams } from './model'

/**
 * 查询库房&展区（树形结构）
 * @param params 查询参数
 * @returns 库房列表
 */
export async function getWarehouseTree(params?: WarehouseQueryParams) {
  const res = await request.get<ApiResult<Warehouse[]>>('/inventory/warehouse/all', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 新增库房
 * @param data 库房信息
 * @returns 操作结果消息
 */
export async function addWarehouse(data: AddWarehouseParams) {
  const res = await request.post<ApiResult<null>>('/inventory/warehouse', data)
  if (res.data.code === 0) {
    return res.data.message || '新增成功'
  }
  return Promise.reject(new Error(res.data.message || '新增失败'))
}

/**
 * 修改库房
 * @param data 库房信息
 * @returns 操作结果消息
 */
export async function updateWarehouse(data: UpdateWarehouseParams) {
  const res = await request.put<ApiResult<null>>('/inventory/warehouse', data)
  if (res.data.code === 0) {
    return res.data.message || '修改成功'
  }
  return Promise.reject(new Error(res.data.message || '修改失败'))
}

/**
 * 删除库房
 * @param data 库房ID
 * @returns 操作结果消息
 */
export async function deleteWarehouse(data: DeleteWarehouseParams) {
  const res = await request.delete<ApiResult<null>>('/inventory/warehouse', {
    data
  })
  if (res.data.code === 0) {
    return res.data.message || '删除成功'
  }
  return Promise.reject(new Error(res.data.message || '删除失败'))
}

/**
 * 查询库房藏品列表
 * @param params 查询参数
 * @returns 库房藏品分页数据
 */
export async function getWarehouseCollectionPage(params: WarehouseCollectionQueryParams) {
  const res = await request.get<ApiResult<PageResult<WarehouseCollection>>>('/inventory/warehouse/collection', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 查询地址条码管理分页列表
 * @param params 查询参数
 * @returns 地址条码分页数据
 */
export async function getBarcodePage(params: BarcodeQueryParams) {
  const res = await request.get<ApiResult<PageResult<Barcode>>>('/inventory/warehouse/barcode', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 查询藏品定位分页列表
 * @param params 查询参数
 * @returns 藏品定位分页数据
 */
export async function getLocationPage(params: LocationQueryParams) {
  const res = await request.get<ApiResult<PageResult<Location>>>('/inventory/warehouse/location', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message || '获取数据失败'))
}

/**
 * 绑定藏品位置
 * @param params 绑定信息
 * @returns 操作结果消息
 */
export async function bindLocation(params: BindLocationParams) {
  const res = await request.post<ApiResult<null>>('/inventory/warehouse/location', params)
  if (res.data.code === 0) {
    return res.data.message || '绑定成功'
  }
  return Promise.reject(new Error(res.data.message || '绑定失败'))
}
