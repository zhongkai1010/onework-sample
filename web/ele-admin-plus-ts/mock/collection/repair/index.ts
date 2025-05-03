import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

interface Repair {
  /** ID编号 */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 修复单号 */
  repairCode?: string
  /** 登记日期 */
  registrationDate: string
  /** 藏品编码 */
  collectionCode?: string
  /** 藏品ID */
  collectionId: number
  /** 藏品名称 */
  collectionName?: string
  /** 藏品分类 */
  collectionCategory?: string
  /** 送修部门 */
  sendRepairDepartment?: string
  /** 送修人 */
  sentBy?: string
  /** 修复原因 */
  repairReason?: string
  /** 备注 */
  remarks?: string
  /** 送修日期 */
  sendRepairDate?: string
  /** 工单状态，0：待修复、1：修复中、2：已完成 */
  status?: number
  /** 承担机构 */
  undertakingOrganization?: string
  /** 修复人 */
  repairPerson?: string
  /** 资质证书 */
  qualificationCertificate?: string
  /** 修完日期 */
  repairCompletionDate?: string
  /** 修复情况及结果 */
  repairStatusAndResults?: string
  /** 修复前图片 */
  beforeRepairImage?: string
  /** 修复后图片 */
  afterRepairImage?: string
}

interface RepairQueryParams {
  page?: number
  limit?: number
  collectionSelection?: string
  collectionCode?: string
  collectionName?: string
  status?: number
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
const repairs: Repair[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  documentImage: mock('@image("300x200", "@color")'),
  repairCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  registrationDate: mock('@datetime'),
  collectionCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  collectionId: mock('@natural(1, 1000)'),
  collectionName: mock('@ctitle(3, 10)'),
  collectionCategory: mock('@pick(["书画", "陶瓷", "玉器", "青铜器", "其他"])'),
  sendRepairDepartment: mock('@cword(2, 4)') + '部门',
  sentBy: mock('@cname'),
  repairReason: mock('@cparagraph(1)'),
  remarks: mock('@cparagraph(1)'),
  sendRepairDate: mock('@datetime'),
  status: mock('@pick([0, 1, 2])'),
  undertakingOrganization: mock('@cword(2, 4)') + '机构',
  repairPerson: mock('@cname'),
  qualificationCertificate: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  repairCompletionDate: mock('@datetime'),
  repairStatusAndResults: mock('@cparagraph(1)'),
  beforeRepairImage: mock('@image("300x200", "@color")'),
  afterRepairImage: mock('@image("300x200", "@color")')
}))

export default [
  // 查询修复记录分页列表
  {
    url: '/api/collection/repair',
    method: 'get',
    response: (options: any): ApiResult<PageResult<Repair>> => {
      const { page = 1, limit = 10, collectionCode, collectionName, status } = options.query as RepairQueryParams

      let list = [...repairs]

      // 按条件筛选
      if (collectionCode) {
        list = list.filter((item) => item.collectionCode?.includes(collectionCode))
      }
      if (collectionName) {
        list = list.filter((item) => item.collectionName?.includes(collectionName))
      }
      if (status !== undefined) {
        list = list.filter((item) => item.status === status)
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

  // 添加修复记录
  {
    url: '/api/collection/repair',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const repair = options.body
      const id = repairs.length + 1
      repairs.unshift({
        ...repair,
        id,
        repairCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
        status: 0
      })
      return {
        code: 0,
        message: '添加成功',
        data: null
      }
    }
  },

  // 查询修复记录详情
  {
    url: '/api/collection/repair/details',
    method: 'get',
    response: (options: any): ApiResult<Repair> => {
      const { id } = options.query
      const repair = repairs.find((item) => item.id === id)
      if (repair) {
        return {
          code: 0,
          message: 'success',
          data: repair
        }
      }
      return {
        code: 1,
        message: '修复记录不存在',
        data: null
      }
    }
  },

  // 修复入藏
  {
    url: '/api/collection/repair/inbound',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const repair = options.body
      const index = repairs.findIndex((item) => item.id === repair.id)
      if (index !== -1) {
        repairs[index] = {
          ...repairs[index],
          ...repair,
          status: 1
        }
        return {
          code: 0,
          message: '修复入藏成功',
          data: null
        }
      }
      return {
        code: 1,
        message: '修复记录不存在',
        data: null
      }
    }
  }
] as MockMethod[]
