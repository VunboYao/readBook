import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'

// const ApiUrl = 'http://124.70.54.235:8080/demo/'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: ApiUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
})
let loading
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    loading = Loading.service({
      lock: true,
      fullscreen: true,
      text: '数据请求中，请稍等...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    loading && loading.close()
    const res = response.data

    if (res.code != '200') {
      Message({
        message: `${res.data}, ${res.message}`,
        type: 'error',
        duration: 5 * 1000,
        showClose: true
      })
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '接口异常，请重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
