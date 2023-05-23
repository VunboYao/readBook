// app.js
App({
  /**
   * 全局数据
   */
  globalData: {
    //右上角胶囊数据
    menuButtonBoundingClientRect: null,
    //手机系统数据
    systemInfo: null,
    // 是否有刘海
    hasFringe: false,
    // 导航栏高度.systemInfo.statusBarHeight + 44
    navHeight: 0
  },

  onLaunch() {
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
    this.globalData.navHeight = statusBarHeight + 44
  },

  /**
   * 获取右上角胶囊数据
   */
  getMenuButtonBoundingClientRect() {
    this.globalData.menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect();
  }
})
