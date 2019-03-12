# HTML


# CSS
## 图片底部缝隙
- **产生原因：图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐(即默认vertical-align: baseline)。这样会造成一个问题，就是图片底侧会有一个空白缝隙**
- 父级fontSize: 0;
- 图片行内元素转换为块级元素：display: block
- img 设置底线对齐方式。vertical-align: top | bottom | middle

## border-radius
- 当边框圆角的值 > 边框宽度的时候，外边框和内边框都会变成圆角
- 当边框圆角 <= 外边框宽度的时候，外边框是圆角，内边框是直角
- 圆角接受两个参数：水平 垂直（省略则都为同一个值）。椭圆各为宽高一半


# JavaScript
