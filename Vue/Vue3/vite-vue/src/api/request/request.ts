import axios, { AxiosRequestHeaders, AxiosInstance, AxiosError } from 'axios'
import {
  APISchema,
  CreateRequestConfig,
  CreateRequestClient,
  RequestOptions,
  RequestPath,
  RequestFunction,
} from './types'

const MATCH_METHOD = /^(GET|POST|PUT|DELETE|HEAD|OPTIONS|CONNECT|TRACE|PATCH)\s+/
const MATCH_PATH_PARAMS = /:(\w+)/g
const USE_DATA_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

function attachAPI<T extends APISchema>(client: AxiosInstance,
  apis: CreateRequestConfig<T>['apis']): CreateRequestClient<T> {
  const hostApi: CreateRequestClient<T> = Object.create(null)
  for (const apiName in apis) {
    const apiConfig = apis[apiName]
    if (typeof apiConfig === 'function') {
      hostApi[apiName] = apiConfig as RequestFunction
      continue
    }
    let apiOptions = {}
    let apiPath = apiConfig as RequestPath
    if (typeof apiConfig === 'object') {
      const { path, ...rest } = apiConfig as RequestOptions
      apiPath = path as RequestPath
      apiOptions = rest
    }
    hostApi[apiName] = (params, options) => {
      const _params = { ...(params || {}) }
      const [prefix, method] = apiPath.match(MATCH_METHOD) || ['GET', 'GET']
      let url = apiPath.replace(prefix, '')
      const matchParams = apiPath.match(MATCH_PATH_PARAMS)
      if (matchParams) {
        matchParams.forEach((match) => {
          const key = match.replace(':', '')
          if (Reflect.has(_params, key)) {
            url = url.replace(match, Reflect.get(_params, key))
            Reflect.deleteProperty(_params, key)
          }
        })
      }

      const requestParams = USE_DATA_METHODS.includes(method) ? { data: _params } : { params: _params }
      return client.request({
        url,
        method: method.toLowerCase(),
        ...requestParams,
        ...apiOptions,
        ...options,
      })
    }
  }
  return hostApi
}

// 创建请求客户端
export function createRequestClient<T extends APISchema>(requestConfig: CreateRequestConfig<T>): CreateRequestClient<T> {
  const client = axios.create({
    baseURL: requestConfig.baseURL,
    headers: requestConfig.headers,
  })

  // 附加各业务请求头
  client.interceptors.request.use((config) => {
    const headerHandlers = (requestConfig.headerHandlers || []).map((handler) => {
      return handler(config)
        .then((mixHeaders: AxiosRequestHeaders) => {
          Object.assign(config.headers!, mixHeaders)
        }).catch()
    })
    return Promise.all(headerHandlers).then(() => config)
  })

  // 拦截请求
  client.interceptors.response.use((res) => res,
    (error: AxiosError) => {
      const requestError = requestConfig.errorHandlers
        ? requestConfig.errorHandlers(error)
        : error
      return Promise.reject(requestError)
    })

  return attachAPI<T>(client, requestConfig.apis)
}
