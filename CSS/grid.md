# 属性一览

## Grid Container
- display: grid | inline-grid
- grid-template-columns: 空格定义网格列
- grid-template-rows: 空格定义网格行
- grid-template-areas: 网格模板
- grid-template: rows / columns
- (grid)-column-gap: 列间距
- (grid)-row-gap: 行间距
- (grid)-gap: 行/列 间距缩写
- justify-items: 网格项水平 stretch|start|center|end
- align-items: 网格项垂直 stretch|start|center|end
- place-items: align-items/justify-items 简写
- justify-content: 网格在网格容器中的水平位置
- align-content: 网格在网格容器中的垂直位置
- grid-auto-columns: 设置隐式网格的列大小
- grid-auto-rows: 设置隐式网格的行大小
- grid-auto-flow: row | column | dense | row dense | column dense
- grid: grid-template-rows, gird-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns,和 grid-auto-flow 简写

## 子元素 网格项(Grid Items)属性

- grid-column-start
- grid-column-end
- grid-row-start
- grid-row-end
- grid-column: start-line / end-line 
- grid-row: start-line / end-line 
- grid-area: 'header'  网格模板名称
- justify-self: 单元格内水平位置
- align-self: 单元格内垂直位置
- place-self: 单元格位置简写

# Grid 布局指南

CSS Grid 布局是一个二维布局系统, 可以同时处理列和行. 通过将 CSS 规则应用于 **父元素**(成为 Grid Container 网格容器)和其 **子元素** (成为 Grid Items 网格项), 即可轻松使用 Grid 布局.

## 网格容器 (Grid Container)

- 应用 **display: grid** 的元素. 所有 网格项 (grid item) 的直接父元素. 并建立新的网格格式上下文
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
- Grid lines 名称可以随意定制 网格线名称**中括号语法**
- 如果多行共享相同的名称, 则可以通过其网格线名称和计数来引用它们. `grid-column-start: col-start 2`, 等价于 列名为 col-start 的第 2 条
- grid-template-columns:  none/track-list/auto-track-list 控制列数
- grid-template-rows:  none/track-list/auto-track-list 控制行数
- **可以通过minmax(a, b)** 来填充值. a 为最小值, b 为最大值. 如果 max 小于 min, 最小值将被用于固定宽度. 也可以使用 calc(100% - sum), 但当其他值改变时, 这个方式仍旧不是最佳.

# Fractional units (部分单元)
- fr 等分可用空间
- fr 不能放在 minmax 的 min 上.
- minmax(minimum, maximum) 如果 min 大于 max, 锁定 min 值.

# Content-aware tracks (内容感知轨道)
- min-content
- max-content
- fit-content 相比 minmax 更友好.

# Repeating Grid Lines
- repeat(tracks num, width), 可以与网格中其他的值组合.
- **不能 nest a repeat inside another repeat**

## Auto-filling tracks

> There’s even a way to set up a simple pattern and repeat it until the grid container is filled

- repeat(auto-fill, minmax(200px, 1fr))
- only one auto-repeat in a given track template
- With **auto-fill**, you will always get at least one repetition of the track template.
- 当实际网格内容的宽度不足网格总宽度时,用 **auto-fit**自适应网格总宽度.实现灵活伸缩.

# Grid Areas

```css
#grid {
    display: grid;
    grid-template-areas:
        "h h h h"
        "l c c r"
        "l f f f" 
}  
```
- the name( h === header ) is not only one;
- they describe a **rectangular shape**! If you try to set up more **complicated** areas, the entire template is invalid.
- uppercase and lowercase are difference
- 如果定义一部分区域, 其余区域空白, 用 **one or more . characters** to fill in
- 如果设定的 column 大于 area 中设定的数量, 将留下多余的网格

# Attaching Elements to the Grid

## Using Column and Row Lines

- grid-row-start: 行开始位置 
- grid-row-end: 行结束位置
- grid-column-start: 列开始位置
- grid-column-end: 列结束位置
- **如果忽略了结束位置, 则默认下一个网格线是结束位置**
- 结束位置可以用 **span number**来描述, 跨越的网格轨道数量. 省略 number 则默认为 1; 不能设置 0 或者 负数. 

