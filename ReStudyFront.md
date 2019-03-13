# HTML
## H5新标签使用
- section 标签会改变 h1-h6的语义。section 的嵌套会使得其中的 h1-h6 下降一级
- header, 如其名，通常出现在前部，表示导航或者介绍性的内容。
- footer, 通常出现在尾部，包含一些作者信息、相关链接、版权信息等
> header 和 footer 一般都是放在 article 或者 body 的直接子元素，但是标准中并没有明确规定， footer 也可以和 aside, nav,section 相关联。 
- aside 表示跟文章主体不那么相关的部分，可能包含导航、广告等工具性质的内容。  
> aside 很容易被理解为侧边栏，实际上二者时包含关系，侧边栏是 aside，aside 不一定是侧边栏    

> aside 和 header 中都可能出现导航（nav 标签），二者的区别是，header 中的导航多数是到文章自己的目录，而 aside 中的导航多数是到关联页面或者整站地图。     
- address，定义文档或文章的作者联系信息。一般在 footer 元素中。一般只关联到 article 和 body
- dl 标签定义了定义列表（definition list).结合 dt（定义列表中的项目）和 dd（描述列表中的项目）

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
