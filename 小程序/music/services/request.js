class VRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  request(options) {
    const {
      url
    } = options
    return new Promise((resolve, reject) => {
      wx.showLoading({
        mask: true,
        title: '加载中',
      })
      wx.request({
        ...options,
        url: this.baseUrl + url,
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          console.log('err:', err);
          reject(err)
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  }

  get(opitons) {
    return this.request({
      ...opitons,
      method: 'GET'
    })
  }

  post(options) {
    return this.request({
      ...options,
      method: 'POST'
    })
  }
}

export default new VRequest('http://codercba.com:9002')
