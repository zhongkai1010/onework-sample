import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/inventory/warehouse',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [
          {
            id: mock('@guid'),
            name: '库房A',
            code: mock('@string("upper", 8)'),
            type: 1,
            parentId: null,
            children: [
              {
                id: mock('@guid'),
                name: '展区1',
                code: mock('@string("upper", 8)'),
                type: 2,
                parentId: mock('@guid'),
                children: []
              },
              {
                id: mock('@guid'),
                name: '展区2',
                code: mock('@string("upper", 8)'),
                type: 2,
                parentId: mock('@guid'),
                children: []
              }
            ]
          },
          {
            id: mock('@guid'),
            name: '库房B',
            code: mock('@string("upper", 8)'),
            type: 1,
            parentId: null,
            children: [
              {
                id: mock('@guid'),
                name: '展区3',
                code: mock('@string("upper", 8)'),
                type: 2,
                parentId: mock('@guid'),
                children: []
              }
            ]
          }
        ]
      };
    }
  },
  {
    url: '/api/inventory/warehouse',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增库房成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/warehouse',
    method: 'put',
    response: () => {
      return {
        code: 0,
        message: '修改库房成功',
        data: null
      };
    }
  },
  {
    url: '/api/inventory/warehouse',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除库房成功',
        data: null
      };
    }
  }
] as MockMethod[];
