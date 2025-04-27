import { ApiResult, PageResult } from '@/api';
import {
  Exhibition,
  AddExhibitionParams,
  ExhibitionQueryParams
} from './model';
import request from '@/utils/request';

/**
 * 添加展览
 */
export const addExhibition = (data: AddExhibitionParams) => {
  return request.post<ApiResult<void>>('/exhibitions', data);
};

/**
 * 查询展览分页列表
 */
export const getExhibitionList = (params: ExhibitionQueryParams) => {
  return request.get<ApiResult<PageResult<Exhibition>>>('/exhibitions', {
    params
  });
};

/**
 * 修改展览
 */
export const updateExhibition = (data: Exhibition) => {
  return request.put<ApiResult<void>>('/exhibitions', data);
};

/**
 * 删除展览
 */
export const deleteExhibition = (id: string) => {
  return request.delete<ApiResult<void>>(`/exhibitions/${id}`);
};
