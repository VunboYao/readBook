# HTML
## H5新标签使用
- section 标签会改变 h1-h6的语义。section 的嵌套会使得其中的 h1-h6 下降一级
- header, 如其名，通常出现在前部，表示导航或者介绍性的内容。
- footer, 通常出现在尾部，包含一些作者信息、相关链接、版权信息等
> header 和 footer 一般都是放在 article 或者 body 的直接子元素，但是标准中并没有明确规定， footer 也可以和 aside, nav,section 相关联。
- aside 表示跟文章主体不那么相关的部分，可能包含导航、广告等工具性质的内容。
> aside 很容易被理解为侧边栏，实际上二者是包含关系，侧边栏是 aside，aside 不一定是侧边栏
- aside 和 header 中都可能出现导航（nav 标签），二者的区别是，header 中的导航多数是到文章自己的目录，而 aside 中的导航多数是到关联页面或者整站地图。
- address，定义文档或文章的作者联系信息。一般在 footer 元素中。一般只关联到 article 和 body
- dl 标签定义了定义列表（definition list).结合 dt（定义列表中的项目）和 dd（描述列表中的项目）

# CSS

## iPhone底部 tabBar 横线处理

- ```css
  padding-bottom: env(safe-area-inset-bottom);// 底部安全距离
  ```

- fixed 吸底时(bottom:0), height上更改. height: calc(height + env(safe-area-inset-bottom))

## 最新适配方案: vm + rem + calc

媒体查询适配字体, vm 设置单位, rem 设置字体大小

```css
 html {
    font-size: 16px;
}
@media screen and (min-width: 375px) {
    html {
        /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
        font-size: calc(100% + 2 * (100vw - 375px) / 39);
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
        font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 600px) {
    html {
        /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
        font-size: calc(125% + 4 * (100vw - 600px) / 400);
        font-size: calc(20px + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 1000px往后是每100像素0.5px增加 */
        font-size: calc(137.5% + 5 * (100vw - 1000px) / 1000);
        font-size: calc(22px + 5 * (100vw - 1000px) / 1000);
    }
}
```

## 图片底部缝隙
- **产生原因：图片或者表单等行内块元素，他的底线会和父级盒子的基线对齐(即默认vertical-align: baseline)。这样会造成一个问题，就是图片底侧会有一个空白缝隙**
- 父级fontSize: 0;
- 图片行内元素转换为块级元素：display: block
- img 设置底线对齐方式。vertical-align: top | bottom | middle

## border-radius
- 当边框圆角的值 > 边框宽度的时候，外边框和内边框都会变成圆角
- 当边框圆角 <= 外边框宽度的时候，外边框是圆角，内边框是直角
- 圆角接受两个参数：水平 垂直（省略则都为同一个值）。椭圆各为宽高一半

## object-fit
属性|介绍
---|---
fill|被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框
contain|被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”
cover|被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。
none|被替换的内容将保持其原有的尺寸。
scale-down|内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

## 背景图片核心内容居中
- background-position: center 0;

## 浮动元素字围现象
- 浮动元素不会盖住未浮动元素中的文字。

## CSS查漏补缺
1. resize: none|both|horizontal|vertical
    - 制定一个div元素，允许用户调整大小。
    - none：用户无法调整元素的尺寸
    - both: 用户可以调整元素的高度和宽度
    - horizontal： 用户可以调整元素的宽度
    - vertical: 用户可以调整元素的高度

2. visibility: 规定元素是否可见
    - 提示：即使不可见的元素也会占据页面上的空间。请使用 "display" 属性来创建不占据页面空间的不可见元素。
    - visible: 默认值。元素是可见的
    - hidden：元素是不可见的
    - collapse: 当在表格中使用时，此值可以删除一行或一列，但是不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为'hidden'
    - inherit: 规定应该从父元素继承visibility属性的值

