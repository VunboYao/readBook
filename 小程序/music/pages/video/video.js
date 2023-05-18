// pages/video/video.js
import {
  getTopMV
} from 'services/video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchTopMV()
  },

  async fetchTopMV() {
    if (!this.data.hasMore) return

    //  1.API
    const res = await getTopMV(this.data.videoList.length)

    // 2.update Data
    this.setData({
      videoList: [...this.data.videoList, ...res.data]
    })

    // 3. load more data
    this.data.hasMore = res.hasMore
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    //  1.API
    const res = await getTopMV()

    // 2.update Data
    this.setData({
      videoList: [...res.data]
    })

    this.data.hasMore = true
    wx.stopPullDownRefresh()
  }
})
