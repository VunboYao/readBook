import {ClassicModel} from './../../models/classic.js'
import {LikeModel} from './../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 更新数据
    classicModel.getLatest(res => {
      this.setData({
        classic: res
      })
    })
  },

  /* 点赞 */
  onLike(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function (event) {
    this._updateClassic('next');
  },
  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  /* 获取上一期/下一期 公有方法 */
  _updateClassic(nextOrPrevious) {
    // 获取当前index
    let index = this.data.classic.index
    // 获取期刊
    classicModel.getClassic(index, nextOrPrevious, res => {
      // 更新数据
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
