import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/inventory/transfer',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增拨库单成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/transfer',
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
            sourceLocation: mock('@string("upper", 8)'),
            targetLocation: mock('@string("upper", 8)'),
            status: mock('@integer(0, 2)'),
            createTime: mock('@datetime'),
            updateTime: mock('@datetime')
          }))
        }
      };
    }
  },
  {
    url: '/api/inventory/transfer',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除拨库单成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/transfer/approve',
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
    url: '/api/inventory/transfer/confirm',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '确认拨库成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/transfer/details',
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
            sourceLocation: mock('@string("upper", 8)'),
            targetLocation: mock('@string("upper", 8)'),
            status: mock('@integer(0, 2)'),
            createTime: mock('@datetime'),
            updateTime: mock('@datetime')
          }))
        }
      };
    }
  }
] as MockMethod[];
