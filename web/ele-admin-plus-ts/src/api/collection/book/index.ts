import request from '@/utils/request'
import type { ApiResult, PageResult } from '@/api'
import type { BookCollection, AddBookParams, BookQueryParams } from './model'

/**
 * 查看图书分页列表
 * @param params 查询参数
 */
export async function getBookList(params: BookQueryParams) {
  const res = await request.get<ApiResult<PageResult<BookCollection>>>('/CollectionBook/page', {
    params
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 添加图书
 * @param data 图书信息
 */
export async function addBook(data: AddBookParams) {
  const res = await request.post<ApiResult<unknown>>('/CollectionBook/add', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 修改图书
 * @param data 图书信息
 */
export async function updateBook(data: BookCollection) {
  const res = await request.put<ApiResult<unknown>>('/CollectionBook/update', data)
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 删除图书
 * @param ids 图书ID集合
 */
export async function deleteBooks(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionBook/delete', {
    ids
  })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 审核通过图书
 * @param ids 图书ID集合
 */
export async function approveBooks(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/CollectionBook/approve', { ids })
  if (res.data.code === 0) {
    return res.data.message
  }
  return Promise.reject(new Error(res.data.message))
}

/**
 * 查看图书详情
 * @param id 图书ID
 */
export async function getBookDetails(id: string) {
  const res = await request.get<ApiResult<BookCollection>>('/CollectionBook/details', {
    params: { id }
  })
  if (res.data.code === 0 && res.data.data) {
    return res.data.data
  }
  return Promise.reject(new Error(res.data.message))
}
