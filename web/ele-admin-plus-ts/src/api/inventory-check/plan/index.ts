import type { ApiResult, PageResult } from '@/api'
import request from '@/utils/request'
import type {
  InventoryCheckPlan,
  InventoryCheckPlanCollection,
  CreateInventoryCheckPlanParams,
  UpdateInventoryCheckPlanParams,
  GetInventoryCheckPlanListParams,
  DeleteInventoryCheckPlanParams,
  StartInventoryCheckParams,
  FinishInventoryCheckParams
} from './model'

/**
 * 添加盘点计划
 * @param data 创建盘点计划参数
 */
export async function createInventoryCheckPlan(data: CreateInventoryCheckPlanParams) {
  const res = await request.post<ApiResult<unknown>>('/mock/api/inventory-check/plan', data, {
    baseURL: ''
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询盘点计划列表分页
 * @param params 查询参数
 */
export async function getInventoryCheckPlanList(params: GetInventoryCheckPlanListParams) {
  const res = await request.get<ApiResult<PageResult<InventoryCheckPlan>>>(
    '/mock/api/inventory-check/plan',
    { params, baseURL: '' }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 编辑盘点计划
 * @param data 更新盘点计划参数
 */
export async function updateInventoryCheckPlan(data: UpdateInventoryCheckPlanParams) {
  const res = await request.put<ApiResult<unknown>>('/mock/api/inventory-check/plan', data, {
    baseURL: ''
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除盘点计划
 * @param data 删除盘点计划参数
 */
export async function deleteInventoryCheckPlan(data: DeleteInventoryCheckPlanParams) {
  const res = await request.delete<ApiResult<unknown>>('/mock/api/inventory-check/plan', {
    data,
    baseURL: ''
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询全部盘点计划列表
 */
export async function getAllInventoryCheckPlans() {
  const res = await request.get<ApiResult<InventoryCheckPlan[]>>(
    '/mock/api/inventory-check/plan/all',
    { baseURL: '' }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查看盘点计划藏品清单
 * @param id 盘点计划ID
 */
export async function getInventoryCheckPlanCollections(id: string) {
  const res = await request.get<ApiResult<InventoryCheckPlanCollection[]>>(
    '/mock/api/inventory-check/plan/list',
    { params: { id }, baseURL: '' }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 开始盘点
 * @param data 开始盘点参数
 */
export async function startInventoryCheck(data: StartInventoryCheckParams) {
  const res = await request.post<ApiResult<unknown>>('/mock/api/inventory-check/plan/start', data, {
    baseURL: ''
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 结束盘点
 * @param data 结束盘点参数
 */
export async function finishInventoryCheck(data: FinishInventoryCheckParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/mock/api/inventory-check/plan/finish',
    data,
    {
      baseURL: ''
    }
  )
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
