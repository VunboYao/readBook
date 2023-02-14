import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import type { VRequestConfig } from './95-VRequest.type'

class VRequest {
	instance: AxiosInstance

	constructor(config: VRequestConfig) {
		this.instance = axios.create(config)
		// !global interceptor
		this.instance.interceptors.request.use(config => {
			// todo: global interceptor: loading token
			console.log('Interceptor-Global-Req:', config);
			return config
		}, error => {
			console.error('Interceptor-Global-Req-Error:', error);
			return Promise.reject(error)
		})
		this.instance.interceptors.response.use(response => {
			// todo: global interceptor: response
			console.info('Interceptor-Global-Res:', response);
      // return data of axios response
			return response.data
		}, error => {
			console.error('Interceptor-Global-Res-Error:', error);
			return Promise.reject(error)
		})

		// !instance own interceptor
		this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
			config.interceptors?.requestFailed
		)
		this.instance.interceptors.response.use(
			config.interceptors?.responseSuccess,
			config.interceptors?.responseFailed
		)
	}

	async request<T = any>(config: VRequestConfig<T>):Promise<T> {
    // !don't add interceptor to the instance, will confusion the instance

    // !manual call interceptor of single api
    if (config.interceptors?.requestSuccess) {
      config = await config.interceptors.requestSuccess(config as InternalAxiosRequestConfig)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then(async value => {
        if (config.interceptors?.responseSuccess) {
          value = await config.interceptors.responseSuccess(value)
        }
        resolve(value)
      }).catch(reason => reject(reason))
    })
	}

  get<T = any>(config: VRequestConfig<T>) {
    return this.request({...config, method: 'GET'})
  }
  post<T = any>(config: VRequestConfig<T>) {
    return this.request({...config, method: 'POST'})
  }
  delete<T = any>(config: VRequestConfig<T>) {
    return this.request({...config, method: 'DELETE'})
  }
  patch<T = any>(config: VRequestConfig<T>) {
    return this.request({...config, method: 'PATCH'})
  }
}

// =============================demo====================================
const api = new VRequest({
	baseURL: 'http://localhost:9999',
	timeout: 10000,
	interceptors: { // instance own interceptor
		responseSuccess(response) {
			console.log('Interceptor-Instance-Res:', response);
			return response
		},
		responseFailed(error) {
			return error
		},
		requestSuccess(config) {
			console.log('Interceptor-Instance-Req:', config);
			return config
		},
		requestFailed(error) {
			return error
		}
	}
})

interface resData {
  list: any[]
  subtitle: string
  title: string
  type: string
}

interface iHome {
  namess: string
  agge: number
}

function GetData(data:iHome) {
 return api.get<resData>({
    url: '/home/multidata',
    interceptors: { // api own interceptor
      requestSuccess(config) {
        console.log('Interceptor-API-Req:', config)
        return config
      },
      responseSuccess(response) {
        console.log('Interceptor-API-Res:', response)
        return response
      }
    },
   data
  })
}
GetData({
  namess: '123',
  agge: 123
}).then(res => {
  console.log('接口数据', res)
})



export { }
