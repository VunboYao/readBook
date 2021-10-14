import request from '@/utils/request'
// 岗位类别
export function systype1addtype(data) {
  return request({
    url: '/api/demo/admin/systype1/add',
    method: 'post',
    data
  })
}
// export function systype1typelist() {
//   return request({
//     url: 'admin/systype1/lists',
//     method: 'post'
//   })
// }
export function systype1typelist(pge, sum) {
  return request({
    url: '/api/demo/admin/systype1/lists',
    method: 'get',
    params: {
      pages: pge,
      sums: sum
    }
  })
}
export function systype1typeedit(data) {
  return request({
    url: '/api/demo/admin/systype1/edit',
    method: 'post',
    data
  })
}
export function systype1typeremove(data) {
  return request({
    url: '/api/demo/admin/systype1/remove',
    method: 'post',
    data
  })
}
// 岗位层次
export function systype2list(pge, sum) {
  return request({
    url: '/api/demo/admin/systype2/lists',
    method: 'get',
    params: {
      pages: pge,
      sums: sum
    }
  })
}
export function systype2add(data) {
  return request({
    url: '/api/demo/admin/systype2/add',
    method: 'post',
    data
  })
}
export function systype2edit(data) {
  return request({
    url: '/api/demo/admin/systype2/edit',
    method: 'post',
    data
  })
}
export function systype2remove(data) {
  return request({
    url: '/api/demo/admin/systype2/remove',
    method: 'post',
    data
  })
}
// 岗位等级
export function systype3list(pge, sum) {
  return request({
    url: '/api/demo/admin/systype3/lists',
    method: 'get',
    params: {
      pages: pge,
      sums: sum
    }
  })
}
export function systype3add(data) {
  return request({
    url: '/api/demo/admin/systype3/add',
    method: 'post',
    data
  })
}
export function systype3edit(data) {
  return request({
    url: '/api/demo/admin/systype3/edit',
    method: 'post',
    data
  })
}
export function systype3remove(data) {
  return request({
    url: '/api/demo/admin/systype3/remove',
    method: 'post',
    data
  })
}
// 工作部门
export function systype4add(data) {
  return request({
    url: '/api/demo/admin/systype4/add',
    method: 'post',
    data
  })
}
export function systype4list(pge, sum) {
  return request({
    url: '/api/demo/admin/systype4/lists',
    method: 'get',
    params: {
      pages: pge,
      sums: sum
    }
  })
}
export function systype4edit(data) {
  return request({
    url: '/api/demo/admin/systype4/edit',
    method: 'post',
    data
  })
}
export function systype4remove(data) {
  return request({
    url: '/api/demo/admin/systype4/remove',
    method: 'post',
    data
  })
}
export function streetlist(pge, sum) {
  return request({
    url: '/api/demo/admin/street/lists',
    method: 'post',
    data: {
      pages: pge,
      sums: sum
    }
  })
}
