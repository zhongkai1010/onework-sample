import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

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
            id: mock('@integer(1, 1000)'),
            collectionName: mock('@cname'),
            collectionCode: mock('@string("upper", 8)')
          }
        ]
      }
    }
  },
  {
    url: '/api/inventory/inbound/register',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '入库登记成功',
        data: {}
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
    response: () => {
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
    response: () => {
      return {
        code: 0,
        message: '审核成功',
        data: {}
      }
    }
  },
  {
    url: '/api/inventory/inbound/confirm',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '确认入库成功',
        data: {}
      }
    }
  },
  {
    url: '/api/inventory/inbound/details',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
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
  {
    url: '/api/inventory/inbound/collection',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: 10 }, () => ({
            id: mock('@integer(1, 1000)'),
            code: mock('@string("upper", 10)'),
            collectionCode: mock('@string("upper", 8)'),
            collectionName: mock('@ctitle(2, 4)'),
            warehouseId: mock('@integer(1, 100)'),
            warehouseName: mock('@ctitle(2, 4)'),
            storageDate: mock('@date("yyyy-MM-dd")'),
            status: mock('@integer(0, 2)')
          }))
        }
      }
    }
  }
] as MockMethod[]
