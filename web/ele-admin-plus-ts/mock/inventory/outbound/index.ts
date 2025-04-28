import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/inventory/outbound',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增出库单成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/outbound',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: 10 }, () => ({
            id: mock('@guid'),
            orderNo: mock('@string("upper", 10)'),
            type: mock('@integer(1, 2)'),
            status: mock('@integer(0, 2)'),
            createTime: mock('@datetime'),
            updateTime: mock('@datetime')
          }))
        }
      };
    }
  },
  {
    url: '/api/inventory/outbound',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除出库单成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/outbound/confirm',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '确认出库成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/outbound/approve',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '审核成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/outbound/details',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: 10 }, () => ({
            id: mock('@guid'),
            orderNo: mock('@string("upper", 10)'),
            collectionId: mock('@guid'),
            collectionName: mock('@cname'),
            collectionCode: mock('@string("upper", 8)'),
            status: mock('@integer(0, 2)'),
            createTime: mock('@datetime'),
            updateTime: mock('@datetime')
          }))
        }
      };
    }
  }
] as MockMethod[];
