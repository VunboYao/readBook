import api from './request'

export function getTopMV(offset = 0, limit = 20) {
  return api.get({
    url: '/top/mv',
    data: {
      offset,
      limit
    }
  })
}

export function getMVUrl(id) {
  return api.get({
    url: '/mv/url',
    data: {
      id
    }
  })
}

export function getMVInfo(mvid) {
  return api.get({
    url: '/mv/detail',
    data: {
      mvid
    }
  })
}

export function getMVRelated(id) {
  return api.get({
    url: '/related/allvideo',
    data: {
      id
    }
  })
}

export function getVideoDetail(id) {
  return api.get({
    url: '/video/detail',
    data: {
      id
    }
  })
}