import { ApiResult, PageResult } from '@/api';
import { Accident, AddAccidentParams, AccidentQueryParams } from './model';
import request from '@/utils/request';

/**
 * 添加事故记录
 */
export const addAccident = (data: AddAccidentParams) => {
  return request.post<ApiResult<void>>('/accident-records', data);
};

/**
 * 查询事故记录分页列表
 */
export const getAccidentList = (params: AccidentQueryParams) => {
  return request.get<ApiResult<PageResult<Accident>>>('/accident-records', {
    params
  });
};

/**
 * 修改事故记录
 */
export const updateAccident = (data: Accident) => {
  return request.put<ApiResult<void>>('/accident-records', data);
};

/**
 * 删除事故记录
 */
export const deleteAccident = (id: string) => {
  return request.delete<ApiResult<void>>(`/accident-records/${id}`);
};
