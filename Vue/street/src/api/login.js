import request from '@/utils/request'

export function test() {
  return request({
    url: '',
    method: 'post',
    data: {}
  })
}

export function login(adminid, password) {
  return request({
    url: '/api/demo/login/index',
    method: 'post',
    data: {
      username: adminid,
      password: password
    }
  })
}

export function GetUserInfo(token) {
  return request({
    url: '/api/demo/login/isAdmin',
    method: 'get',
    data: {
      token
    }
  })
}

export function getInfo(id) {
  return request({
    url: '/api/demo/userinfo',
    method: 'post',
    params: { id }
  })
}

export function logout() {
  return request({
    url: '/api/demo/user/logout',
    method: 'post'
  })
}
