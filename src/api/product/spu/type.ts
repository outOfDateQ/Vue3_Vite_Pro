// 所有返回数据都有的字段及其类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 每一个SPU的数据类型
interface SpuData {
  id?: number // 新增的SPU不需要传入id
  createTime: string
  updateTime: string
  spuName: string
  description: string
  category3Id: number
  tmId: number
  // 后续获取数据的时候需要动态修改
  spuSaleAttrList: null
  spuImageList: null
  spuPosterList: null
}

// SPU数据的数组类型
export type Records = SpuData[]

// 请求SPU返回的数据的类型
export interface HasSpuRequestData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
