import { ApiResult, PageResult } from '@/api';
import {
  Publication,
  AddPublicationParams,
  PublicationQueryParams
} from './model';
import request from '@/utils/request';

/**
 * 添加出版著作
 */
export const addPublication = (data: AddPublicationParams) => {
  return request.post<ApiResult<void>>('/publications', data);
};

/**
 * 查询出版著作分页列表
 */
export const getPublicationList = (params: PublicationQueryParams) => {
  return request.get<ApiResult<PageResult<Publication>>>('/publications', {
    params
  });
};

/**
 * 修改出版著作
 */
export const updatePublication = (data: Publication) => {
  return request.put<ApiResult<void>>('/publications', data);
};

/**
 * 删除出版著作
 */
export const deletePublication = (id: string) => {
  return request.delete<ApiResult<void>>(`/publications/${id}`);
};
