// components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  // 外部 class
  externalClasses: ['tag-class'],

  options: {
    multipleSlots: true,
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
    onTap(e) {
      this.triggerEvent('tapping',{
        text: this.properties.text
      })
    }
  }
})
