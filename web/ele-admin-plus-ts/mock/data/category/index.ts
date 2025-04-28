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
            id: '99b19Bbe-3b4b-fc25-B3d5-AbFeffDAecA5',
            name: '绘画',
            code: 'WBKWITYB',
            description: '绘画类藏品',
            parentId: null
          },
          {
            id: '1BAcF0D8-3f8b-d284-Eccc-bbA96F4414a0',
            name: '油画',
            code: 'HQOLJNCV',
            description: '油画类藏品',
            parentId: '99b19Bbe-3b4b-fc25-B3d5-AbFeffDAecA5'
          },
          {
            id: 'aDA1b352-c90D-cED1-47fe-B4E8D5BB1dcE',
            name: '水彩',
            code: 'FYHNESDK',
            description: '水彩类藏品',
            parentId: '99b19Bbe-3b4b-fc25-B3d5-AbFeffDAecA5'
          },
          {
            id: 'bDA1b352-c90D-cED1-47fe-B4E8D5BB1dcF',
            name: '素描',
            code: 'SMESDK',
            description: '素描类藏品',
            parentId: '99b19Bbe-3b4b-fc25-B3d5-AbFeffDAecA5'
          },
          {
            id: 'e3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e1',
            name: '雕塑',
            code: 'RWHEQHCM',
            description: '雕塑类藏品',
            parentId: null
          },
          {
            id: 'Ed828C6D-EC10-BfE6-bAA8-E4b595F969BD',
            name: '石雕',
            code: 'MGXYSTPO',
            description: '石雕类藏品',
            parentId: 'e3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e1'
          },
          {
            id: 'Fd828C6D-EC10-BfE6-bAA8-E4b595F969BE',
            name: '木雕',
            code: 'MDXYSTPO',
            description: '木雕类藏品',
            parentId: 'e3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e1'
          },
          {
            id: 'f3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e2',
            name: '陶瓷',
            code: 'TCXYSTPO',
            description: '陶瓷类藏品',
            parentId: null
          },
          {
            id: 'Gd828C6D-EC10-BfE6-bAA8-E4b595F969BF',
            name: '青花瓷',
            code: 'QHCXYSTPO',
            description: '青花瓷类藏品',
            parentId: 'f3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e2'
          },
          {
            id: 'Hd828C6D-EC10-BfE6-bAA8-E4b595F969BG',
            name: '彩瓷',
            code: 'CCXYSTPO',
            description: '彩瓷类藏品',
            parentId: 'f3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e2'
          },
          {
            id: 'g3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e3',
            name: '书法',
            code: 'SFXYSTPO',
            description: '书法类藏品',
            parentId: null
          },
          {
            id: 'Id828C6D-EC10-BfE6-bAA8-E4b595F969BH',
            name: '楷书',
            code: 'KSXYSTPO',
            description: '楷书类藏品',
            parentId: 'g3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e3'
          },
          {
            id: 'Jd828C6D-EC10-BfE6-bAA8-E4b595F969BI',
            name: '行书',
            code: 'XSXYSTPO',
            description: '行书类藏品',
            parentId: 'g3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e3'
          },
          {
            id: 'h3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e4',
            name: '玉器',
            code: 'YQXYSTPO',
            description: '玉器类藏品',
            parentId: null
          },
          {
            id: 'Kd828C6D-EC10-BfE6-bAA8-E4b595F969BJ',
            name: '和田玉',
            code: 'HTYXYSTPO',
            description: '和田玉类藏品',
            parentId: 'h3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e4'
          },
          {
            id: 'Ld828C6D-EC10-BfE6-bAA8-E4b595F969BK',
            name: '翡翠',
            code: 'FCXYSTPO',
            description: '翡翠类藏品',
            parentId: 'h3CEd74b-4fF9-fcd9-1dd5-6A7e004d95e4'
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
