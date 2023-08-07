import request from '@/utils/request'
import type { CategoryResponse, AllIDs, AttrsResponse, AttrData } from './type'

enum API {
  // 获取一级分类的数据
  FIRST_CATEGORY_URL = '/admin/product/getCategory1',
  // 获取二级分类的数据
  SECOND_CATEGORY_URL = '/admin/product/getCategory2', // 需要传递一级分类选中的ID
  // 获取三级分类的数据
  THIRD_CATEGORY_URL = '/admin/product/getCategory3', // 需要传递二级分类选中的ID
  // 获取分类下已有的分类属性及属性值数据
  ATTR_URL = '/admin/product/attrInfoList', // 需要一二三级分类的ID
  // 添加|修改属性
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
}

// 获取一级分类
export function getFirstCategory() {
  return request<any, CategoryResponse>({
    url: API.FIRST_CATEGORY_URL,
    method: 'GET',
  })
}

// 获取二级分类
export function getSecondCategory(id: number | string) {
  return request<any, CategoryResponse>({
    url: `${API.SECOND_CATEGORY_URL}/${id}`,
    method: 'GET',
  })
}

// 获取三级分类
export function getThirdCategory(id: number | string) {
  return request<any, CategoryResponse>({
    url: `${API.THIRD_CATEGORY_URL}/${id}`,
    method: 'GET',
  })
}

// 获取分类的属性和属性值
export function getAttrs(allIds: AllIDs) {
  return request<any, AttrsResponse>({
    url: `${API.ATTR_URL}/${allIds.firstId}/${allIds.secondId}/${allIds.thirdId}`,
    method: 'GET',
  })
}

// 添加|修改属性
export function addOrUpdateAttr(data: AttrData) {
  if (!data.id) {
    // 添加属性
    return request<any, any>({
      url: API.ADD_OR_UPDATE_ATTR_URL,
      method: 'POST',
      data,
    })
  } else {
    // 修改属性
  }
}
