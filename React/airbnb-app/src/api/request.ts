import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { loading } from '@/utils/loading'
import { toast } from '@/utils/toast'

export interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
}

interface InternalRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean
}

interface ApiResponse<T = unknown> {
  code?: number
  message?: string
  msg?: string
  data?: T
}

function httpErrorMessage(error: AxiosError) {
  const status = error.response?.status
  switch (status) {
    case 401:
      return '未授权，请重新登录'
    case 403:
      return '没有权限访问该资源'
    case 404:
      return '请求资源不存在'
    case 500:
      return '服务器内部错误'
    default:
      break
  }

  if (error.code === 'ECONNABORTED') {
    return '请求超时，请稍后重试'
  }

  if (!error.response) {
    return '网络异常，请检查网络连接'
  }

  return error.message || '请求失败'
}

export class Request {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalRequestConfig) => {
        if (!config.headers.get('Content-Type')) {
          config.headers.set('Content-Type', 'application/json')
        }

        const token = localStorage.getItem('token')
        if (token) {
          config.headers.set('Authorization', `Bearer ${token}`)
        }

        if (config.showLoading !== false) {
          loading.show()
        }

        return config
      },
      (error: AxiosError) => {
        const config = error.config as InternalRequestConfig | undefined
        if (config?.showLoading !== false) {
          loading.hide()
        }
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const config = response.config as InternalRequestConfig
        if (config.showLoading !== false) {
          loading.hide()
        }

        const payload = response.data
        if (
          payload &&
          typeof payload === 'object' &&
          'code' in payload &&
          payload.code !== undefined &&
          payload.code !== 0 &&
          payload.code !== 200
        ) {
          const message = payload.message || payload.msg || '请求失败'
          toast.error(message)
          return Promise.reject(new Error(message))
        }

        return response
      },
      (error: AxiosError) => {
        const config = error.config as InternalRequestConfig | undefined
        if (config?.showLoading !== false) {
          loading.hide()
        }

        toast.error(httpErrorMessage(error))
        return Promise.reject(error)
      },
    )
  }

  request<T = unknown>(config: RequestConfig): Promise<T> {
    return this.instance
      .request<ApiResponse<T> | T>(config)
      .then((response) => {
        const payload = response.data

        // 如果响应数据是对象，并且有code、message、msg字段，则返回data
        if (
          payload &&
          typeof payload === 'object' &&
          'data' in payload &&
          ('code' in payload || 'message' in payload || 'msg' in payload)
        ) {
          return (payload as ApiResponse<T>).data as T
        }
        // 否则返回响应数据
        return payload as T
      })
  }

  get<T = unknown>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  delete<T = unknown>(url: string, config?: RequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }
}
