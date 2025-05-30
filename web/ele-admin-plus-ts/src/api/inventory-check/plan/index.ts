import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { InventoryPlan, InventoryPlanQueryParams, InventoryPlanDetails } from './model'

/**
 * 添加盘点计划
 */
export async function addInventoryPlan(data: Partial<InventoryPlan>) {
  const res = await request.post<ApiResult<unknown>>('/Inventory/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询盘点计划列表分页
 */
export async function getInventoryPlanPage(params: InventoryPlanQueryParams) {
  const res = await request.get<ApiResult<PageResult<InventoryPlan>>>('/Inventory/page', { params })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询全部盘点计划列表
 */
export async function getInventoryPlanList() {
  const res = await request.get<ApiResult<InventoryPlan[]>>('/Inventory/list')
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查看盘点计划藏品清单
 */
export async function getInventoryPlanDetails(id: string) {
  const res = await request.get<ApiResult<InventoryPlanDetails[]>>('/Inventory/detailsList', {
    params: { id }
  })
  if (res.data.code === 0) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 编辑盘点计划
 */
export async function updateInventoryPlan(data: Partial<InventoryPlan>) {
  const res = await request.put<ApiResult<unknown>>('/Inventory/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除盘点计划
 */
export async function deleteInventoryPlan(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/Inventory/delete', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 开始盘点
 */
export async function startInventoryPlan(id: number, file: File) {
  const formData = new FormData()
  formData.append('id', id.toString())
  formData.append('file', file)
  const res = await request.post<ApiResult<unknown>>('/Inventory/start', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
