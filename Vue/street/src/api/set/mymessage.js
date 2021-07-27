import request from '@/utils/request'

export function list() {
  return request({
    url: '/api/demo//admin/staffsMsg/queryPage',
    method: 'get'
  })
}

export function list1(id) {
  return request({
    url: '/api/demo//admin/staffsMsg/queryPage',
    method: 'get',
    params: {
      id
    }
  })
}
export function shenhemessage(id) {
  return request({
    url: '/api/demo/admin/staffs/getById',
    method: 'get',
    params: {
      id
    }
  })
}

// export function shenhe(data) {
//   return request({
//     url: `admin/staffs/getById${data}`,
//     method: 'get'

//   })
// }
export function isRead(id) {
  return request({
    url: '/api/demo/admin/staffsMsg/isRead',
    method: 'get',
    params: {
      id
    }
  })
}
