// app.js
App({
  /**
   * 全局数据
   */
  globalData: {
    menuButtonBoundingClientRect: null, //右上角胶囊数据
    systemInfo: null, //手机系统数据
    hasFringe: false, // 是否有刘海
  },

  onLaunch(options) {
    this.getSystemInfo();
    this.getMenuButtonBoundingClientRect();
  },
  /**
   * 获取手机系统数据
   */
  getSystemInfo() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systemInfo = res;
        this.setSafeArea();
      }
    })
  },

  /**
   * 设置安全域
   */
  setSafeArea() {
    const {
      system,
      statusBarHeight
    } = this.globalData.systemInfo;
    if (system.startsWith('iOS') && statusBarHeight >= 44) {
      this.globalData.hasFringe = true
    }
  },

  /**
   * 获取右上角胶囊数据
   */
  getMenuButtonBoundingClientRect() {
    this.globalData.menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect();
  },
})
