import {HTTP} from '../util/http-p'

class KeywordModel extends HTTP {
  constructor () {
    super()
    this.key = 'historyKey'
    this.maxLength = 5
  }
  // 通过缓存获取历史搜索
  getHistory() {
    return wx.getStorageSync(this.key)
  }

  // 获取热门搜索
  getHot() {
    // 返回promise, 调用父级方法 request 数据
    return super.request({
      url: 'book/hot_keyword'
    })
  }

  // 添加搜索历史
  addToHistory(keyword) {
    const words = this.getHistory() || []
    // 是否包含关键词
    const index = words.includes(keyword)
    if (!index) {
      words.length > this.maxLength ? words.pop() : words
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}


export { KeywordModel }
