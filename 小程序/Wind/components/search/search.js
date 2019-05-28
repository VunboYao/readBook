import { KeywordModel } from "../../models/keyword"
import { BookModel } from "../../models/book"

import { paginationBav } from "../behaviors/pagination";

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBav],
  properties: {
    more: {
      value: false,
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    history: [], // 历史
    hotKeywords: [], // 热搜
    inputValue: '', // 输入框值
    placeholder: '书籍名',
    searching: false, // 搜索状态
    loading: false, // 请求限制,默认没有发送请求,
    loadingCenter: false,
  },

  // 事件生命周期
  lifetimes: {
    // 实例进入页面节点树
    attached() {
      const historyWords = keywordModel.getHistory()
      keywordModel.getHot().then(res => {
        this.setData({
          history: historyWords,
          hotKeywords: res.hot
        })
      })
    },
    detached() {
      console.log('组件被注销了');
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载更多
    loadMore() {
      if (!this.data.inputValue) {
        return
      }
      // 加载中.则不发送请求
      if (this.isLocked()) {
        return
      }

      // 是否有更多数据
      if (this.hasMore()) {
        // 加载中
        this.locked()
        // 起始值通过行为中 getCurrentStart 方法获取
        bookModel.search(this.getCurrentStart(), this.data.inputValue).then(res => {
          // 行为中方法
          this.setMoreData(res.books)
          this.unLocked()
        }, () => {
          // 失败后.解锁
          this.unLocked()
        })
      }
    },



    // 取消
    onCancel() {
      // 初始化
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    // 点击搜索
    onConfirm(e) {
      this._showResult()
      this._showLoadingCenter()
      // 搜索关键词
      const q = e.detail.value || e.detail.text
      // 立刻更新搜索框内的文本
      this.setData({
        inputValue: q
      })
      bookModel.search(0, q).then(res => {

        // 行为中封装的设置数据方法
        this.setMoreData(res.books)
        this.setTotal(res.total)

        // 存储历史记录
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    // 清除搜索框
    onDelete(e) {
      // 初始化
      this.initialize()
      this.setData({
        searching: false,
        inputValue: '',
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    }
  }
})
