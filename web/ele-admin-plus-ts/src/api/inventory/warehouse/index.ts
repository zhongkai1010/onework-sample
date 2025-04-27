import request from '@/utils/request';
import type {
  ApiResult,
  Warehouse,
  AddWarehouseParams,
  UpdateWarehouseParams,
  DeleteWarehouseParams,
  WarehouseQueryParams
} from './model';

/**
 * 查询库房&展区（树形结构）
 * @param params 查询参数
 */
export async function listWarehouses(params?: WarehouseQueryParams) {
  const res = await request.get<ApiResult<Warehouse[]>>(
    '/api/inventory/warehouse',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 新增库房
 * @param data 库房信息
 */
export async function addWarehouse(data: AddWarehouseParams) {
  const res = await request.post<ApiResult<unknown>>(
    '/api/inventory/warehouse',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改库房
 * @param data 库房信息
 */
export async function updateWarehouse(data: UpdateWarehouseParams) {
  const res = await request.put<ApiResult<unknown>>(
    '/api/inventory/warehouse',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除库房
 * @param data 库房ID
 */
export async function removeWarehouse(data: DeleteWarehouseParams) {
  const res = await request.delete<ApiResult<unknown>>(
    '/api/inventory/warehouse',
    { data }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
