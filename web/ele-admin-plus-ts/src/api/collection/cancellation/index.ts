import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type {
  Cancellation,
  AddCancellationParams,
  CancellationQueryParams,
  ApproveCancellationParams,
  RecoverCancellationParams,
  CancellationDetailInfo,
  CancellationCatalogItem,
  CancellationCatalogQueryParams
} from './model'

/**
 * 添加注销记录
 * @param data 注销记录信息
 */
export async function addCancellation(data: AddCancellationParams) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCancellation/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询注销单分页列表
 * @param params 查询参数
 */
export async function getCancellationList(params: CancellationQueryParams) {
  const res = await request.get<ApiResult<PageResult<Cancellation>>>(
    '/CollectionCancellation/page',
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
 * 审核注销单
 * @param data 审核参数
 */
export async function approveCancellation(data: ApproveCancellationParams) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCancellation/confirm', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 恢复注销单
 * @param data 恢复参数
 */
export async function recoverCancellation(data: RecoverCancellationParams) {
  if (!data.ids || data.ids.length === 0) {
    return Promise.reject(new Error('注销单ID集合不能为空'))
  }
  const res = await request.post<ApiResult<unknown>>(
    '/CollectionCancellation/restoreCollection',
    data
  )
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询注销单详情
 * @param id 单据ID
 */
export async function getCancellationDetails(id: number) {
  const res = await request.get<ApiResult<CancellationDetailInfo>>(
    '/CollectionCancellation/details',
    {
      params: { id }
    }
  )
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查询注销单明细
 * @param params 查询参数
 */
export async function getCancellationCatalog(params?: CancellationCatalogQueryParams) {
  const res = await request.get<ApiResult<PageResult<CancellationCatalogItem>>>(
    '/CollectionCancellation/collection_cancellation_detail',
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
 * 上传图片
 * @param id 注销单ID
 * @param documentImage 单据图片
 */
export async function uploadCancellationImage(id: number, documentImage: string) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCancellation/imgs', {
    id,
    documentImage
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除注销单
 * @param ids 注销单ID集合
 */
export async function deleteCancellation(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionCancellation/delete', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}
