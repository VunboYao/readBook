# canvas学习

## Canvas 基本概念

- canvas 默认宽度 **300px**, 默认高度 **150px**
- 与 img 元素很像，但没有 src 和 alt 属性
- 如果没有设置任何样式规则，其将会完全透明

### 替换内容

- 兼容方案：在 canvas 标签中提供替换内容

### `</canvas>` 标签不可省

- 如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来

### 渲染上下文

- 获取 canvas 上下文, **`canvas.getContext('2d')`**

  ```js
  <canvas></canvas>
  <script>
    let oCanvas = document.querySelector('canvas');
    let oCtx = oCanvas.getContext('2d');
  </script>
  ```

- **不能通过 CSS 样式修改 canvas 宽高, 会拉伸内容**

  ```html
  <canvas width="500" height="500"></canvas>
  ```

## 绘制图形

### 绘制矩形

- fillRect(x, y, width, height)
  - 绘制一个填充的矩形
- strokeRect(x, y, width, height)
  - 绘制一个矩形的边框
- clearRect(x, y, width, height)
  - 清除指定矩形区域，让清除部分完全透明

### 绘制路径

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。路径都是闭合的。

1. 首先，需要创建路径起始点
2. 然后使用画图命令去画出路径
3. 闭合路径
4. 路径生成后，通过描边或填充路径区域来渲染图形

- beginPath()：新建一条路径，生成后，图形绘制命令被指向到路径上生成路径
- closePath():闭合路径之后图形绘制指令重新指向到上下文中
- stroke():通过线条来绘制图形轮廓
- fill():通过填充路径的内容区域生成实心的图形

1. 生成路径的第一步叫做 beginPath()。 列表清空重置，可以开始重新绘制新的图形。
> 注意：当前路径为空，即调用 beginPath() 之后，第一条路径构造命令通常被视为是 moveTo()。 出于这个原因，必须在设置路径之后专门指定你的起始位置。
2. 调用函数指定绘制路径 lineTo()
3. 闭合路径 closePath()，不是必需的。 该方法会通过绘制一条从当前点到开始点的直线来闭合路径。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做
> 注意：调用 fill() 函数，所有没有闭合的形状都会自动闭合，不需要调用 closePath() 函数。 但是调用 stroke() 时不会自动闭合

- 线条默认宽度和颜色

  通过 canvas 绘制的线条默认宽度是 1px, 颜色是纯黑色. 但由于**默认情况下 canvas 会将线条的中心点和像素的底部对齐, 所以会导致显示效果是2px和非纯黑色问题**

  ```js
  let oCanvas = document.querySelector('canvas');
  let oCtx = oCanvas.getContext('2d');
  oCtx.moveTo(50,50.5); // 解决 1px 问题
  oCtx.lineTo(200,50.5);
  oCtx.stroke();
  ```

- 获取 canvas 的宽高, `ctx.canvas.width/height`

## 线

- `ctx.lineWidth` 设置线条高度, Number
- `ctx.strokeStyle` 设置线条颜色
- `ctx.lineCap` 设置线条两端的样式
  - `butt`, 默认
  - `round`, 左右各一个半圆
  - `square`, 左右各一个方块
- `ctx.moveTo(x,y)`, 移到新的位置
- `ctx.lineTo(x,y)`, 添加一个新点(该方法并不会创建线条)
- `ctx.stroke()`, 绘制路径
- `rect(x,y,width,height)`，绘制一个左上角坐标为(x,y), 宽高为 width 和 height的矩形

## 圆弧

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`
  - 以 (x, y) 为圆心的， 以 radius 为半径的圆弧（圆），从 startAngle 角度到 endAngle 角度结束，按照 anti clockwise 给定的方向来生成(默认为顺时针)
  - x, y 为绘制圆弧所在圆上的圆心坐标；
  - radius 为半径；
  - startAngle 和 endAngle 参数用弧度定义了开始以及结束的弧度；
  - anticlockwise(逆时针方向) 为一个布尔值，默认顺时值(false)
  - `arc()`函数中表示角的单位是弧度，不是角度。
  - 角度与弧度的 JS 表达式：弧度 = (Math.PI / 180) * 角度

## 样式和颜色

- fillStyle: 设置图形的填充颜色
- strokeStyle: 设置图形轮廓的颜色
- 颜色标准值：
  - “orange"
  - "#ffa500"
  - "rgb(255,255,0)"
  - "rgba("255,255,0,1)"

> 注意：一旦设置了strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置 fillStyle 或 strokeStyle 的值

## 线型

- `lineWidth = value`，设置线条宽度
  - 线宽是指给定路径的中心到两边的粗细。换句话说就是在路径的两边各绘制线宽的一半。因为画布的坐标并不和像素直接对应，当需要获得精确的水平或垂直线是需要特别注意
  - 线宽单位1.0, 如果遍历10以内的线，所有宽度为奇数的线并不能精确呈现，这就是因为路径的定位问题。
  - **线宽以中心点绘制，两边分别延伸各一半像素，而这个像素又会以近似的方式进行渲染，意味着那些像素只是部分着色，结果就是以实际笔触颜色一半色调的颜色来填充整个区域，导致 1.0的线并不准确**
- `lineCap = type`，设置线条末端的样式
  - `butt` 默认，与垂直线水平
  - `round` 端点处加上了半径为一半线宽的半圆
  - `square` 端点处加上了等宽且高度为一半线宽的方块
- `lineJoin = type`， 设置线条与线条间接合处的样式
  - `miter`, 默认(斜切)
  - `round`, 圆角
  - `bevel`, 斜角
- `miterLimit = value`，限制当两条线相交时交界处最大长度；所谓交接处长度（斜接长度）指线条交界处内角顶点到外角顶点的长度
- `getLineDash()`，返回一个包含当前虚线样式，长度为非负偶数的数组
- `setLineDash(setments)`，设置当前虚线样式
- `lineDashOffset = value`，设置虚线样式的起始偏移量

## 虚线

- `ctx.setLineDash([5,2])`, 设置虚线的间隔
- `ctx.getLineDash()`, 获取虚线中的不重复数组
- `ctx.lineDashOffset`, 设置虚线的偏移 **Number**

## 渐变

- [`createLinearGradient(x1, y1, x2, y2)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient) 方法接受 4 个参数， 表示渐变的起点(x1, y1) 与 终点 (x2, y2)
- [`createRadialGradient(x1, y1, r1, x2, y2, r2)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)方法接受 6 个参数， 前三个定义一个以(x1, y1)为原点，半径为 r1 的圆，后三个参数则定义另一个以(x1,y2)为原点， 半径为 r2 的圆
- `gradient.addColorStop（position, color)`接受 2 个参数， position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。如：0.5表示颜色会出现在正中间。

## 绘制文本

- `fillText(text, x, y, [, maxWidth])`在指定的(x, y)位置填充特定的文本，绘制的最大宽度是可选的
- `strokeText(text, x, y, [, maxWidth])`, 绘制文本边框

# 图形绘制

- **`ctx.beginPath()`**, 重新开启路径
- `ctx.closePath()`, 闭合路径

# 填充图形

- `ctx.fill()`, 填充图形
- `ctx.fillStyle`, 填充颜色

# 非零环绕规则

- 遇到顺时针 + 1
- 遇到逆时针 - 1
- 结果是 0 则不填充颜色
