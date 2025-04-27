import { ApiResult, PageResult } from '@/api';
import {
  ArtistWork,
  AddArtistWorkParams,
  ArtistWorkQueryParams
} from './model';
import request from '@/utils/request';

/**
 * 添加艺术家作品
 */
export const addArtistWork = (data: AddArtistWorkParams) => {
  return request.post<ApiResult<void>>('/artists/works', data);
};

/**
 * 查询艺术家作品分页列表
 */
export const getArtistWorkList = (params: ArtistWorkQueryParams) => {
  return request.get<ApiResult<PageResult<ArtistWork>>>('/artists/works', {
    params
  });
};

/**
 * 修改艺术家作品
 */
export const updateArtistWork = (data: ArtistWork) => {
  return request.put<ApiResult<void>>('/artists/works', data);
};

/**
 * 删除艺术家作品
 */
export const deleteArtistWork = (id: string) => {
  return request.delete<ApiResult<void>>(`/artists/works/${id}`);
};
