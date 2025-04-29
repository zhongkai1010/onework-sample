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
            id: 1,
            name: '绘画',
            code: 'WBKWITYB',
            description: '绘画类藏品',
            parentId: null
          },
          {
            id: 2,
            name: '油画',
            code: 'HQOLJNCV',
            description: '油画类藏品',
            parentId: 1
          },
          {
            id: 3,
            name: '水彩',
            code: 'FYHNESDK',
            description: '水彩类藏品',
            parentId: 1
          },
          {
            id: 4,
            name: '素描',
            code: 'SMESDK',
            description: '素描类藏品',
            parentId: 1
          },
          {
            id: 5,
            name: '雕塑',
            code: 'RWHEQHCM',
            description: '雕塑类藏品',
            parentId: null
          },
          {
            id: 6,
            name: '石雕',
            code: 'MGXYSTPO',
            description: '石雕类藏品',
            parentId: 5
          },
          {
            id: 7,
            name: '木雕',
            code: 'MDXYSTPO',
            description: '木雕类藏品',
            parentId: 5
          },
          {
            id: 8,
            name: '陶瓷',
            code: 'TCXYSTPO',
            description: '陶瓷类藏品',
            parentId: null
          },
          {
            id: 9,
            name: '青花瓷',
            code: 'QHCXYSTPO',
            description: '青花瓷类藏品',
            parentId: 8
          },
          {
            id: 10,
            name: '彩瓷',
            code: 'CCXYSTPO',
            description: '彩瓷类藏品',
            parentId: 8
          },
          {
            id: 11,
            name: '书法',
            code: 'SFXYSTPO',
            description: '书法类藏品',
            parentId: null
          },
          {
            id: 12,
            name: '楷书',
            code: 'KSXYSTPO',
            description: '楷书类藏品',
            parentId: 11
          },
          {
            id: 13,
            name: '行书',
            code: 'XSXYSTPO',
            description: '行书类藏品',
            parentId: 11
          },
          {
            id: 14,
            name: '玉器',
            code: 'YQXYSTPO',
            description: '玉器类藏品',
            parentId: null
          },
          {
            id: 15,
            name: '和田玉',
            code: 'HTYXYSTPO',
            description: '和田玉类藏品',
            parentId: 14
          },
          {
            id: 16,
            name: '翡翠',
            code: 'FCXYSTPO',
            description: '翡翠类藏品',
            parentId: 14
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
