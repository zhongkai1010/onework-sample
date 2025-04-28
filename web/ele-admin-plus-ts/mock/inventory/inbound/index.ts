import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/inventory/inbound/type/collection',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [
          {
            id: mock('@guid'),
            name: mock('@cname'),
            code: mock('@string("upper", 8)'),
            type: mock('@integer(1, 2)'),
            status: mock('@integer(0, 1)'),
            createTime: mock('@datetime')
          }
        ]
      };
    }
  },
  {
    url: '/api/inventory/inbound/register',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '入库登记成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/inbound',
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
    url: '/api/inventory/inbound/approve',
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
    url: '/api/inventory/inbound/confirm',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '确认入库成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/inbound/details',
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
  }
] as MockMethod[];
