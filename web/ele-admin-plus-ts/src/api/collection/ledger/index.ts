import request from '@/utils/request';
import { ApiResult, PageResult } from '@/api';
import { LedgerBase, LedgerQueryParams } from './model';

/**
 * 查询账本分页列表
 * @param params 查询参数
 */
async function getLedgerList(params: LedgerQueryParams) {
  const res = await request.get<ApiResult<PageResult<LedgerBase>>>(
    '/collections/ledger/list',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询账本详情
 * @param id 账本ID
 */
async function getLedgerDetails(id: string) {
  const res = await request.get<ApiResult<LedgerBase>>(
    '/collections/ledger/details',
    {
      params: { id }
    }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 新增账本
 * @param data 账本信息
 */
async function addLedger(data: LedgerBase) {
  const res = await request.post<ApiResult<unknown>>(
    '/collections/ledger',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改账本
 * @param data 账本信息
 */
async function updateLedger(data: LedgerBase) {
  const res = await request.put<ApiResult<unknown>>(
    '/collections/ledger',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除账本
 * @param ids 账本ID集合
 */
async function deleteLedgers(ids: number[]) {
  const res = await request.delete<ApiResult<unknown>>('/collections/ledger', {
    data: { ids }
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入账本
 * @param file 文件对象
 */
async function importLedgers(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post<ApiResult<unknown>>(
    '/collections/ledger/import',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

export default {
  getLedgerList,
  getLedgerDetails,
  addLedger,
  updateLedger,
  deleteLedgers,
  importLedgers
};
