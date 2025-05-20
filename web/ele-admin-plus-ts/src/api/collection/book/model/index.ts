import { PageParam } from '@/api'

/**
 * 图书藏品信息
 */
export interface BookCollection {
  /** ID */
  id: number
  /** 图片信息 */
  imageInfo?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品名称 */
  collectionName?: string
  /** 藏品编号 */
  collectionCode?: string
  /** RFID编号 */
  rfidCode?: string
  /** ISBN */
  isbn: string
  /** 作者 */
  author?: string
  /** 仓库ID */
  warehouseId?: string
  /** 仓库名称 */
  warehouseName: string
  /** 藏品来源 */
  collectionSource?: string
  /** 图书价值 */
  bookValue?: string
  /** 保存状态 */
  preservationStatus?: string
  /** 征集日期 */
  collectionDate?: string
  /** 入藏年度 */
  collectionYear?: string
  /** 备注 */
  notes?: string
  /** 藏品状态 */
  status?: number
}

/**
 * 添加图书参数
 */
export interface AddBookParams {
  /** ID */
  id?: number
  /** 图片信息 */
  imageInfo?: string
  /** 编号类别 */
  numberCategory?: string
  /** 藏品名称 */
  collectionName?: string
  /** 藏品编号 */
  collectionCode?: string
  /** RFID编号 */
  rfidCode?: string
  /** ISBN */
  isbn?: string
  /** 作者 */
  author?: string
  /** 仓库ID */
  warehouseId?: string
  /** 仓库名称 */
  warehouseName?: string
  /** 藏品来源 */
  collectionSource?: string
  /** 图书价值 */
  bookValue?: string
  /** 保存状态 */
  preservationStatus?: string
  /** 征集日期 */
  collectionDate?: string
  /** 入藏年度 */
  collectionYear?: string
  /** 备注 */
  notes?: string
  /** 藏品状态 */
  status?: number //0:未审核、1、在藏、2、修复中、3、出库中、4、已注销
}

/**
 * 图书查询参数
 */
export interface BookQueryParams extends PageParam {
  /** ISBN编号 */
  ISBN?: string
  /** 作者 */
  author?: string
  /** 图书价值 */
  bookValue?: string
  /** 仓库ID */
  warehouseId?: string
  /** 处理状态 */
  status?: string
  /** 类型 */
  type?: string
}
