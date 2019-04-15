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






