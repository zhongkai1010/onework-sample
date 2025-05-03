import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/collection/ledger',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          count: 100,
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                'collectionStatus|1': [1, 2, 3, 4, 5, 6],
                rfidCode: '@string(10)',
                collectionName: '@ctitle',
                'categoryId|+1': 1,
                categoryName: '@ctitle',
                'warehouseId|+1': 1,
                warehouseName: '@ctitle',
                era: '@date',
                material: '@ctitle',
                'quantity|1-100': 1,
                unit: '@ctitle',
                specificDimensions: '@string',
                condition: '@ctitle',
                eraType: '@ctitle',
                imageInfo: '@image',
                numberCategory: '@string',
                collectionCode: '@string',
                artist: '@cname',
                regionType: '@ctitle',
                region: '@ctitle',
                materialType: '@ctitle',
                'overallLength|1-100': 1,
                'overallWidth|1-100': 1,
                'totalHeight|1-100': 1,
                weightRange: '@string',
                'specificWeight|1-100': 1,
                weightUnit: '@string',
                culturalLevel: '@ctitle',
                collectionSource: '@ctitle',
                preservationStatus: '@ctitle',
                collectionDate: '@date',
                collectionDateRange: '@date',
                collectionYear: '@date',
                type: '@ctitle',
                culturalType: '@ctitle',
                collectionIntroduction: '@cparagraph',
                textType: '@ctitle',
                audioVisualCarrierType: '@ctitle',
                audioVisualStorageLocation: '@ctitle',
                diskPath: '@string',
                colorCategory: '@ctitle',
                colorDescription: '@ctitle',
                notes: '@cparagraph',
                museumEntryTime: '@datetime',
                collectionTime: '@datetime',
                loginTime: '@datetime',
                cabinetEntryTime: '@datetime'
              }
            ]
          })
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/ledger/repair',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          count: 100,
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                documentImage: '@image',
                repairCode: '@string',
                registrationDate: '@datetime',
                collectionCode: '@string',
                'collectionId|+1': 1,
                collectionName: '@ctitle',
                collectionCategory: '@ctitle',
                sendRepairDepartment: '@ctitle',
                sentBy: '@cname',
                repairReason: '@cparagraph',
                remarks: '@cparagraph',
                sendRepairDate: '@datetime',
                'status|1': [0, 1],
                undertakingOrganization: '@ctitle',
                repairPerson: '@cname',
                qualificationCertificate: '@string',
                repairCompletionDate: '@datetime',
                repairStatusAndResults: '@cparagraph',
                beforeRepairImage: '@image',
                afterRepairImage: '@image'
              }
            ]
          })
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/ledger/outbound',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          count: 100,
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                code: '@string',
                outboundDate: '@datetime',
                collectionCode: '@string',
                collectionName: '@ctitle',
                storageDate: '@datetime',
                'status|1': [0, 1, 2, 3]
              }
            ]
          })
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/ledger/transfer',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          count: 100,
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                code: '@string',
                collectionCode: '@string',
                collectionName: '@ctitle',
                originalWarehouse: '@ctitle',
                'originalWarehouseId|+1': 1,
                currentWarehouse: '@ctitle',
                'currentWarehouseId|+1': 1,
                'status|1': [0, 1]
              }
            ]
          })
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/books/ledger',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          count: 100,
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                imageInfo: '@image',
                numberCategory: '@string',
                collectionName: '@ctitle',
                rfidCode: '@string',
                categoryId: '@string',
                categoryName: '@ctitle',
                isbn: '@string',
                author: '@cname',
                warehouseId: '@string',
                warehouseName: '@ctitle',
                collectionSource: '@ctitle',
                bookValue: '@string',
                preservationStatus: '@ctitle',
                collectionDate: '@date',
                collectionYear: '@date',
                notes: '@cparagraph',
                type: '@ctitle'
              }
            ]
          })
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/changeWarehouse',
    method: 'put',
    response: () => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/changeClassification',
    method: 'put',
    response: () => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/ledger/import',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  {
    url: '/api/collection/books/return',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  }
] as MockMethod[]
