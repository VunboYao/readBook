import type { AxiosRequestHeaders, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

// 路径配置
export type RequestPath = `${Uppercase<RequestOptions['method']>} ${string}`

// 选项配置
export type RequestOptions = {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE' | 'PATCH'
  headers?: AxiosRequestHeaders
}

// 自定义函数
export type RequestFunction<P = Record<string, any> | void, R = any> = (
  params: P,
  ...args: any[]
) => Promise<R>

// 基础配置的联合类型
export type APIConfig = RequestPath | RequestOptions | RequestFunction

export type HeaderHandler = (config?: AxiosRequestConfig) => Promise<AxiosRequestHeaders>
export type RequestErrorHandler = (config: AxiosError) => void

export type APISchema = Record<string, {
  request: Record<string, any> | void
  response: Record<string, any> | any
}>

// 请求实例的配置
export type CreateRequestConfig<T extends APISchema> = {
  baseURL: string
  headers?: AxiosRequestHeaders
  headerHandlers?: Array<HeaderHandler>
  errorHandlers?: RequestErrorHandler
  apis: {
    [K in keyof T]: APIConfig
  }
}

// 创建请求客户端的类型约束
export type CreateRequestClient<T extends APISchema> = {
  [K in keyof T]: RequestFunction<T[K]['request'], AxiosResponse<T[K]['response']>>
}

