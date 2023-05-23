// components/safe-view/safe-view.js
const app = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 有底部UI按钮
    hasBottom: {
      type: Boolean,
      value: false
    },
    bottomHeight: {
      type: Number,
      value: 120
    },
    bottomButtonText: {
      type: String,
      value: 'Confirm'
    },
    // 是否导航头自定义
    hasCustomHeader: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '自定义标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 0,
    statusHeight: 0
  },

  lifetimes: {
    attached() {
      this.setData({
        navHeight: app.navHeight,
        statusHeight: app.systemInfo.statusBarHeight
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      wx.navigateBack()
    }
  }
})
