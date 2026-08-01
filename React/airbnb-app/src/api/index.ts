import { Request } from './request'

const request = new Request({
  baseURL: 'http://codercba.com:1888/airbnb/api/',
  timeout: 10000,
})

export default request
export { Request, type RequestConfig } from './request'
