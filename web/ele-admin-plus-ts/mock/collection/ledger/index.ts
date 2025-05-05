import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  /**
   * 获取藏品台账列表
   * 返回藏品的基本信息列表，包含分页数据
   */
  {
    url: '/api/collection/ledger',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                'collectionStatus|1': ['在库', '出库', '修复中', '调拨中', '已注销', '其他'],
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
          }).list,
          count: 100
        },
        message: 'success'
      }
    }
  },
  /**
   * 获取藏品修复记录列表
   * 返回藏品的修复历史记录，包含修复状态、修复人等信息
   */
  {
    url: '/api/collection/ledger/repair',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
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
                'status|1': ['待修复', '修复中', '已完成'],
                undertakingOrganization: '@ctitle',
                repairPerson: '@cname',
                qualificationCertificate: '@string',
                repairCompletionDate: '@datetime',
                repairStatusAndResults: '@cparagraph',
                beforeRepairImage: '@image',
                afterRepairImage: '@image'
              }
            ]
          }).list,
          count: 100
        },
        message: 'success'
      }
    }
  },
  /**
   * 获取藏品出库记录列表
   * 返回藏品的出库历史记录，包含出库状态、出库日期等信息
   */
  {
    url: '/api/collection/ledger/outbound',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                code: '@string',
                outboundDate: '@datetime',
                collectionCode: '@string',
                collectionName: '@ctitle',
                storageDate: '@datetime',
                'status|1': ['待出库', '出库中', '已出库', '已退回']
              }
            ]
          }).list,
          count: 100
        },
        message: 'success'
      }
    }
  },
  /**
   * 获取藏品调拨记录列表
   * 返回藏品的调拨历史记录，包含原仓库、目标仓库等信息
   */
  {
    url: '/api/collection/ledger/transfer',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
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
                'status|1': ['待调拨', '调拨中', '已完成']
              }
            ]
          }).list,
          count: 100
        },
        message: 'success'
      }
    }
  },
  /**
   * 变更藏品仓库位置
   * 用于更新藏品的存放位置
   */
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
  /**
   * 变更藏品分类
   * 用于更新藏品的分类信息
   */
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
  /**
   * 导入藏品台账
   * 用于批量导入藏品信息
   */
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
  /**
   * 退回藏品编目
   * 用于将藏品退回编目状态
   */
  {
    url: '/api/collection/ledger/return',
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: null,
        message: 'success'
      }
    }
  },
  /**
   * 获取图书总账分页列表
   * 返回图书的基本信息列表，包含分页数据
   */
  {
    url: '/api/collection/books/ledger',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          list: mock({
            'list|10': [
              {
                'id|+1': 1,
                imageInfo: '@image',
                numberCategory: '@string',
                collectionName: '@ctitle',
                rfidCode: '@string(10)',
                categoryId: '@string',
                categoryName: '@ctitle',
                isbn: '@string(13)',
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
          }).list,
          count: 100
        },
        message: 'success'
      }
    }
  }
] as MockMethod[]
