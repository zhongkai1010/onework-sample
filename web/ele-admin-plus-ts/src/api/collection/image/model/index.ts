import { PageParam } from '@/api'

/**
 * 影像信息
 */
export interface Image {
  /** ID编号 */
  id: number
  /** 编号 */
  code: string
  /** 藏品编号 */
  collectionId: string
  /** 藏品名称 */
  collectionName: string
  /** 标题 */
  title: string
  /** 容量大小 */
  fileSize: string
  /** 文件 */
  file: string
  /** 添加人 */
  addedBy: string
  /** 添加时间 */
  addTime: string
}

/**
 * 添加影像参数
 */
export type AddImageParams = Omit<Image, 'id' | 'addedBy' | 'addTime'>

/**
 * 修改影像参数
 */
export type UpdateImageParams = Omit<Image, 'addedBy' | 'addTime'>

/**
 * 影像查询参数
 */
export interface ImageQueryParams extends PageParam {
  /** 编号 */
  code?: string
  /** 藏品编号 */
  collectionId?: string
  /** 标题 */
  title?: string
}
