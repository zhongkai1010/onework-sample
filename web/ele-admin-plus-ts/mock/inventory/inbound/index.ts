import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/inventory/inbound/type/collection',
    method: 'get',
    response: ({ query }) => {
      const { type } = query
      if (!type) {
        return {
          code: 1,
          message: '入库类型不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: 'success',
        data: Array.from({ length: mock('@integer(1, 5)') }, () => ({
          id: mock('@integer(1, 1000)'),
          collectionName: mock('@ctitle(2, 4)'),
          collectionCode: mock('@string("upper", 8)')
        }))
      }
    }
  },
  {
    url: '/api/inventory/inbound/register',
    method: 'post',
    response: ({ body }) => {
      if (!body.collectionIds || body.collectionIds.length === 0) {
        return {
          code: 1,
          message: '藏品ID集合不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '入库登记成功',
        data: null
      }
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
            id: mock('@integer(1, 1000)'),
            documentImage: mock('@image("200x200", "#50B347", "#FFF", "Mock")'),
            status: mock('@integer(0, 2)'),
            code: mock('@string("upper", 10)'),
            type: mock('@integer(1, 2)'),
            operator: mock('@cname'),
            warehouseId: mock('@integer(1, 100)'),
            warehouseName: mock('@ctitle(2, 4)'),
            storageDate: mock('@date("yyyy-MM-dd")'),
            remarks: mock('@cparagraph(1)')
          }))
        }
      }
    }
  },
  {
    url: '/api/inventory/inbound',
    method: 'delete',
    response: ({ body }) => {
      if (!body.ids || body.ids.length === 0) {
        return {
          code: 1,
          message: '入库单ID集合不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '删除成功',
        data: null
      }
    }
  },
  {
    url: '/api/inventory/inbound/approve',
    method: 'post',
    response: ({ body }) => {
      if (!body.ids || body.ids.length === 0) {
        return {
          code: 1,
          message: '入库单ID集合不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '审核成功',
        data: null
      }
    }
  },
  {
    url: '/api/inventory/inbound/confirm',
    method: 'post',
    response: ({ body }) => {
      if (!body.id) {
        return {
          code: 1,
          message: '入库单ID不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '确认入库成功',
        data: null
      }
    }
  },
  {
    url: '/api/inventory/inbound/details',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      if (!id) {
        return {
          code: 1,
          message: '入库单ID不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: 'success',
        data: {
          id: Number(id),
          documentImage: mock('@image("200x100", "#50B347", "#FFF", "入库单")'),
          status: mock('@integer(0, 2)'),
          code: mock('@string("number", 8)'),
          type: mock('@integer(1, 2)'),
          operator: mock('@cname'),
          warehouseId: mock('@integer(1, 10)'),
          warehouseName: mock('@pick(["库房A", "库房B", "库房C"])'),
          storageDate: mock('@date("yyyy-MM-dd")'),
          remarks: mock('@cparagraph(1, 3)'),
          collections: Array.from({ length: mock('@integer(1, 5)') }, () => ({
            id: mock('@integer(1, 1000)'),
            code: mock('@string("number", 8)'),
            collectionCode: mock('@string("number", 6)'),
            collectionName: mock('@pick(["青花瓷", "青铜器", "玉器", "书画", "陶瓷"])'),
            warehouseId: mock('@integer(1, 10)'),
            warehouseName: mock('@pick(["库房A", "库房B", "库房C"])'),
            storageDate: mock('@date("yyyy-MM-dd")'),
            status: mock('@integer(0, 2)')
          }))
        }
      }
    }
  },
  /**
   * 查询入库单明细
   * 返回入库单的藏品明细列表
   */
  {
    url: '/api/inventory/inbound/collection',
    method: 'get',
    response: ({ query }) => {
      const { code, collectionCode, collectionName, status } = query
      return {
        code: 0,
        data: {
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                code: code || '@string("upper", 10)',
                collectionCode: collectionCode || '@string("upper", 8)',
                collectionName: collectionName || '@ctitle(2, 4)',
                'warehouseId|+1': 1,
                warehouseName: '@ctitle(2, 4)',
                storageDate: '@datetime',
                'status|1': status ? [Number(status)] : [0, 1, 2]
              }
            ]
          }).list,
          count: 100
        },
        message: 'success'
      }
    }
  }
] as MockMethod[]
