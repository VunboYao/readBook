import request from '@/utils/request'

export function list(pge, sum) {
  return request({
    url: 'admin/staffstype/lists',
    method: 'post',
    data: {
      pages: pge,
      sums: sum
    }
  })
}

export function bm_list() {
  return request({
    url: '/api/demo/admin/street/lists',
    method: 'post'
  })
}
export function selectlist(data) {
  return request({
    url: '/api/demo/admin/staffstype/listss',
    method: 'post',
    data
  })
}
