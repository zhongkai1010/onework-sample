import { PageParam } from '@/api';

// 修复记录基础信息接口
export interface RepairBase {
  /** ID 编号 */
  id: string;
  /** 单据图片 */
  documentImage: string;
  /** 修复单号 */
  repairCode: string;
  /** 登记日期 */
  registrationDate: string;
  /** 藏品编码 */
  collectionId: string;
  /** 藏品名称 */
  collectionName: string;
  /** 藏品分类 */
  collectionCategory: string;
  /** 送修部门 */
  sendRepairDepartment: string;
  /** 送修人 */
  sentBy: string;
  /** 修复原因 */
  repairReason: string;
  /** 备注 */
  remarks: string;
  /** 送修日期 */
  sendRepairDate: string;
  /** 工单状态 */
  workOrderStatus: string;
  /** 承担机构 */
  undertakingOrganization: string;
  /** 修复人 */
  repairPerson: string;
  /** 资质证书 */
  qualificationCertificate: string;
  /** 修完日期 */
  repairCompletionDate: string;
  /** 修复情况及结果 */
  repairStatusAndResults: string;
  /** 修复前图片 */
  beforeRepairImage: string;
  /** 修复后图片 */
  afterRepairImage: string;
}

// 修复记录查询参数接口
export interface RepairQueryParams extends PageParam {
  /** 藏品选择 */
  collectionSelection?: string;
  /** 藏品编码 */
  collectionCode?: string;
  /** 藏品名称 */
  collectionName?: string;
  /** 工单状态 */
  workOrderStatus?: string;
}
