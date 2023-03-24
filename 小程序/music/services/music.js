import api from './request'

export function getMusicBanner(type = 0) {
  return api.get({
    url: '/banner',
    data: {
      type
    }
  })
}