3. width新增属性
    - max-content：最大内容宽度,一往无前不换行
    - min-content: 以内部元素中，宽度最大的值为当前宽度。实现漏斗布局
    - fit-content: 实现元素适应内容宽度。保持原本的block水平状态。

4. calc() 动态计算长度的值
    - 需要注意的是，运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)
    - 任何长度值都可以使用calc()函数进行计算
    - calc()函数支持 "+", "-", "*", "/" 运算
    - calc()函数使用标准的数学运算优先级规则
    - 适用场景：满幅背景，定宽内容居中
        - padding: 0 calc(50% - 200px); ****padding的使用****

5. 垂直居中最佳方案

    ```
    A. 父级定义position: relative， 子元素垂直居中
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    B. 更优方案：flexbox 布局
        父级：{ display: flex; }
        子级：{ margin: auto; }

    C. 内部容器垂直居中
        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    ```

6. 紧贴脚步的页脚

    ```
        A. 灵活的flex布局
            body {
                display: flex;
                flex-flow: column;
                min-height: 100vh;
            }
            中间元素 { flex: 1; }  占满空间
            底部元素永远在底部

        B. padding-bottom
            HTML:
                <div class='box'>
                    <div class='main'></div>
                    <div class='footer'></div>
                </div>

            CSS:
                html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
                .box {
                    position: relative;
                    min-height: 100%;
                }
                .main {
                    padding-bottom: 100px; // 此处值 >= footer height
                }
                .footer {
                    position: absolute;
                    bottom: 0;
                    height: 100px;
                }

        C. footer在外层，非定位
            HTML：
                <div id="container">
                    <div id="page">Main Content</div>
                </div>
                <div id="footer">footer</div>
            CSS:
                html, body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                #container {
                    min-height: 100%;
                    height: auto !important;
                }
                #page {
                    padding-bottom: 60px;
                }
                #footer {
                    margin-top: -60px;
                    height: 60px;
                }
    ```
7. padding扩展注意点
    - CSS padding 属性的百分比数值是相对于其父元素的 width 计算的，如果改变了父元素的 width，则它们也会改变
    - 在 grid 布局中, 每个子项(padding-bottom)所相对的计算的宽度已经划分好了, 为当前子项, 并不是父元素的宽度.

8. 隐藏滚动条

    ```
     CSS3 div::-webkit-scrollbar
            display: none
    ```

9. box-shadow 详解
    - box-shadow: x, y, 模糊半径, 扩张半径, 颜色, inset(内置)
    - 实际阴影约为模糊半径2倍
    - 扩张半径为负值可抵消模糊===无阴影
    - 扩张半径为模糊半径一半时,可以实现微型半径-----box-shadow: 3px 3px 6px -3px black;
    - 单侧实现阴影,x,y中某个值为0,-扩展半径=模糊半径.
    - 默认阴影的颜色与文字的颜色相同
    - text-shadow: x,y,模糊半径,颜色

10. 清除浮动

    ```
        .clearfix::after {
            content: '';
            height: 0;
            display: block;
            visibility: hidden;
            clear: both;
        }
        .clearfix {
            *zoom: 1;
        }

        overflow: hidden; 清除浮动。margin-top顶部解决办法

        // 更简洁的方式
        .clearfix:before,
        .clearfix:after {
            content:"";
            display:table;
        }
       .clearfix:after {
            clear:both;
            overflow:hidden;
        }

        .clearfix {
            zoom:1; /* IE < 8 */
        }
        // 常用省略
        .clearfix:after {
            content:"";
            display:table;
            clear: both;
        }

        // 最新技术
        element {
            display: flow-root;
        }
    ```

11. hover图层效果
    - ul:hover li {},整体添加
    - ul li:hover {}，单独消除效果

12. 超大图片居中显示
    - 父级设置 text-align: center
    - 子级设置 margin: 0 -100%;

13. outline 有点事扩展时不会占据额外的空间尺寸, 但是缺点强占了:focus 聚焦状态的样式, 可以采用 box-shadow 实现类似样式.

