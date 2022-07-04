class SlideRuler {
  constructor(options = {}) {
    this.value = ''
    this.options = {
      // 尺子宽度
      canvasWidth: document.body.clientWidth || 375,
      // 尺子高度
      canvasHeight: 80,
      // 长刻度线高度
      heightDecimal: 18,
      // 刻度线高度
      heightDigit: 10,
      // 刻度线宽度
      lineWidth: 1.5,
      // 长刻度线颜色
      colorDecimal: '#f0f',
      // 刻度线颜色
      colorDigit: '#e4e4e4',
      // 两个刻度之间的像素宽度
      divide: 10,
      // 最小刻度单位
      precision: 1000,
      // 刻度字体大小
      fontSize: 11,
      // 刻度字体颜色
      fontColor: '#666',
      // 刻度字体与底边界距离
      fontMarginBottom: 20,
      // 最大值
      maxValue: 200000,
      // 最小值
      minValue: 2000,
      // 尺子当前值
      currentValue: 4000,
    }

    if (!options.el) {
      throw new Error('el 挂载元素不存在')
    }

    // 存储当前状态
    this.localeState = {
      startX: 0,
      startY: 0,
      isTouchEnd: true,
    }

    // 是否有移动端事件
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
    box.className = 'x'
    box.appendChild(canvas)
    el.appendChild(box)
    this._renderCanvas()
  }

  /**
   * canvas初始化处理，绑定touch事件
   * @private
   */
  _renderCanvas() {
    const { canvasWidth, canvasHeight } = this.options
    const canvas = this.canvas
    canvas.width = canvasWidth * 2
    canvas.height = canvasHeight * 2
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    canvas.className = 'canvas'

    // 绑定移动端touch事件
    if (this.browserEnv) {
      canvas.ontouchstart = this.touchStart.bind(this)
      canvas.ontouchmove = this.touchMove.bind(this)
      canvas.ontouchend = this.touchEnd.bind(this)
    } else {
      canvas.onmousedown = this.touchStart.bind(this)
      canvas.onmousemove = this.touchMove.bind(this)
      canvas.onmouseup = this.touchEnd.bind(this)
    }

    this.drawCanvas()
  }

  /**
   * touchStart: 存储触摸点初始信息
   * @param e
   */
  touchStart(e) {
    e.preventDefault()
    if (e || this.localeState.isTouchEnd) {
      const touch = (e.touches && e.touches[0]) || e
      this.localeState.startX = touch.pageX
      this.localeState.startY = touch.pageY
      // 开始滑动
      this.localeState.isTouchEnd = false
    }
  }

  /**
   * 移动判断：1.兼容判断 2.计算移动距离 => 3.绘画
   * @param e
   */
  touchMove(e) {
    // 兼容处理，非移动端，鼠标左键兼容判断
    if (!this.browserEnv && (e.which !== 1 || e.buttons === 0)) { return }
    const touch = (e.touches && e.touches[0]) || 0
    // 计算移动距离
    const deltaX = touch.pageX - this.localeState.startX
    const deltaY = touch.pageY - this.localeState.startY
    // 如果 X 方向上的位移大于 Y 方向，则认为是左右滑动
    const isX = Math.abs(deltaX) > Math.abs(deltaY)
    // 移动距离超过 1 刻度
    const isCanMove = Math.abs(Math.round(deltaX / this.options.divide)) > 0
    if (isX && isCanMove) {
      // 绘制
      this.moveDraw(deltaX)
      this.localeState.startX = touch.pageX
      this.localeState.startY = touch.pageY
    }
  }

  /**
   * touchEnd 后更新视图，恢复初始状态
   * @param e
   */
  touchEnd(e) {
    this.moveDraw(0)
    this.localeState.isTouchEnd = true
    this.canvas.style.transform = 'translate3d(0,0,0)'
  }

  /**
   * 外部操作方法：步长+1
   * @param step
   */
  stepAdd(step = 1) {
    const { precision } = this.options
    const draw = () => {
      this.options.currentValue += Math.sign(step) * precision
      this.drawCanvas()
    }
    window.requestAnimationFrame(draw)
  }

  /**
   * 外部操作方法：步长-1
   * @param step
   */
  stepReduce(step = -1) {
    const { precision } = this.options
    const draw = () => {
      this.options.currentValue += Math.sign(step) * precision
      this.drawCanvas()
    }
    window.requestAnimationFrame(draw)
  }

  /**
   * 根据横向移动距离，计算出需要移动的刻度数
   * @param shift
   */
  moveDraw(shift) {
    // 刻度之间的距离， 最小刻度单位
    const { divide, precision } = this.options
    // 计算出最终的移动距离 = 移动距离 / 每个刻度的距离 （右滑动,是递减过程）
    const moveValue = Math.round(-shift / divide)
    let _moveValue = Math.abs(moveValue)
    const draw = () => {
      if (_moveValue < 1) { return }
      // 获取moveValue的正负标志，计算移动的距离值
      this.options.currentValue += Math.sign(moveValue) * precision
      this.drawCanvas()
      window.requestAnimationFrame(draw)
      _moveValue--
    }

    draw()
  }

  /**
   * 绘制canvas图形
   */
  drawCanvas() {
    const canvas = this.canvas
    const context = canvas.getContext('2d')
    // 重置画布的高度，当前画布内容会被移除 同 clearRect()
    canvas.height = canvas.height
    let {
      canvasWidth,
      canvasHeight,
      currentValue,
      minValue,
      maxValue,
      precision,
      divide,
      // 处理返回结果
      handleValue,
      heightDecimal,
      colorDecimal,
      colorDigit,
      heightDigit,
      lineWidth,
      fontSize,
      fontColor,
      fontMarginBottom,
    } = this.options
    // 当前值的边界判断，不能小于最小值，不能大于最大值
    currentValue = currentValue > minValue
      ? currentValue < maxValue
        ? currentValue
        : maxValue
      : minValue
    // 计算出基于最小刻度单位的整数
    currentValue = (Math.round((currentValue * 10) / precision) * precision) / 10
    this.options.currentValue = currentValue
    // 将value暴露给外界
    handleValue && handleValue(currentValue)
    // 与最小值的真实距离: 差值 / 1000 * 10
    const diffCurrentMin = ((currentValue - minValue) / precision) * divide
    let startValue = currentValue - Math.floor(canvasWidth / 2 / divide) * precision
    startValue = startValue > minValue
      ? startValue < maxValue
        ? startValue
        : maxValue
      : minValue
    let endValue = startValue + (canvasWidth / divide) * precision
    endValue = endValue < maxValue ? endValue : maxValue
    // 起始点
    const origin = {
      // 真实值 > canvasWidth
      x: diffCurrentMin > canvasWidth / 2
        // 375 - 差值
        ? (canvasWidth / 2 - ((currentValue - startValue) / precision) * divide) * 2
        : (canvasWidth / 2 - diffCurrentMin) * 2,
      y: canvasHeight * 2,
    }
    // 定义刻度线样式
    heightDecimal = heightDecimal * 2
    heightDigit = heightDigit * 2
    lineWidth = lineWidth * 2
    // 定义刻度字体样式
    fontSize = fontSize * 2
    fontMarginBottom = fontSize * 2
    // 定义每个刻度所占位的px
    divide = divide * 2
    // 定义每个刻度的精度
    const derivative = 1 / precision

    for (
      let i = Math.round((startValue / precision) * 10) / 10;
      i <= endValue / precision;
      i++
    ) {
      context.beginPath()
      const drawX = origin.x + (i - startValue / precision) * divide
      // 初始点
      context.moveTo(drawX, canvasHeight * 2)
      // 画刻度线
      context.lineTo(
        drawX,
        i % 10 === 0 ? canvasHeight * 2 - heightDecimal : canvasHeight * 2 - heightDigit,
      )
      context.lineWidth = lineWidth
      context.strokeStyle = i % 10 === 0 ? colorDecimal : colorDigit
      context.stroke()

      // 描绘刻度值
      context.fillStyle = fontColor
      context.textAlign = 'center'
      context.textBaseline = 'bottom'
      if (i % 10 === 0) {
        context.font = `${fontSize}px Arial`
        context.fillText(
          Math.round(i / 10) / (derivative / 10),
          drawX,
          canvasHeight * 2 - fontMarginBottom,
        )
      }
      context.closePath()
    }
  }
}
