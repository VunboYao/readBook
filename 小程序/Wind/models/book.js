import { HTTP } from "../util/http-p.js"

class BookModel extends HTTP {
  // 获取热门书籍(概要)
  getHotList() {
    return this.request({url:'book/hot_list'})
  }

  // 获取喜欢书籍的数量
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export {BookModel}
