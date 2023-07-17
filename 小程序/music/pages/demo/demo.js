// pages/demo/demo.js
import schoolStore from '../../stores/school.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 状态栏高度
    statusHeight: 0,
    // 导航栏高度
    navHeight: 0,
    school: '',
    count: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    schoolStore.onState('count', (value) => {
      this.setData({
        count: value
      })
    })
    schoolStore.onState('obj', (value) => {
      this.setData({
        school: value
      })
    })
  },

  getData() {
    schoolStore.dispatch('getData')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    // 状态栏高度
    const statusHeight = (await wx.getSystemInfo()).statusBarHeight
    // 导航总体高度. 默认导航栏高度44
    const navHeight = statusHeight + 44
    this.setData({
      navHeight,
      statusHeight
    })
  },
})
