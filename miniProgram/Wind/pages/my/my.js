// pages/my/my.js
import { ClassicModel } from "../../models/classic";
import { BookModel } from "../../models/book";

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized() {
    wx.getSetting({
      success: res => {
        // 如果用户已经授权,则获取用户的信息
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      console.log(res);
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  // 请求授权:获取用户信息
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo
    // 如果用户授权,更新界面信息
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })
    }
  },

  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  onStudy(e) {
    wx.navigateTo({
      url: '/pages/course/course'
    })
  }
})