- span 可以用于 ending and starting gird lines. 如果定义了 start grid lines and set the ending grid line to be a span value, it will search toward the end of the grid. If you define an ending grid line and make the start line a span value, then it will search toward the start of the grid.
- 与 span 相反, 设置 **grid-line values 可以为负值**. 当设置一个值在右下角时,可以如下设置
    ```
      grid-column-end: -1;        
      grid-row-end: -1; 
      or
      grid-column-start: -2;       
      grid-row-start: -2;       
    ```
- 可以通过命名 grid-lines 来设置相应的值.
   ```css
   		.wrapper {
   			display: grid;
   			/* 创建5行, name 为 R, 高为 4em */
   			grid-template-rows: repeat(5, [R] 4em);
   			/* 创建开头为 2em 宽, 重复5次, 相应名称及宽度 最后 2em 宽. 总12列*/
   			grid-template-columns: 2em repeat(5, [col-A] 5em [col-B] 5em) 2em;
   		}
   		div.item1 {
   			/* R 2 开始 */
   			grid-row-start: R 2;
   			/* 第5行结束 */
   			grid-row-end: 5;
   			/* col-B 列开始 */
   			grid-column-start: col-B;
   			/* 跨域 2 列 */
   			grid-column-end: span 2;
   			background: #00B83F;
   		}
   		div.item2 {
   			background: #1b3650;
   			/* 行 R 开始 */
   			grid-row-start: R;
   			/* 跨 R 2行 */
               grid-row-end: span R 2;
   			/* 第三个 col-A 开始*/
   			grid-column-start: col-A 3;
   			/* 跨越名为 col-A 的 2次 */
   			grid-column-end: span col-A 2;
   		}
   		div.item3 {
   			background: red;
   			/* 4行开始 */
   			grid-row-start: 4;
   			/* 倒数第 2 列 col-A 开始 */
   			grid-column-start: col-A -2;
 			/* 均没有结束值,所有默认 set to span 1 */
   		} 
   ```
