import request from '@/utils/request'

export function addsyspost(data) {
  return request({
    url: '/api/demo/admin/syspost/add',
    method: 'post',
    data
  })
}
export function editsyspost(data) {
  return request({
    url: '/api/demo/admin/syspost/edit',
    method: 'post',
    data
  })
}
export function removesyspost(data) {
  return request({
    url: '/api/demo/admin/syspost/remove',
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
export function joblist(pge, sum) {
  return request({
    url: '/api/demo/admin/systype1/lists',
    method: 'post',
    data: {
      pages: pge,
      sums: sum
    }
  })
}
export function list(pge, sum) {
  return request({
    url: '/api/demo/admin/syspost/lists?pages=' + pge + '&sums=' + sum,
    method: 'get',
    data: {
      pages: pge,
      sums: sum
    }
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/api/demo/login/getUserInfo',
    method: 'get'
  })
}
// 查询用编情况
export function queryEditor() {
  return request({
    url: '/api/demo/admin/postUse/query',
    method: 'get'
  })
}
// 用编申请提交
export function postUseApplication(infoList) {
  return request({
    url: '/api/demo/admin/postUse/postUseApplication',
    method: 'post',
    data: {
      infoList
    }
  })
}
// 查询提交的申请列表
export function queryPage(pages, sums, status) {
  return request({
    url: `/api/demo/admin/postUse/queryPage?pages=${pages}&sums=${sums}&status=${status}`,
    method: 'get'
  })
}
// 详情查询
export function queryById(id) {
  return request({
    url: `/api/demo/admin/postUse/queryById?id=${id}`,
    method: 'get'
  })
}
// 审批
export function audit(id, status, remark = '') {
  return request({
    url: '/api/demo/admin/postUse/audit',
    method: 'post',
    data: {
      id,
      status,
      remark
    }
  })
}
// 人员添加
export function addUser(data) {
  return request({
    url: '/api/demo/admin/staffstypes/add',
    method: 'post',
    data
  })
}
// 判断是否是管理员
export function isAdmin() {
  return request({
    url: '/api/demo/login/isAdmin',
    method: 'get'
  })
}

// 岗位名额管理查询
export function workTypeSearch() {
  return request({
    url: '/api/demo/admin/syspost/streetlists',
    method: 'get'
  })
}

// 用编应用申请
export function ApplyApplication(data) {
  return request({
    url: '/api/demo/admin/postUse/postUseApplication',
    method: 'post',
    data
  })
}

// 岗位excel修改/demo/admin/syspost/setstreet
export function modifyStreetInfo(data) {
  return request({
    url: '/api/demo/admin/syspost/setstreet',
    method: 'post',
    data
  })
}

// demo/admin/postUse/ 可添加岗位查询
export function submitRowCount(id) {
  return request({
    url: `/api/demo/admin/postUse/submitRowCount?id=${id}`,
    method: 'get'
  })
}

export function queryType(id) {
  return request({
    url: `/api/demo/admin/postUse/queryType?applicationId=${id}`,
    method: 'get'
  })
}
