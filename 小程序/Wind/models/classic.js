import { HTTP } from "../util/http.js";

/* 期刊 继承 HTTP */
class ClassicModel extends HTTP {
  /* 最新一期 */
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        /* 回调的方式输出res */
        sCallback(res);

        /* 将最新一期的 index 存入缓存 */
        this._setLatestIndex(res.index)

        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  /* 上一期/下一期 */
  getClassic(index, nextOrPrevious, sCallback) {
    // 根据key值, 读取缓存
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)

    // 如果没有缓存, 读取远程数据,并存入缓存
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          // 加入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res);
        }
      })
    } else {
      sCallback(classic)
    }
  }

  /* 判断是否是第一期 */
  isFirst(index) {
    return index === 1 ? true : false
  }

  /* 判断是否是最新一期 */
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex === index ? true : false
  }

  /* 缓存最新一期的index */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  /* 获取最新一期的index */
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  /* 设置缓存的key */
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {ClassicModel}
