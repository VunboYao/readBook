import { HTTP } from "../util/http-p.js"

class BookModel extends HTTP {
  // 获取热门书籍(概要)
  getHotList() {
    return super.request({url:'book/hot_list'})
  }

  // 获取喜欢书籍的数量
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  // 获取书籍详情
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  // 获取点赞状态
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  // get Comments
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  // POST Comment
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // 搜索
  search(start, q) {
    return this.request({
      url: 'book/search?summary=1',
      data: {
        start,q
      }
    })
  }
}

export {BookModel}
