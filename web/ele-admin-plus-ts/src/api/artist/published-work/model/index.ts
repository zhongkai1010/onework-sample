import { PageParam } from '@/api'

/**
 * 出版著作信息
 */
export interface Publication {
  /** ID编号 */
  id: number
  /** 出版物题名 */
  bookTitle: string
  /** 艺术家名称 */
  artistName: string
  /** 出版社 */
  publisher: string
  /** 开本 */
  format: string
  /** 编著 */
  author: string
  /** 印次 */
  edition: string
  /** 出版物封面 */
  coverImage: string
  /** 定价 */
  price: number
}

/**
 * 创建出版著作参数
 */
export type CreatePublicationParams = Pick<Publication, 'bookTitle' | 'artistName' | 'publisher' | 'format' | 'author' | 'edition' | 'coverImage' | 'price'>

/**
 * 更新出版著作参数
 */
export type UpdatePublicationParams = Required<Pick<Publication, 'id'>> & Partial<CreatePublicationParams>

/**
 * 出版著作查询参数
 */
export interface PublicationQueryParams extends PageParam {
  /** 出版物题名 */
  bookTitle?: string
  /** 艺术家名称 */
  artistName?: string
}
