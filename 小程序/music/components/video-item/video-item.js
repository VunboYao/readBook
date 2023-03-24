// components/video-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      default: {}
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
    onItemTap() {
      const item = this.properties.itemData
      wx.navigateTo({
        url: `/pages/video-detail/video-detail?id=${item.id}`,
      })
    }
  }
})
