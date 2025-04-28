import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/data/classification',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: 10 }, () => ({
            id: mock('@guid'),
            name: mock('@ctitle(3, 6)'),
            code: mock('@string("upper", 8)'),
            description: mock('@cparagraph(1)'),
            createTime: mock('@datetime'),
            updateTime: mock('@datetime')
          }))
        }
      };
    }
  },
  {
    url: '/api/data/classification',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增藏品组成功',
        data: null
      };
    }
  },
  {
    url: '/api/data/classification',
    method: 'put',
    response: () => {
      return {
        code: 0,
        message: '修改藏品组成功',
        data: null
      };
    }
  },
  {
    url: '/api/data/classification',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除藏品组成功',
        data: null
      };
    }
  }
] as MockMethod[];
