import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { BookCollection, BookQueryParams } from './model';

/**
 * 查看图书分页列表
 * @param params 查询参数
 */
async function getBookList(params: BookQueryParams) {
  const res = await request.get<ApiResult<PageResult<BookCollection>>>(
    '/books',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加图书
 * @param data 图书信息
 */
async function addBook(data: BookCollection) {
  const res = await request.post<ApiResult<unknown>>('/books', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改图书
 * @param data 图书信息
 */
async function updateBook(data: BookCollection) {
  const res = await request.put<ApiResult<unknown>>('/books', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除图书
 * @param ids 图书ID集合
 */
async function deleteBooks(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/books', {
    data: { ids }
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 审核通过图书
 * @param ids 图书ID集合
 */
async function approveBooks(ids: number[]) {
  const res = await request.post<ApiResult<unknown>>('/books/approve', { ids });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查看图书详情
 * @param id 图书ID
 */
async function getBookDetails(id: string) {
  const res = await request.get<ApiResult<BookCollection>>('/books/details', {
    params: { id }
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getBookList,
  addBook,
  updateBook,
  deleteBooks,
  approveBooks,
  getBookDetails
};
