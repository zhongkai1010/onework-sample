import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

interface Image {
  /** ID编号 */
  id: number
  /** 藏品编号 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName: string
  /** 标题 */
  title?: string
  /** 容量大小 */
  fileSize?: string
  /** 文件 */
  file?: string
  /** 添加人 */
  addedBy?: string
  /** 添加时间 */
  addTime?: string
}

interface ImageQueryParams {
  page?: number
  limit?: number
  collectionCode?: string
  collectionName?: string
  title?: string
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
const images: Image[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  collectionCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  collectionName: mock('@ctitle(3, 10)'),
  title: mock('@ctitle(5, 10)'),
  fileSize: mock('@natural(100, 10000)') + 'KB',
  file: mock('@image("300x200", "@color")'),
  addedBy: mock('@cname'),
  addTime: mock('@datetime')
}))

export default [
  // 查询影像分页列表
  {
    url: '/api/collection/image',
    method: 'get',
    response: (options: any): ApiResult<PageResult<Image>> => {
      const { page = 1, limit = 10, collectionCode, collectionName, title } = options.query as ImageQueryParams

      let list = [...images]

      // 按条件筛选
      if (collectionCode) {
        list = list.filter((item) => item.collectionCode?.includes(collectionCode))
      }
      if (collectionName) {
        list = list.filter((item) => item.collectionName.includes(collectionName))
      }
      if (title) {
        list = list.filter((item) => item.title?.includes(title))
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

  // 添加影像
  {
    url: '/api/collection/image',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const image = options.body
      const id = images.length + 1
      images.unshift({
        ...image,
        id,
        addedBy: mock('@cname'),
        addTime: mock('@datetime')
      })
      return {
        code: 0,
        message: '添加成功',
        data: null
      }
    }
  },

  // 修改影像
  {
    url: '/api/collection/image',
    method: 'put',
    response: (options: any): ApiResult<null> => {
      const image = options.body
      const index = images.findIndex((item) => item.id === image.id)
      if (index !== -1) {
        images[index] = {
          ...images[index],
          ...image
        }
        return {
          code: 0,
          message: '修改成功',
          data: null
        }
      }
      return {
        code: 1,
        message: '影像不存在',
        data: null
      }
    }
  },

  // 删除影像
  {
    url: '/api/collection/image',
    method: 'delete',
    response: (options: any): ApiResult<null> => {
      const { ids = [] } = options.body || {}

      // 确保 ids 是数组
      if (!Array.isArray(ids)) {
        return {
          code: 1,
          message: '参数错误：ids 必须是数组',
          data: null
        }
      }

      // 过滤掉要删除的项，保留未删除的项
      const newImages = images.filter((item) => !ids.includes(item.id))

      // 更新原始数组
      images.length = 0
      images.push(...newImages)

      return {
        code: 0,
        message: '删除成功',
        data: null
      }
    }
  }
] as MockMethod[]
