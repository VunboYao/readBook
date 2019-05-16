// components/filmItem/filmItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      film: {
        type: Object,
        value: {}
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
    showDetail(event) {
      var filmId = event.currentTarget.dataset.filmid;
      wx.navigateTo({
        url: '/pages/detail/detail?filmId=' + filmId
      })
    }
  }
})
