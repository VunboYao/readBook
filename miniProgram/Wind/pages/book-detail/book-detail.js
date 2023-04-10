import {
  BookModel
} from "../../models/book"
import { LikeModel } from "../../models/like";

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    // 加载数据
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    // 并行多请求处理
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })

    /*  detail.then(res => {
       this.setData({
         book: res
       })
     })

     comments.then(res => {
       this.setData({
         comments: res.comments
       })
     })

     likeStatus.then(res => {
       this.setData({
         likeStatus: res.like_status,
         likeCount: res.fav_nums
       })
     }) */
  },

  // 书籍点赞
  onLike(e) {
    const like_or_cancel = e.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  // 输入短评
  onFakePost(e) {
    this.setData({
      posting: true
    })
  },

  // 取消
  onCancel(e) {
    this.setData({
      posting: false
    })
  },

  // 评论提交
  onPost(event) {
    const comment = event.detail.text || event.detail.value

    // 为空退出
    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: 'none'
        })

        // 数组前推送
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        // 更新数据
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  }
})
