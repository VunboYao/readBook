# Grid 布局指南

CSS Grid 布局是一个二维布局系统, 可以同时处理列和行. 通过将 CSS 规则应用于 **父元素**(成为 Grid Container 网格容器)和其 **子元素** (成为 Grid Items 网格项), 即可轻松使用 Grid 布局.

## 网格容器 (Grid Container)

- 应用 **display: grid** 的元素. 所有 网格项 (grid item) 的直接父元素.
- 浮动不能覆盖 grid 布局
- grid 布局 margin 不会与后代元素的 margin collapse(塌方/重合)

### not apply to grid containers
- All column properties
- The ::first-line and ::first-letter pseudo-elements
- ignore float and clear
- vertical-align property has no effect on grid items, but may effect the content inside the grid item

> If grid declared inline-grid and the element is either floated or absolutely positioned, the computed value of display becomes grid (thus dropping inline-grid)

# Basic Grid Terminology (术语)

> A grid container is a box that establishes a grid-formatting context. The grid like nature of tables, the comparison(对比) is fairly(相当) apt(惬当), but be sure not to make the assumption(假设) that grids are just tables in another form. Grids are far more powerful than tables.

![summarized](http://www.vunbo.com/usr/uploads/2019/04/2108055330.png)

The most fundamental(基本) unit is the grid line. By defining the placement(安置) of one or more grid lines, you implicitly(隐式) create the rest of the gird's components:
- 网格轨道(track)位于相邻两条网格线(grid line)之间, 大小取决于网格线定义的位置.
- 网格单元(grid cell)由四条网格线限定的空间, 没有网格线穿过其中. 是 grid 布局中最小的单元. 不能通过 CSS grid properties 定义
- 网格区域(area) 是由四条网格线组成的矩形区域, 可以由 CSS grid properties 定义区域并与单元格关联.

# Placing Grid Lines
- Grid lines 名称可以随意定制
- grid-template-columns:  none/track-list/auto-track-list 控制列数
- grid-template-rows:  none/track-list/auto-track-list 控制行数
- **可以通过minmax(a, b)** 来填充值. a 为最小值, b 为最大值. 如果 max 小于 min, 最小值将被用于固定宽度. 也可以使用 calc(100% - sum), 但当其他值改变时, 这个方式仍旧不是最佳.

# Fractional units (部分单元)
- fr 等分可用空间
- fr 不能放在 minmax 的 min 上.
- minmax(minimum, maximum) 如果 min 大于 max, 锁定 min 值.








