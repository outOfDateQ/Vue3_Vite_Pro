// 获取品牌管理的数据
import request from "@/utils/request"
import type { TradeMarkParams, TradeMarkResponse, AddOrUpdateTradeMark, } from './type'

enum API {
  // 获取品牌管理数据的接口
  TRADEMARK_URL = '/admin/product/baseTrademark',
  // 添加一个品牌
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改一个品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除一个品牌
  DELETE_TRADEMARK = '/admin/product/baseTrademark/remove'
}

// 获取品牌管理数据
export function getTrademarkData(params: TradeMarkParams) {
  return request<any, TradeMarkResponse>({
    url: `${API.TRADEMARK_URL}/${params.pageNum}/${params.pageSize}`,
    method: 'GET',
  })
}

// 新增|修改一个品牌
export function addOrUpdateTrademark(data: AddOrUpdateTradeMark) {
  // 表示新增一个品牌
  if (!data.id) {
    return request<any, any>({
      url: API.ADD_TRADEMARK_URL,
      method: 'POST',
      data
    })
  } else { // 表示修改一个品牌
    return request<any, any>({
      url: API.UPDATE_TRADEMARK_URL,
      method: 'PUT',
      data
    })
  }
}

export function deleteTrademark(id: number) {
  return request<any, any>({
    url: `${API.DELETE_TRADEMARK}/${id}`,
    method: 'DELETE'
  })
}