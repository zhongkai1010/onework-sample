import { PageParam } from '@/api';

// 艺术家基本信息
export interface Artist {
  id: number; // 艺术家ID
  name: string; // 艺术家姓名
  gender: number; // 性别：1-男，2-女
  birthDate: string; // 出生日期
  deathDate?: string; // 逝世日期
  nationality: string; // 国籍
  style: string; // 艺术风格
  introduction: string; // 简介
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 艺术家查询参数
export interface ArtistQueryParams extends PageParam {
  name?: string; // 艺术家姓名
  gender?: number; // 性别
  nationality?: string; // 国籍
  style?: string; // 艺术风格
}

// 艺术家作品信息
export interface ArtistWork {
  id: number; // 作品ID
  artistId: number; // 艺术家ID
  title: string; // 作品标题
  year: string; // 创作年份
  medium: string; // 创作媒介
  size: string; // 作品尺寸
  description: string; // 作品描述
  imageUrl: string; // 作品图片URL
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

// 作品查询参数
export interface WorkQueryParams extends PageParam {
  artistId?: number; // 艺术家ID
  title?: string; // 作品标题
  year?: string; // 创作年份
  medium?: string; // 创作媒介
}
