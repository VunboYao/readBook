export class EventTrack {
  constructor(options = {}) {
    this.initConfig = {
      screen_height: document.documentElement.clientHeight || window.screen.height,
      screen_width: document.documentElement.clientWidth || window.screen.width,
      // 定时发送
      interval: options?.send_interval || 5000,

    }
    this.getPerformanceInfo()
  }

  getPerformanceInfo() {
    const P = window.performance.getEntries()
  }
}
