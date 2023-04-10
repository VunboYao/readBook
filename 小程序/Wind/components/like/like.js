Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:Number,
    like: Boolean,
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 收藏 */
    onLike(event) {
      let bLike = this.properties.like
      let count = this.properties.count

      if (this.properties.readOnly) {
        return 
      }

      // 如果 bLike 为 true, 则点击后--, 否则++
      count = bLike ? --count : ++count

      // 更新数据
      this.setData({
        like: !bLike,
        count: count
      })

      // 自定义事件的 detail
      let behavior = this.properties.like ? 'like' : 'cancel'
      // 触发组件自定义事件
      this.triggerEvent('like', {
        behavior: behavior
      })
    }
  }
})
