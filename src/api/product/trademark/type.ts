// 请求品牌数据携带的分页参数, pageNum表示当前第几页, pageSize表示每一页有多少个数据
export interface TradeMarkParams {
  pageNum: number
  pageSize: number
}

// 请求返回的结果
interface dataType {
  code: number
  message: string
  ok: boolean
}

export type Records = {
  id?: number
  createTime: string
  updateTime: string
  tmName: string
  logoUrl: string
}

interface Data {
  records: Records[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  hitCount: boolean
  countId: any
  maxLimit: any
  searchCount: boolean
  pages: number
}

export interface TradeMarkResponse extends dataType {
  data: Data
}

// 新增/修改品牌的公共参数类型
export interface AddOrUpdateTradeMark {
  id?: number
  logoUrl: string
  tmName: string
}
