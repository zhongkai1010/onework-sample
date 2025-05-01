import { PageParam } from '@/api'

/**
 * 展览信息
 */
export interface Exhibition {
  /** ID编号 */
  id: string
  /** 展览标题 */
  exhibitionTitle: string
  /** 展览开始时间 */
  exhibitionStartDate: string
  /** 展览结束日期 */
  exhibitionEndDate: string
  /** 展览机构 */
  exhibitionInstitution: string
  /** 展览城市 */
  exhibitionCity: string
  /** 展览地址 */
  exhibitionAddress: string
  /** 艺术家名称 */
  artistName: string
  /** 封面 */
  coverImage: string
}

/**
 * 创建展览参数
 */
export interface CreateExhibitionParams {
  /** 展览标题 */
  exhibitionTitle: string
  /** 展览开始时间 */
  exhibitionStartDate?: string
  /** 展览结束日期 */
  exhibitionEndDate?: string
  /** 展览机构 */
  exhibitionInstitution?: string
  /** 展览城市 */
  exhibitionCity?: string
  /** 展览地址 */
  exhibitionAddress?: string
  /** 艺术家名称 */
  artistName?: string
  /** 封面 */
  coverImage?: string
}

/**
 * 更新展览参数
 */
export interface UpdateExhibitionParams {
  /** ID编号 */
  id: string
  /** 展览标题 */
  exhibitionTitle: string
  /** 展览开始时间 */
  exhibitionStartDate?: string
  /** 展览结束日期 */
  exhibitionEndDate?: string
  /** 展览机构 */
  exhibitionInstitution?: string
  /** 展览城市 */
  exhibitionCity?: string
  /** 展览地址 */
  exhibitionAddress?: string
  /** 艺术家名称 */
  artistName?: string
  /** 封面 */
  coverImage?: string
}

/**
 * 展览查询参数
 */
export interface ExhibitionQueryParams extends PageParam {
  /** 展览标题 */
  exhibitionTitle?: string
  /** 排序字段 */
  sort?: string
  /** 排序方式 */
  order?: string
}
