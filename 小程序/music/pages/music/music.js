// pages/music/music.js
import { getMusicBanner } from 'services/music'
import querySelect from 'utils/query-select'
import { throttle } from 'utils/throttle'

// 函数节流处理
const throttleQuerySelect = throttle(querySelect, 100)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 150
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchMusicBanner()
  },

  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },

  onSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  async onImageLoaded() {
    const res = await throttleQuerySelect(".image")
    this.setData({
      bannerHeight: res.height
    })
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
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})