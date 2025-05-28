import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/api/inventory-check/check/getCollection',
    timeout: 200,
    method: 'get',
    response: ({ query }) => {
      const { limit = 10, planId, status, collectionName, code, warehouseId } = query
      return {
        code: 0,
        message: 'success',
        data: {
          count: mock('@integer(10, 100)'),
          list: Array.from({ length: Number(limit) }, () => ({
            id: mock('@integer(1, 1000)'),
            planId: planId || mock('@integer(1, 100)'),
            collectionId: mock('@integer(1, 1000)'),
            satus: status ? Number(status) : mock('@integer(0, 3)'),
            rfidCode: mock('@string("upper", 8)'),
            collectionName:
              collectionName || mock('@pick(["青花瓷", "青铜器", "玉器", "书画", "陶瓷"])'),
            categoryId: mock('@integer(1, 5)'),
            categoryName: mock('@pick(["陶瓷器", "青铜器", "书画", "玉器", "铜器"])'),
            warehouseId: warehouseId || mock('@integer(1, 3)'),
            warehouseName: mock('@pick(["一号库房", "二号库房", "三号库房"])'),
            era: mock('@pick(["唐代", "宋代", "明代", "清代"])'),
            material: mock('@pick(["瓷器", "青铜", "玉石", "纸本"])'),
            quantity: mock('@integer(1, 5)'),
            unit: mock('@pick(["件", "套", "对"])'),
            specificDimensions: mock('@pick(["高30cm", "长50cm", "宽20cm"])'),
            condition: mock('@pick(["完好", "轻微破损", "严重破损"])'),
            eraType: mock('@pick(["古代", "近代", "现代"])'),
            imageInfo: mock('@image("200x200", "#50B347", "#FFF", "Mock")'),
            numberCategory: mock('@pick(["文物", "艺术品", "收藏品"])'),
            collectionCode: code || mock('@string("upper", 8)'),
            artist: mock('@cname'),
            regionType: mock('@pick(["中国", "外国"])'),
            region: mock('@city'),
            materialType: mock('@pick(["陶瓷", "金属", "玉石", "纸本"])'),
            overallLength: mock('@float(10, 100, 1, 1)'),
            overallWidth: mock('@float(10, 100, 1, 1)'),
            totalHeight: mock('@float(10, 100, 1, 1)'),
            weightRange: mock('@pick(["1-2kg", "2-3kg", "3-4kg"])'),
            specificWeight: mock('@float(1, 5, 1, 1)'),
            weightUnit: mock('@pick(["kg", "g"])'),
            culturalLevel: mock('@pick(["一级", "二级", "三级"])'),
            collectionSource: mock('@pick(["征集", "捐赠", "考古发掘"])'),
            preservationStatus: mock('@pick(["完好", "轻微破损", "严重破损"])'),
            collectionDate: mock('@date("yyyy-MM-dd")'),
            collectionDateRange: mock('@date("yyyy")'),
            collectionYear: mock('@date("yyyy")'),
            type: mock('@pick(["文物", "艺术品", "收藏品"])'),
            culturalType: mock('@pick(["古代文物", "近代文物", "现代文物"])'),
            collectionIntroduction: mock('@cparagraph(1, 3)'),
            textType: mock('@pick(["中文", "英文", "日文"])'),
            audioVisualCarrierType: mock('@pick(["图片", "视频", "音频"])'),
            audioVisualStorageLocation: mock('@pick(["服务器", "本地存储", "云存储"])'),
            diskPath: mock('@url'),
            colorCategory: mock('@pick(["彩色", "黑白", "单色"])'),
            colorDescription: mock('@pick(["青花", "五彩", "粉彩"])'),
            notes: mock('@cparagraph(1, 2)'),
            museumEntryTime: mock('@datetime'),
            collectionTime: mock('@datetime'),
            loginTime: mock('@datetime'),
            cabinetEntryTime: mock('@datetime')
          }))
        }
      }
    }
  },
  {
    url: '/mock/api/inventory-check/check/ok',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { ids, status } = body
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return {
          code: 1,
          message: '藏品ID列表不能为空',
          data: null
        }
      }
      if (status === undefined) {
        return {
          code: 1,
          message: '状态不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '确认成功',
        data: null
      }
    }
  },
  {
    url: '/mock/api/inventory-check/check/add',
    timeout: 200,
    method: 'put',
    response: ({ body }) => {
      if (!body.planId) {
        return {
          code: 1,
          message: '盘点计划ID不能为空',
          data: null
        }
      }
      if (!body.collectionName) {
        return {
          code: 1,
          message: '藏品名称不能为空',
          data: null
        }
      }
      return {
        code: 0,
        message: '登记成功',
        data: null
      }
    }
  }
] as MockMethod[]