14. 多个相同类型,实现单个选中态选中时, **radio 隐藏**, 实现选中效果. 无需 JavaScript. 语义好, 包括对辅助设备. 开发便捷. **类似标签,爱好,等采用 checkbox**

## 定位注意点
- 如果一个绝对定位的元素是以body作为参考点，那么其实是以网页首屏的宽度和高度作为参考点，而不是以整个网页的宽度和高度作为参考点。
- 绝对定位的元素会忽略祖先元素的padding
- 只有定位元素才可以设置 z-index

## 1px 边框移动端实现方式
- 渐变实现, 默认从上到下, linear-gradient(transparent 50%, red 50%);  1px 红线
- 缩放 + 边框, scaleY(.5) + 1px solid red;
- 四周边框同时设置
    ```
    width: 200%;
    height: 200%;
    transform-origin:0 0;
    border: 1px solid red;
    transform: scale(.5);
    ```

# JavaScript

## 关系运算符
- undefined 派生于 null, null == undefined // true
- null == 0 // false
- undefined == 0 // false undefined 转数字为 NaN
- 逻辑运算中 && 优先级高于 逻辑 ||
- 逻辑运算中,大于/小于操作优先于等于/不等于
- 一元算数符, + , - 会将操作数转换成数字/NaN

## 条件语句
- switch/case 判断的是 ===
- for 循环输出嵌套
    - 如果尖朝下,修改内循环的初始化表达式为外循环初始化表达式的变量
    - 如果尖朝上,内改内循环的条件表达式为外循环初始化表达式的变量

## 数组
- push/unshift方法返回值是数组新的长度
- pop/shift 方法返回值是删除的数据
- fill(),用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
- 遍历方法:
    - for
    - for/of
    - forEach
- findIndex(), 传入一个函数,包含是三个参数(current, index, arr). 返回找到的值的索引. 没有则 -1
- find(), 同 findIndex() 参数, 返回找到的元素. 没有则返回 undefined
- delete 删除数组, 数组的 length 属性不会发生变化
- 模拟 map 的实现
    ```
    Array.prototype.myMap = function (fn) {
        let _temp = []
        for(let i = 0; i < this.length; i++) {
            _temp.push(fn(this[i],i,arr));
        }
        return _temp
    }

    let arr = [1,3,5,1,6,8,9]
    let b = arr.myMap((item,index) => {
        return item * 3;
    })
    console.log(b);
    ```
- 模拟 filter 的实现
    ```
    Array.prototype.myFilter = function (fn) {
        let _temp = []
        for(let i = 0; i < this.length; i++) {
            if (fn(this[i],i,this)) {
                _temp.push(this[i]);
            }
        }
        return _temp
    }

    let arr = [1,3,5,1,6,8,9]
    let b = arr.myFilter((item,index) => {
        return (item > 5) && (index > 4);
    })
    console.log(b);
    ```
- 模拟 forEach 的实现
    ```
    Array.prototype.myforEach = function (fn) {
        for(let i = 0; i < this.length; i++) {
            fn(this[i],i,this);
        }
    }

    let arr = [1,3,5,1,6,8,9]
    let b = arr.myforEach((item,index,arr) => {
        console.log(item,index,arr);
    })
    ```
- 模拟 findIndex 的实现
    ```
    Array.prototype.myFindIndex = function (fn) {
        let _temp;
        for (let i = 0; i < this.length; i++) {
            /* 如果未定义则继续, 有值后直接退出循环 */
            if (_temp === undefined) {
                if (fn(this[i], i, this)) {
                    _temp = i
                }
            } else {
                break;
            }
        }
        return _temp !== undefined ? _temp : -1;
    }

    let arr = [1, 3, 5, 1, 6, 8, 9]
    let b = arr.myFindIndex((item, index, arr) => {
        if (index > 2) {
            return item === 1
        }
    })
    console.log(b)
    ```
