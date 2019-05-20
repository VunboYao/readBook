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
      }
    })
  }

  /* 上一期/下一期 */
  getClassic(index, nextOrPrevious, sCallback) {
    this.request({
      url: 'classic/' + index + '/' + nextOrPrevious,
      success: res => {
        sCallback(res);
      }
    })
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
}

export {ClassicModel}
