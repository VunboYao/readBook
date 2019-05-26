import { BookModel } from "./../../models/book.js";

import { random } from "../../util/common";

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: '',
    more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },

  // 上滑加载
  onReachBottom() {
    this.setData({
      // more: random(16)
      more: !this.data.more
    })
  },

  // 搜索...
  onSearching(e) {
    this.setData({
      searching: true
    })
  },

  // 取消搜索...
  onCancel(e) {
    this.setData({
      searching: false
    })
  }
})
