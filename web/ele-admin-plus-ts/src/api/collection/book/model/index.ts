import { PageParam } from '@/api';
import { Collection } from '../../catalog/model';

/**
 * 图书藏品信息
 */
export interface BookCollection extends Collection {
  /** ID编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 单据图片 */
  documentImage: string;
  /** 藏品编码 */
  collectionCode: string;
  /** 藏品ID */
  collectionId: string;
  /** 藏品名称 */
  collectionName: string;
  /** 作者 */
  author: string;
  /** 仓库 */
  warehouse: string;
  /** 图书价值 */
  bookValue: string;
  /** 地址编码 */
  addressCode: string;
  /** 处理状态 */
  status: string;
}

/**
 * 添加图书参数
 */
export interface AddBookParams {
  /** 编号 */
  code?: string;
  /** 单据图片 */
  documentImage?: string;
  /** 藏品ID */
  collectionId?: string;
  /** 作者 */
  author?: string;
  /** 仓库 */
  warehouse?: string;
  /** 图书价值 */
  bookValue?: string;
  /** 地址编码 */
  addressCode?: string;
  /** 处理状态 */
  status: string;
}

/**
 * 图书查询参数
 */
export interface BookQueryParams extends PageParam {
  /** ISBN编号 */
  ISBN?: string;
  /** 作者 */
  author?: string;
  /** 图书价值 */
  bookValue?: string;
  /** 仓库 */
  warehouse?: string;
  /** 处理状态 */
  status?: string;
  /** 类型 */
  type?: string;
}
