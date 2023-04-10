import { config } from './../config.js'

/* 错误状态码提示 */
const tips = {
  1: "sorry, that's an error!",
  1005: 'appkey无效, 请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  request({url, data={}, method='GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data={}, method='GET') {

    /* 请求 */
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'appkey': config.appkey
      },
      success: res => {
        /* startsWith 方法的参数必须是 String 类型 */
        const code = res.statusCode.toString()

        /* 200开头状态码,传递回调中 data{} */
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          /* 数据异常 */
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      /* 调用失败 */
      fail: err => {
        reject()
        this._show_error();
      }
    })
  }

  /* 数据异常错误提示 */
  _show_error(error_code = 1) {
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
    })
  }
}
export { HTTP }