![](http://www.vunbo.com/usr/uploads/2019/04/1412658525.png)

- 可以通过 area 设定的区域标识符名称来设置 grid lines 名称. 因为显示创建的 grid-template-areas, 会隐式的创建以 -start 和 -end 结尾的 grid lines.

# Row and Column Shorthands
- grid-row: 行的简写 start grid line / \[end grid line\]
- gird-column: 列的简写 
- 省略一个值时, 两个值一样

# grid-column-gap / grid-row-gap 

- 指定网格线的大小. 可以想象为设置列/行之间间距的宽度.
- 只能在 列/行 之间创建间距, 网格外部边缘不会有这个间距
- **高版本浏览器(Chrome 68+)支持 row-gap/column-gap 无前缀**

## grid-gap 简写
- grid-gap: row-gap / column-gap 
- 如果column-gap 没有设置, 即一个单位时, 行/列 的间距相等.
- **高版本浏览器(Chrome 68+)支持 gap 无前缀**

# justify-items

水平对齐方式
- start: 将网格项对齐到其单元格的左侧起始边缘 (左侧对齐)
- end: 将网格项对齐到其单元格的右侧结束边缘 (右侧对齐)
- center: 将网格项对齐到其单元格的水平中间位置 (水平居中)
- stretch: 拉伸填满单元格宽度

# align-items

垂直对齐方式
- start: 将网格项对齐到其单元格的顶部起始边缘 (顶部对齐)
- end: 将网格项对齐到其单元格的底部结束边缘 (底部对齐)
- center: 将网格项对齐到其单元格的垂直中间位置 (垂直居中)
- stretch: 拉伸填满单元格高度
 
 

# place-items
- 设置 align-items 和 justify-items 的简写形式
- 第一个值为 align-items
- 省略第二个值则同时分配给这两个属性

# justify-content
- 当网格合计小于网格容器大小时, 控制网格在 网格容器(grid container) 中的水平位置
- start: 居左
- end: 居右
- center: 水平居中
- stretch: 拉伸填充宽度
- space-around: 中间均匀,左右一半
- space-between: 中间均因,左右没有空间
- space-evenly: 中间均匀,左右均匀

# align-content
- 当网格合计小于网格容器大小时, 控制网格在 网格容器(grid container) 中的垂直位置
- start: 顶部
- end: 底部
- center: 垂直居中
- stretch: 拉伸填充高度
- space-around: 中间均匀,上下一半
- space-between: 中间均因,上下没有空间
- space-evenly: 中间均匀,上下均匀

# place-content
- 设置 align-content 和 justify-content 的简写形式
- 第一个值设置 align-content 属性.
- 省略第二个值, 则将第一个值分配给第二个值

# grid-auto-columns

创建隐式网格列的大小

# grid-auto-rows

创建隐式网格行的大小

# grid-auto-flow

如果有一些没有明确放置在网格上的网格项(grid items), **自动防止算法** 会自动放置这些网格项. 该属性控制自动布局算法如何工作.
- row: 自动布局算法一次填充每行, 根据需要添加新行(默认)
- column: 自动布局算法一次填充每列, 根据需要添加新列
- dense: 告诉自动布局算法在稍后出现较小的网格项时，尝试填充网格中较早的空缺

# grid
- grid-template-rows, gird-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns,和 grid-auto-flow 简写
- none: 所有属性设置为初始值
- gird: rows / columns

# grid-column-start /  grid-column-end / grid-row-start / grid-row-end

通过引用特定网格线(grid lines)来确定 网格项(grid items)在网格内的位置.grid-column-start / grid-row-start 是网格项开始的网格线, grid-column-end / grid-column-end 是网格项结束的网格线
- <line\>: 可以是一个数字引用一个编号的网格线, 或者一个名字来引用一个命名的网格线
- span <number>: 该网格项将跨越所提供的网格轨道数量
- span <name>: 该网格项将跨越到它与提供的名称位置
- auto: 表示自动放置，自动跨度，默认会扩展一个网格轨道的宽度或者高度

> 如果没有声明指定 grid-column-end / grid-row-end, 默认情况下, 该网格项将占据1个轨道. 项目可以相互重叠, 可以使用 z-index 来控制它们的重叠顺序

# grid-column / grid-row
 
- grid-column-start + grid-column-end 和 grid-row-start + grid-row-end 的简写形式
- start-line / end-line
- 没有声明分割线结束位置, 则默认占据 1 个网格轨道

# grid-area

为网格项提供一个名称，以便可以 被使用网格容器 grid-template-areas 属性创建的模板进行引用。 另外，这个属性可以用作grid-row-start + grid-column-start + grid-row-end + grid-column-end 的简写。
- <name\>: 名称
- <row-start\> / <column-start\> / <row-end\> / <column-end\>：数字或分隔线名称

# justify-self

水平方向设置单个网格项内的内容位置.
- start: 将网格项对齐到其单元格的左侧起始边缘 (左侧对其)
- end: 右侧对齐
- center: 水平居中
- stretch: 宽度拉伸 (默认值)

# align-self

垂直方向设置单个网格项内的内容位置
- start: 将网格项对齐到其单元格的顶部起始边缘 (顶部)
- end: 底部对齐
- center: 垂直居中
- stretch: 高度拉伸 (默认值)

# place-self
 
 设置 align-self 和 justify-self 的简写方式
 - auto: 布局模式的 '默认' 对齐方式
 - 第一个值设置 align-self 属性
 - 省略第二个值, 则将第一个值同时分配给这两个属性
 
 # 动画
 
根据 CSS Grid 布局模块的 Level 1 规范, 有 5 个可应用动画的网格属性:
- grid-gap, grid-row-gap, grid-column-gap 作为长度, 百分比或 calc
- grid-template-columns, grid-template-rows 作为长度, 百分比或 calc 的简单列表, 只要列表中长度, 百分比或 calc 组件的值不同即可
