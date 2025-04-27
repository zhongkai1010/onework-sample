import { PageParam } from '@/api';

/**
 * 事故记录信息
 */
export interface Accident {
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
  /** 事故时间 */
  incidentTime: string;
  /** 事故地点 */
  incidentLocation: string;
  /** 事故原因 */
  incidentCause: string;
  /** 事故责任人 */
  responsiblePerson: string;
  /** 藏品损坏情况 */
  damageStatus: string;
  /** 处理状态 */
  status: string;
  /** 处理结果 */
  processingResult: string;
}

/**
 * 添加事故记录参数
 */
export interface AddAccidentParams {
  /** 编号 */
  code?: string;
  /** 单据图片 */
  documentImage?: string;
  /** 藏品ID */
  collectionId?: string;
  /** 事故时间 */
  incidentTime?: string;
  /** 事故地点 */
  incidentLocation?: string;
  /** 事故原因 */
  incidentCause?: string;
  /** 事故责任人 */
  responsiblePerson?: string;
  /** 藏品损坏情况 */
  damageStatus?: string;
  /** 处理状态 */
  status: string;
  /** 处理结果 */
  processingResult: string;
}

/**
 * 事故记录查询参数
 */
export interface AccidentQueryParams extends PageParam {
  /** 藏品ID */
  collectionId?: string;
  /** 事故地点 */
  accidentLocation?: string;
  /** 事故原因 */
  accidentCause?: string;
  /** 事故责任人 */
  responsiblePerson?: string;
  /** 藏品损坏情况 */
  collectionDamageStatus?: string;
  /** 处理状态 */
  status?: string;
  /** 处理结果 */
  processingResult?: string;
}
