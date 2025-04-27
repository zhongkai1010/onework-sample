import { PageParam } from '@/api';
import { CollectionBase } from '../../collection/model';

/** 图书藏品信息 */
export interface BookCollection extends CollectionBase {
  /** 作者 */
  author?: string;
  /** 仓库 */
  warehouse?: string;
  /** 图书价值 */
  bookValue?: string;
  /** 地址编码 */
  addressCode?: string;
}

/** 图书查询参数 */
export interface BookQueryParams extends PageParam {
  /** ISBN编号 */
  ISBN?: string;
  /** 请输入ISBN编号 */
  inputISBN?: string;
  /** 作者 */
  author?: string;
  /** 请输入作者 */
  inputAuthor?: string;
  /** 图书价值 */
  bookValue?: string;
  /** 请输入图书价值 */
  inputBookValue?: string;
  /** 类型 */
  type?: string;
}
