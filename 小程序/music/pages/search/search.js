// pages/search/search.js
import schoolStore from '../../stores/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    school: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    schoolStore.onState('count', this.updateCount)
    schoolStore.onState('obj', this.updateObj)
  },

  updateCount(value) {
    console.log(' search count');
    this.setData({
      count: value
    })
  },

  updateObj(value) {
    console.log('search obj');
    this.setData({
      school: value
    })
  },

  getData() {
    schoolStore.dispatch('getData')
  },

  goTest() {
    wx.redirectTo({
      url: '/pages/demo/demo',
    })
  },

  onUnload() {
    schoolStore.offState('count', this.updateCount)
    schoolStore.offState('obj', this.updateObj)
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
