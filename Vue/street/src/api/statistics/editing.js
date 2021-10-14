import request from '@/utils/request'

export function list(pge, sum, is_set = 0) {
  return request({
    url: '/api/demo/admin/staffstypes/lists',
    method: 'post',
    data: {
      pages: pge,
      sums: sum,
      is_set
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
    url: '/api/demo/admin/staffstypes/lists',
    method: 'post',
    data
  })
}

export function userDetail(data) {
  return request({
    url: '/api/demo/admin/staffstypes/detail',
    method: 'post',
    data
  })
}

// 人员简历修改
export function userInfoModify(data) {
  return request({
    url: '/api/demo/admin/staffstypes/edit',
    method: 'post',
    data
  })
}

// 人员解聘
export function userQuit(data) {
  return request({
    url: '/api/demo/admin/staffstypes/staffsquit',
    method: 'post',
    data
  })
}

// 无额度申请人员添加
export function AddNoApplication(data) {
  return request({
    url: '/api/demo/admin/staffstypes/addNoApplication',
    method: 'post',
    data
  })
}

