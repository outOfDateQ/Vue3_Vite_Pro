interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export type Data = {
  id: number | string
  createTime: string
  updateTime: string
  name: string
  category1Id?: number
  category2Id?: number
}

// 各级级分类返回的数据类型
export interface CategoryResponse extends ResponseData {
  data: Data[]
}

// 定义仓库数据类型(应该定义在仓库的类型文件中)
export interface State {
  firstCategory: Data[]
  secondCategory: Data[]
  thirdCategory: Data[]
  firstId: number | string
  secondId: number | string
  thirdId: number | string
}

// 获取分类属性和属性值传递的参数
export interface AllIDs {
  firstId: number | string
  secondId: number | string
  thirdId: number | string
}

// 获取分类属性和属性值返回的数类型
export type AttrData = {
  id?: number
  createTime?: any
  updateTime?: any
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList[]
}
export type AttrValueList = {
  id?: number
  createTime?: any
  updateTime?: any
  valueName: string
  attrId?: number
  flag?: boolean
}
export interface AttrsResponse extends ResponseData {
  data: AttrData[]
}
