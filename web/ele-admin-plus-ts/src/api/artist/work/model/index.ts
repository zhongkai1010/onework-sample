import { PageParam } from '@/api'

/**
 * 艺术家作品信息
 */
export interface ArtistWork {
  /** ID编号 */
  id: number
  /** 作品名称 */
  workTitle: string
  /** 创作年代 */
  creationYear: string
  /** 尺寸 */
  dimensions: string
  /** 材质 */
  material: string
  /** 题材 */
  theme: string
  /** 装裱 */
  framing: string
  /** 艺术家名称 */
  artistName: string
  /** 操作时间 */
  operationTime: string
  /** 作品图片 */
  workImage: string
}

/**
 * 创建艺术家作品参数
 */
export type CreateArtistWorkParams = {
  /** 作品名称 */
  workTitle: string
  /** 创作年代 */
  creationYear?: string
  /** 尺寸 */
  dimensions?: string
  /** 材质 */
  material?: string
  /** 题材 */
  theme?: string
  /** 装裱 */
  framing?: string
  /** 艺术家名称 */
  artistName?: string
  /** 作品图片 */
  workImage?: string
}

/**
 * 更新艺术家作品参数
 */
export type UpdateArtistWorkParams = {
  /** ID编号 */
  id: number
  /** 作品名称 */
  workTitle: string
  /** 创作年代 */
  creationYear?: string
  /** 尺寸 */
  dimensions?: string
  /** 材质 */
  material?: string
  /** 题材 */
  theme?: string
  /** 装裱 */
  framing?: string
  /** 艺术家名称 */
  artistName?: string
  /** 作品图片 */
  workImage?: string
}

/**
 * 艺术家作品查询参数
 */
export interface ArtistWorkQueryParams extends PageParam {
  /** 作品名称 */
  workTitle?: string
  /** 艺术家名称 */
  artistName?: string
}