- 模拟 find 的实现
    ```
    Array.prototype.myFind = function (fn) {
        let _temp;
        for (let i = 0; i < this.length; i++) {
            /* 如果未定义则继续, 有值后直接退出循环 */
            if (_temp === undefined) {
                if (fn(this[i], i, this)) {
                    _temp = this[i]
                }
            } else {
                break;
            }
        }
        return _temp !== undefined ? _temp : undefined;
    }

    let arr = [1, 3, 5, 1, 6, 8, 9]
    let b = arr.myFind((item, index, arr) => {
        return index === 89;
    })
    console.log(b)
    ```
- 模拟 some 的实现
    ```
     Array.prototype.some = function (fn) {
         let _temp
         for (let i = 0; i < this.length; i++) {
             if (fn(this[i], i, this)) {
                 _temp = this[i]
             }
         }
         return !!_temp;
     }

     let arr = [1, 3, 5, 1, 6, 8, 9]
     let b = arr.some((item, index, arr) => {
         return item > 34;
     })
     console.log(b)
    ```
- 模拟 every 的实现
    ```
    Array.prototype.some = function (fn) {
        let _temp = []
        for (let i = 0; i < this.length; i++) {
            if (fn(this[i], i, this)) {
                _temp.push(this[i]);
            }
        }
        return !!(_temp.length === this.length);
    }

    let arr = [1, 3, 5, 1, 6, 8, 9]
    let b = arr.some((item, index, arr) => {
        return item > 0;
    })
    console.log(b)
    ```

# 面向对象

- 构造函数进阶之路: 工厂函数 => 方法外置 => prototype
- prototype: 同名覆盖原则,应用于存储所有对象的相同属性和方法
- 继承时: 指定 constructor
- 在给一个对象不存在的属性设置值的时候,不会去原型中查找,如果当前对象没有就会给当前对象新增一个不存在的属性.
- 属性和方法的分类:
    - 通过实例对象访问的属性,实例属性
    - 通过实例调用的方法,实例方法
    - 通过构造函数访问的属性,静态属性
    - 通过构造函数调用的方法,静态方法
- 继承: A is a B
- 继承终极方案:
    - 在子类的构造函数中通过 call 借助父类的构造函数
    - 将子类的原型对象修改为父类的实例对象
- 获取对象类型: xx.constructor.name
- 对象深拷贝: Object.assign(target,source1,source2).将源对象(source)的所有可枚举资源复制到目标对象(target)
- 自定义深拷贝
    ```javascript
    function depCopy(target,source) {
        // 1. 遍历拿到 source 中所有的属性
        for (let key in source) {
            // 2. 取出当前遍历到的 key 对应的 value
            let sourceValue = source[key];
            // 3. 判断当前的属性是否是引用类型
            if (sourceValue instanceof Object) {
                // console.log(sourceValue.constructor);
                // 创建对应的类型
                let subTarget = new sourceValue.constructor;
                // 添加属性
                target[key] = subTarget;
                // 递归再次循环数据
                depCopy(subTarget, sourceValue);
            } else {
                target[key] = sourceValue;
            }
        }
    }
    ```

# 表单

- 属性：

  -  `action`, 提交到哪儿
  - `method`,  方式--GET, POST, PUT, HEADER, DELETE; 自定义
  -  **`name`**(必须加)， 可以重复
  - `submit`， 提交

-  数据提交

  - GET， 数据放在 url 里面。 **容量小**， **看得见（表单）**， **有缓存**， **利于分享，收藏**

  - POST, 数据放在 http-body 里面。**容量大**， **看不见**， **不缓存**， **无法分享， 收藏**

  -  安全性完全一样， https才是真安全

    

# 技巧

## 快速获取DOM

 ```javascript
const $ = document.querySelectorAll.bind(document);
// ...rest参数，数组
const $ = function(...args) {
    // rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
    return document.querySelectorAll(...args)
}
let oDiv = $('#box')[0];
 ```

