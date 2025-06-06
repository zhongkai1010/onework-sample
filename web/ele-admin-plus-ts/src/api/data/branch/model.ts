/** 分馆信息 */
export interface BranchInfo {
  /** 分馆ID */
  id: string
  /** 分馆名称 */
  name: string
  /** 启用自动编号 0:不启动 1：启动 */
  status: number
  /** 自动编号前缀 */
  numberPrefix: string
  /** 自动编号长度 */
  numberLength: string
  /** 初始编号值 */
  numberPrice: string
  /** 创建时间 */
  createTime: string
}

/** 分馆查询参数 */
export interface BranchQueryParams {
  /** 分馆名称 */
  name?: string
  /** 页码 */
  page?: number
  /** 每页条数 */
  limit?: number
}

/** 分馆添加参数 */
export interface BranchAddParams {
  /** 分馆名称 */
  name: string
  /** 启用自动编号 0:不启动 1：启动 */
  status: string
  /** 自动编号前缀 */
  numberPrefix: string
  /** 自动编号长度 */
  numberLength: string
  /** 初始编号值 */
  numberPrice: string
}

/** 分馆更新参数 */
export interface BranchUpdateParams extends BranchAddParams {
  /** 分馆ID */
  id: string
}

/** 分馆删除参数 */
export interface BranchDeleteParams {
  /** 分馆ID列表 */
  ids: string[]
}

/** 分页查询结果 */
export interface BranchPageResult {
  /** 分馆列表 */
  list: BranchInfo[]
  /** 总条数 */
  count: string
}
