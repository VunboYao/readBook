# Canvas 基本概念

- canvas 默认宽度 **300px**, 默认高度 **150px**

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

# 线条属性

- `ctx.lineWidth` 设置线条高度, Number
- `ctx.strokeStyle` 设置线条颜色
- `ctx.lineCap` 设置线条两端的样式
  - `butt`, 默认
  - `round`, 左右各一个半圆
  - `square`, 左右各一个方块
- `ctx.moveTo(x,y)`, 移到新的位置
- `ctx.lineTo(x,y)`, 添加一个新点(该方法并不会创建线条)
- `ctx.stroke()`, 绘制路径

## 虚线

- `ctx.setLineDash([5,2])`, 设置虚线的间隔
- `ctx.getLineDash()`, 获取虚线中的不重复数组
- `ctx.lineDashOffset`, 设置虚线的偏移 **Number**

# 图形绘制

- **`ctx.beginPath()`**, 重新开启路径

- `ctx.closePath()`, 闭合路径
- `ctx.lineJoin`, 设置路径拐点的样式
  - `miter`, 默认(斜切)
  - `round`, 圆角
  - `bevel`, 斜角

# 填充图形

- `ctx.fill()`, 填充图形
- `ctx.fillStyle`, 填充颜色

# 非零环绕规则

- 遇到顺时针 + 1
- 遇到逆时针 - 1
- 结果是 0 则不填充颜色