import { PageParam } from '@/api'

/**
 * 藏品修复记录信息
 */
export interface Repair {
  /** ID编号 */
  id: number
  /** 单据图片 */
  documentImage?: string
  /** 修复单号 */
  repairCode?: string
  /** 登记日期 */
  registrationDate: string
  /** 藏品编码 */
  collectionCode?: string
  /** 藏品ID */
  collectionId: number
  /** 藏品名称 */
  collectionName?: string
  /** 藏品分类 */
  collectionCategory?: string
  /** 送修部门 */
  sendRepairDepartment?: string
  /** 送修人 */
  sentBy?: string
  /** 修复原因 */
  repairReason?: string
  /** 备注 */
  remarks?: string
  /** 送修日期 */
  sendRepairDate?: string
  /** 工单状态，0：修改中、1：已修复 */
  status?: number
  /** 承担机构 */
  undertakingOrganization?: string
  /** 修复人 */
  repairPerson?: string
  /** 资质证书 */
  qualificationCertificate?: string
  /** 修完日期 */
  repairCompletionDate?: string
  /** 修复情况及结果 */
  repairStatusAndResults?: string
  /** 修复前图片 */
  beforeRepairImage?: string
  /** 修复后图片 */
  afterRepairImage?: string
}

/**
 * 添加修复记录参数
 */
export interface AddRepairParams {
  /** 登记日期 */
  registrationDate: string
  /** 藏品ID */
  collectionId: number | undefined
  /** 送修部门 */
  sendRepairDepartment?: string
  /** 送修人 */
  sentBy?: string
  /** 修复原因 */
  repairReason?: string
  /** 备注 */
  remarks?: string
  /** 送修日期 */
  sendRepairDate?: string
}

/**
 * 修复记录查询参数
 */
export interface RepairQueryParams extends PageParam {
  /** 藏品选择 */
  collectionSelection?: string
  /** 藏品编码 */
  collectionCode?: string
  /** 藏品名称 */
  collectionName?: string
  /** 工单状态 */
  status?: number
}
