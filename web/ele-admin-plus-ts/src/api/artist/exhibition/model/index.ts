import { PageParam } from '@/api';

/**
 * 展览信息
 */
export interface Exhibition {
  /** ID编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 展览标题 */
  exhibitionTitle: string;
  /** 展览开始时间 */
  exhibitionStartDate: string;
  /** 展览结束日期 */
  exhibitionEndDate: string;
  /** 展览机构 */
  exhibitionInstitution: string;
  /** 展览城市 */
  exhibitionCity: string;
  /** 展览地址 */
  exhibitionAddress: string;
  /** 艺术家名称 */
  artistName: string;
  /** 封面 */
  coverImage: string;
}

/**
 * 添加展览参数
 */
export type AddExhibitionParams = Omit<Exhibition, 'id'>;

/**
 * 展览查询参数
 */
export interface ExhibitionQueryParams extends PageParam {
  /** 展览标题 */
  exhibitionTitle?: string;
  /** 艺术家名称 */
  artistName?: string;
  /** ID */
  id?: string;
}
