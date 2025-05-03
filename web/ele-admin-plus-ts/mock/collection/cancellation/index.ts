import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/collection/cancellation',
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
        message: '添加注销记录成功',
        data: null
      }
    }
  },
  {
    url: '/api/collection/cancellation',
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
            cancellationDate: mock('@datetime'),
            operator: mock('@cname'),
            cancellationReason: mock('@ctitle(2, 4)'),
            remarks: mock('@cparagraph(1)')
          }))
        }
      }
    }
  },
  {
    url: '/api/collection/cancellation/approve',
    method: 'post',
    response: ({ body }) => {
      if (!body.ids || body.ids.length === 0) {
        return {
          code: 1,
          message: '注销单ID集合不能为空',
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
    url: '/api/collection/cancellation/recover',
    method: 'post',
    response: ({ body }) => {
      if (!body.ids || body.ids.length === 0) {
        return {
          code: 1,
          message: '注销单ID集合不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '恢复成功',
        data: null
      }
    }
  },
  {
    url: '/api/collection/cancellation/details',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      if (!id) {
        return {
          code: 1,
          message: '注销单ID不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: 'success',
        data: {
          id: Number(id),
          documentImage: mock('@image("200x100", "#50B347", "#FFF", "注销单")'),
          status: mock('@integer(0, 2)'),
          code: mock('@string("upper", 10)'),
          cancellationDate: mock('@datetime'),
          operator: mock('@cname'),
          cancellationReason: mock('@ctitle(2, 4)'),
          remarks: mock('@cparagraph(1, 3)'),
          collections: Array.from({ length: mock('@integer(1, 5)') }, () => ({
            id: mock('@integer(1, 1000)'),
            collectionStatus: mock('@integer(1, 6)'),
            imageInfo: mock('@image("200x200", "#50B347", "#FFF", "藏品")'),
            numberCategory: mock('@string'),
            collectionCode: mock('@string("upper", 8)'),
            collectionName: mock('@ctitle(2, 4)'),
            categoryName: mock('@ctitle(2, 4)'),
            categoryId: mock('@integer(1, 100)'),
            rfidCode: mock('@string'),
            quantity: mock('@integer(1, 100)'),
            unit: mock('@string'),
            eraType: mock('@ctitle(2, 4)'),
            era: mock('@date'),
            artist: mock('@cname'),
            regionType: mock('@ctitle(2, 4)'),
            region: mock('@ctitle(2, 4)')
          }))
        }
      }
    }
  },
  {
    url: '/api/collection/cancellation/catalog',
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
