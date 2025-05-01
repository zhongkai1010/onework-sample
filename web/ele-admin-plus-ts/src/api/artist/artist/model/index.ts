import { PageParam } from '@/api'

/**
 * 艺术家信息
 */
export interface Artist {
  id: number // 艺术家ID
  name: string // 艺术家姓名
  gender: string // 性别
  ethnicity: string // 民族
  hometown: string // 籍贯
  artStyle: string // 艺术风格
  mentor: string // 师承
  graduation: string // 何时何校毕业
  education: string // 学历
  currentInstitution: string // 任职单位或机构
  portrait: string // 肖像
}

/**
 * 创建艺术家参数
 */
export type CreateArtistParams = Pick<Artist, 'name' | 'gender' | 'ethnicity' | 'hometown' | 'artStyle' | 'mentor' | 'graduation' | 'education' | 'currentInstitution' | 'portrait'>

/**
 * 更新艺术家参数
 */
export type UpdateArtistParams = Required<Pick<Artist, 'id'>> & Partial<CreateArtistParams>

/**
 * 查询艺术家分页列表参数
 */
export interface GetArtistListParams extends PageParam {
  name?: string // 姓名
}
