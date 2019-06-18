// component/demo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'Default value'
    }
  },
  options: {
    multipleSlots: true, // 启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    someData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
