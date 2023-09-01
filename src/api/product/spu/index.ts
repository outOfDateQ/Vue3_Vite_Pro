import request from '@/utils/request'
import type { HasSpuRequestData } from './type'

enum API {
  // 获取已有的SPU数据
  HAS_SPU_URL = `/admin/product`,
}

export function getSpu(
  page: number,
  limit: number,
  category3Id: number | string,
) {
  return request<any, HasSpuRequestData>({
    url: `${API.HAS_SPU_URL}/${page}/${limit}`,
    params: {
      category3Id,
    },
    method: 'GET',
  })
}
