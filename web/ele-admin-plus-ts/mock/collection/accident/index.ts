import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

interface Accident {
  /** ID编号 */
  id: number
  /** 编号 */
  code: string
  /** 单据图片 */
  documentImage: string
  /** 藏品编码 */
  collectionCode: string
  /** 藏品ID */
  collectionId: string
  /** 藏品名称 */
  collectionName: string
  /** 事故时间 */
  incidentTime: string
  /** 事故地点 */
  incidentLocation: string
  /** 事故原因 */
  incidentCause: string
  /** 事故责任人 */
  responsiblePerson: string
  /** 藏品损坏情况 */
  damageStatus: string
  /** 处理状态 */
  status: string
  /** 处理结果 */
  processingResult: string
}

interface AccidentQueryParams {
  page?: number
  limit?: number
  collectionId?: string
  accidentLocation?: string
  accidentCause?: string
  responsiblePerson?: string
  collectionDamageStatus?: string
  status?: string
  processingResult?: string
}

interface ApiResult<T> {
  code: number
  message: string
  data: T | null
}

interface PageResult<T> {
  list: T[]
  count: number
  page: number
  limit: number
}

// 生成模拟数据
const accidents: Accident[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  code: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  documentImage: mock('@image("300x200", "@color")'),
  collectionCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  collectionId: mock('@id'),
  collectionName: mock('@ctitle(3, 10)'),
  incidentTime: mock('@datetime'),
  incidentLocation: mock('@county(true)'),
  incidentCause: mock('@cparagraph(1)'),
  responsiblePerson: mock('@cname'),
  damageStatus: mock('@pick(["轻微损坏", "中度损坏", "严重损坏", "完全损坏"])'),
  status: mock('@pick(["待处理", "处理中", "已处理"])'),
  processingResult: mock('@cparagraph(1)')
}))

export default [
  // 查询事故登记分页列表
  {
    url: '/api/collection/accident',
    method: 'get',
    response: (options: any): ApiResult<PageResult<Accident>> => {
      const { page = 1, limit = 10, collectionId, accidentLocation, accidentCause, responsiblePerson, collectionDamageStatus, status, processingResult } = options.query as AccidentQueryParams

      let list = [...accidents]

      // 按条件筛选
      if (collectionId) {
        list = list.filter((item) => item.collectionId === collectionId)
      }
      if (accidentLocation) {
        list = list.filter((item) => item.incidentLocation.includes(accidentLocation))
      }
      if (accidentCause) {
        list = list.filter((item) => item.incidentCause.includes(accidentCause))
      }
      if (responsiblePerson) {
        list = list.filter((item) => item.responsiblePerson.includes(responsiblePerson))
      }
      if (collectionDamageStatus) {
        list = list.filter((item) => item.damageStatus === collectionDamageStatus)
      }
      if (status) {
        list = list.filter((item) => item.status === status)
      }
      if (processingResult) {
        list = list.filter((item) => item.processingResult.includes(processingResult))
      }

      // 分页处理
      const start = (page - 1) * limit
      const end = start + limit
      const pageList = list.slice(start, end)

      return {
        code: 0,
        message: 'success',
        data: {
          list: pageList,
          count: list.length,
          page,
          limit
        }
      }
    }
  },

  // 添加事故记录
  {
    url: '/api/collection/accident',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const accident = options.body
      const id = accidents[0].id + 1
      accidents.unshift({
        ...accident,
        id,
        code: mock('@string("upper", 2)') + mock('@string("number", 6)'),
        documentImage: accident.documentImage || mock('@image("300x200", "@color")'),
        collectionCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
        collectionName: mock('@ctitle(3, 10)')
      })
      return {
        code: 0,
        message: '添加成功',
        data: null
      }
    }
  },

  // 查看事故记录详情
  {
    url: '/api/collection/accident/details',
    method: 'get',
    response: (options: any): ApiResult<Accident> => {
      const { id } = options.query
      const accident = accidents.find((item) => item.id === Number(id))
      if (accident) {
        return {
          code: 0,
          message: 'success',
          data: accident
        }
      }
      return {
        code: 1,
        message: '事故记录不存在',
        data: null
      }
    }
  },

  // 删除事故记录
  {
    url: '/api/collection/accident',
    method: 'delete',
    response: (options: any): ApiResult<null> => {
      const { ids } = options.body
      const idList = ids.map(Number)
      const indexes = accidents
        .map((item, index) => (idList.includes(item.id) ? index : -1))
        .filter((index) => index !== -1)
        .sort((a, b) => b - a)

      indexes.forEach((index) => {
        accidents.splice(index, 1)
      })

      return {
        code: 0,
        message: '删除成功',
        data: null
      }
    }
  }
] as MockMethod[]
