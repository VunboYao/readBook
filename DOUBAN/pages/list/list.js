import api from "./../../api/api.js"

// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqKey: '', // 关键参数
    films: [], // 电影列表
    total: 0, // 总数
    params: {
      start: 0,
      count: 16
    } // 请求参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.reqKey = options.reqKey
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading({
      title: '加载中...'
    })
    // 请求数据
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /* 上拉判断 */
    this.data.params.start = this.data.params.start + this.data.params.count
    if (this.data.params.start > this.data.total) {
      return false
    } else {
      this.loadData()
    }
  },

  /* 加载数据方法 */
  loadData() {
    api[this.data.reqKey](({data: {subject_collection: {name}, subject_collection_items: list, total}}) => {
      // 设置标题
      wx.setNavigationBarTitle({
        title: name
      })

      // 更新数据
      this.setData({
        films: this.data.films.concat(list),
        total
      })

      // 关闭loading
      wx.hideLoading()
    }, this.data.params)
  }
})
