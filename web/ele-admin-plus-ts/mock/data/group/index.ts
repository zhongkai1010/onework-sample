import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/data/group',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: 10 }, () => ({
            id: mock('@integer(1, 100)'),
            groupName: mock('@ctitle(3, 6)'),
            personInCharge: mock('@cname'),
            remarks: mock('@cparagraph(1)'),
            sortOrder: mock('@integer(1, 100)'),
            status: mock('@integer(0, 1)')
          }))
        }
      }
    }
  },
  {
    url: '/api/data/group/all',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: Array.from({ length: 10 }, () => ({
          id: mock('@integer(1, 100)'),
          groupName: mock('@ctitle(3, 6)'),
          personInCharge: mock('@cname'),
          remarks: mock('@cparagraph(1)'),
          sortOrder: mock('@integer(1, 100)'),
          status: mock('@integer(0, 1)')
        }))
      }
    }
  },
  {
    url: '/api/data/group/details',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          id: mock('@integer(1, 100)'),
          groupName: mock('@ctitle(3, 6)'),
          personInCharge: mock('@cname'),
          remarks: mock('@cparagraph(1)'),
          sortOrder: mock('@integer(1, 100)'),
          status: mock('@integer(0, 1)')
        }
      }
    }
  },
  {
    url: '/api/data/group',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增藏品组成功',
        data: null
      }
    }
  },
  {
    url: '/api/data/group',
    method: 'put',
    response: () => {
      return {
        code: 0,
        message: '修改藏品组成功',
        data: null
      }
    }
  },
  {
    url: '/api/data/group',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除藏品组成功',
        data: null
      }
    }
  },
  {
    url: '/api/data/group/collection',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: 10 }, () => ({
            id: mock('@integer(1, 100)'),
            collectionStatus: mock('@string("upper", 1)'),
            numberCategory: mock('@string("upper", 2)'),
            code: mock('@string("upper", 8)'),
            collectionName: mock('@ctitle(3, 6)'),
            rfidCode: mock('@string("upper", 8)'),
            categoryId: mock('@integer(1, 100)'),
            categoryName: mock('@ctitle(3, 6)'),
            groupId: mock('@integer(1, 100)'),
            groupName: mock('@ctitle(3, 6)'),
            quantity: mock('@integer(1, 100)'),
            unit: mock('@string("upper", 2)'),
            era: mock('@string("upper", 4)'),
            artist: mock('@cname'),
            regionType: mock('@string("upper", 2)'),
            region: mock('@province'),
            material: mock('@string("upper", 2)'),
            materialType: mock('@string("upper", 2)'),
            overallLength: mock('@string("number", 2)'),
            overallWidth: mock('@string("number", 2)'),
            totalHeight: mock('@string("number", 2)'),
            specificDimensions: mock('@string("number", 2)'),
            qualityRange: mock('@string("number", 2)'),
            specificQuality: mock('@string("number", 2)'),
            qualityUnit: mock('@string("upper", 2)'),
            culturalRelicLevel: mock('@string("upper", 1)'),
            collectionSource: mock('@string("upper", 2)'),
            preservationStatus: mock('@string("upper", 1)'),
            collectionDateRange: mock('@date'),
            collectionYear: mock('@string("number", 4)'),
            completenessDegree: mock('@string("upper", 1)'),
            completenessStatus: mock('@string("upper", 1)')
          }))
        }
      }
    }
  },
  {
    url: '/api/data/group/approve',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '审核成功',
        data: null
      }
    }
  }
] as MockMethod[]
