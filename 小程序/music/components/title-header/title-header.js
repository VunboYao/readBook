// components/titlte-header/title-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMore: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '推荐视频'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMoreTap() {
      this.triggerEvent('moreTap')
    }
  }
})
