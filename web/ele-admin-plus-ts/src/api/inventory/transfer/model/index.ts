import { PageParam } from '@/api';

// 调拨单基础信息接口
export interface TransferBase {
  /** 编号 */
  code: string;
  /** 藏品编号 */
  collectionId: string;
  /** 藏品名称 */
  collectionName: string;
  /** 库房 */
  warehouse: string;
  /** 年代 */
  era: string;
  /** 质地类型 */
  materialType: string;
  /** 质地 */
  material: string;
  /** 数量 */
  quantity: number;
  /** 单位 */
  unit: string;
  /** 具体尺寸 */
  specificDimensions: string;
  /** 完残程度 */
  completenessDegree: string;
}

// 调拨单查询参数接口
export interface TransferQueryParams extends PageParam {
  /** 单据状态 */
  documentStatus?: string;
  /** 请选择 */
  inputStorageType?: string;
  /** 调拨仓库 */
  transferWarehouse?: string;
}
