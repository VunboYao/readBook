import api from "../../api/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateComments:[],
    freeCommentParams:{
      next_date: "",
      for_mobile: 1
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loadComments();
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadComments();
  },

  loadComments: function () {
    api.loadFreeComments(({ data }) => {
      this.setData({
        dateComments: this.data.dateComments.concat(data),
        ["freeCommentParams.next_date"]:data.date
      })
    }, this.data.freeCommentParams)
  }
})