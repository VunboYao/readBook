const app = getApp()
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 控制底部按钮展示
    hasBottom: {
      type: Boolean,
      value: false
    },
    // 底部按钮文案内容
    buttonText: {
      type: String,
      value: ''
    },
    // 底部按钮的文字颜色
    buttonTextColor: {
      type: String,
      value: ''
    },
    // 底部按钮的背景颜色
    buttonTextBgColor: {
      type: String,
      value: ''
    },
    // 禁用状态: 禁用事件
    disabled: {
      type: Boolean,
      value: false
    },
    // 自定义底部，只是设置padding高度和UI高度
    customButton: {
      type: Boolean,
      value: false
    },
    // 自定义UI高度
    customButtonHeight: {
      type: Number,
      value: 136
    },
    // 自定义颜色，默认白色
    customButtonBgColor: {
      type: String,
      value: '#fff'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    hasFringe: app.globalData.hasFringe,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义提交事件
    onHandle() {
      if (this.properties.disabled) return
      this.triggerEvent('handle')
    }
  }
})