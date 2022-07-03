
class SlideRuler {
  constructor(options = {}) {
    this.value = ''
    this.options = {
      canvasWidth: document.body.clientWidth || 375, // 尺子宽度
      canvasHeight: 80, // 尺子高度
      heightDecimal: 15, // 长刻度线高度
      heightDigit: 10, // 刻度线高度
      lineWidth: 2, // 刻度线宽度
      colorDecimal: '#f0f', // 长刻度线颜色
      colorDigit: '#f0f',
      divide: 10, // 两个刻度之间的像素宽度
      precision: 1000, // 最小刻度单位
      fontSize: 16, // 刻度字体大小
      fontColor: '#666', // 刻度字体颜色
      fontMarginTop: 30, // 刻度字体与底边界距离
      maxValue: 200000, // 最大值
      minValue: 2000, // 最小值
      currentValue: 3000, // 尺子当前值
    }

    if (!options.el) {
      throw new Error('el 挂载元素不存在')
    }

    // 存储当前状态
    this.localeState = {
      startX: 0,
      startY: 0,
      isTouchEnd: true,
      touchPoints: []
    }

    // 移动端事件
    this.browserEnv = window.hasOwnProperty('ontouchstart')
    this.options = { ...this.options, ...options }
    this.init(this.options)
  }

  /**
   * 初始化渲染
   * @param options
   */
  init(options) {
    this._renderBox(options.el)
  }

  /**
   * 渲染容器，将canvas挂载到el上
   * @param el
   * @private
   */
  _renderBox(el) {
    const box = document.createElement('div')
    const canvas = document.createElement('canvas')
    this.canvas = canvas
    box.className = 'x' // 固定的值标
    box.appendChild(canvas)
    el.appendChild(box)
    this._renderCanvas()
  }

  /**
   * canvas初始化处理，绑定touch事件
   * @private
   */
  _renderCanvas() {
    const {canvasWidth, canvasHeight} = this.options
    const canvas = this.canvas
    canvas.width = canvasWidth * 2
    canvas.height = canvasHeight * 2
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.className = 'canvas'

    // 绑定移动端touch事件
    if (this.browserEnv) {
    //   canvas.ontouchstart = this.touchStart.bind(this)
    //   canvas.ontouchmove = this.touchMove.bind(this)
    //   canvas.ontouchend = this.touchEnd.bind(this)
    // } else {
    //   canvas.onmousedown = this.touchStart.bind(this)
    //   canvas.onmousemove = this.touchMove.bind(this)
    //   canvas.onmouseup = this.touchEnd.bind(this)
    }

    this.drawCanvas()
  }

  /**
   * 绘制canvas图形
   */
  drawCanvas() {
    const canvas = this.canvas
  }
}
