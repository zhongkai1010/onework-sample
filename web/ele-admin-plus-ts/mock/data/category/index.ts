import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/data/categories',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增分类成功',
        data: null
      };
    }
  },
  {
    url: '/api/data/categories',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [
          {
            id: mock('@guid'),
            name: '绘画',
            code: mock('@string("upper", 8)'),
            description: '绘画类藏品',
            parentId: null,
            children: [
              {
                id: mock('@guid'),
                name: '油画',
                code: mock('@string("upper", 8)'),
                description: '油画类藏品',
                parentId: mock('@guid'),
                children: []
              },
              {
                id: mock('@guid'),
                name: '水彩',
                code: mock('@string("upper", 8)'),
                description: '水彩类藏品',
                parentId: mock('@guid'),
                children: []
              }
            ]
          },
          {
            id: mock('@guid'),
            name: '雕塑',
            code: mock('@string("upper", 8)'),
            description: '雕塑类藏品',
            parentId: null,
            children: [
              {
                id: mock('@guid'),
                name: '石雕',
                code: mock('@string("upper", 8)'),
                description: '石雕类藏品',
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
    url: '/api/data/categories',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除分类成功',
        data: null
      };
    }
  },
  {
    url: '/api/data/categories',
    method: 'put',
    response: () => {
      return {
        code: 0,
        message: '修改分类成功',
        data: null
      };
    }
  },
  {
    url: '/api/data/categories/import',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '导入分类成功',
        data: null
      };
    }
  }
] as MockMethod[];
