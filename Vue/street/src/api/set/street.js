import request from '@/utils/request'

export function list(pge, sum) {
  return request({
    url: '/api/demo/admin/sysAdmin/queryPage',
    method: 'get',
    params: {
      pages: pge,
      sums: sum
    }
  })
}
export function streetadd(data) {
  return request({
    url: '/api/demo/admin/sysAdmin/add',
    method: 'post',
    data
  })
}
export function streetedit(data) {
  return request({
    url: '/api/demo/admin/sysAdmin/edit',
    method: 'post',
    data
  })
}
export function streetremove(data) {
  return request({
    url: '/api/demo/street/admin/remove',
    method: 'post',
    data
  })
}
