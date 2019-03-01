# 常见错误: 

- 路径中存在中文,中文,中文
- 文件编码错误解决：使用@charset "utf-8";-------------报错解决办法----汉字

# 常见问题

- @mixin 混入缺点：生成冗余带码块。不能智能将相同的样式代码块合并在一起
- %占位符，如果不被@extend调用，不会产生代码。编译出来的代码会将相同的代码合并在一起

# 1.安装

1. ruby安装
2. gem install sass
3. sass -v（版本查询）
4. gem update sass   更新sass
5. gem uninstall sass 卸载

# 2.编译

- sass --watch sass/xx.scss:css/xx.css

# 3.编译方式 （GUI图形界面化工具Koala）

1. 嵌套输出
    - sass --watch sass/xx.scss:css/xx.css --style nested	(默认格式)
2. 嵌套输出方式
    - sass --watch sass/xx.scss:css/xx.css --style expanded(大括号另起一行)
3. 紧凑输出方式
    - sass --watch sass/xx.scss:css/xx.css --style compact(不换行)
4. 压缩输出方式
    - sass --watch sass/xx.scss:css/xx.css --style compressed

# 4.核心语法

- 变量声明-------------------------------变量可以分为全局与局部变量定义并使用

```
调用：样式后直接引用变量名
$fontSize: 12px;
body {
  font-size: $fontSize;
} 
```

- !default 默认值,没有声明则使用这个默认的值，当设置了值时则使用相应的值。

```
$fontSize: 12px;
$fontSize: 20px !default;
body {
  font-size: $fontSize;
  div {
    $fontSize: 3px;
    font-size: $fontSize;
  }
}
 
// 编译后
body {
  font-size: 12px;
}
body div {
  font-size: 3px;
}
```

- 局部变量会覆盖全局变量，局部变量只会在局部范围内覆盖全局变量

- 选择器嵌套
    
```
nav {
  a {
    color: red;
  }
} 
```    

- 属性嵌套，CSS 中有一些属性前缀相同，只是后缀不一样。

```
.box {
  border: {
    top: 1px solid red;
    bottom: 1px solid green;
  }
} 
```

- 伪类嵌套

```
.clearfix {
  &::before,
  &::after {
    content: '';
    display: table;
  }
  &::after {
    clear: both;
    overflow: hidden;
  }
}

// 编译后
.clearfix::before, .clearfix::after {
  content: '';
  display: table;
}
.clearfix::after {
  clear: both;
  overflow: hidden;
} 
```

- 混合声明(@mixin)-----相同代码集合
    - @mixin varName(变量){}
    - 调用：@include
    - 混合声明中，变量可以不带参数，调用时传值。
    - 变量中带有一个默认的值，调用时仍可以自己设定，进行覆盖
    - 多个变量，可以使用特别的参数“...”替代。
    - 使用场景：一组放在一起有意义的属性。（重复的）

    - 调用场景一： 无参数，相同代码提取
        ```
         @mixin border-radius {
           -webkit-border-radius: 5px;
           -moz-border-radius: 5px;
           border-radius: 5px;
         }
         
         div {
           @include border-radius;
         }
         p {
           @include border-radius;
         }
        ```
    - 调用场景二：传一个不带值的参数，调用时传值
        ```
        @mixin border-radius($radius) {
          -webkit-border-radius: $radius;
          -moz-border-radius: $radius;
          border-radius: $radius;
        }
        
        div {
          @include border-radius(50%);
        }
        p {
          @include border-radius(50%);
        }
        ```
    - 调用场景三：传一个带值的默认参数，调用时不传值则使用默认值。传值则覆盖。可以传多个值。当参数过多，可以使用“...”替代
        ```
        @charset "utf-8";
        @mixin border-radius($radius:5px) {
          -webkit-border-radius: $radius;
          -moz-border-radius: $radius;
          border-radius: $radius;
        }
        
        div {
          // 使用默认值5px
          @include border-radius;
        }
        p {
          // 使用自定义值 50%
          @include border-radius(50%);
        } 
        ```

- @extend 继承
    - @extend className(已经存在的样式组合)
        eg.@extend .error(直接跟选择器)
    - 比较
        - 跟混合器（@mixin）相比，继承生成的css代码相对更少。因为继承仅仅是组合选择器，而不会重复属性，所以使用继承往往比混合气生成的css体积小。速度第一。
        - 继承遵从css层叠的规则。当两个不同的css规则应用到同一个html元素上时，并且这两个不同的css规则对同一属性的修饰存在不同的值，css层叠规则会决定用哪个样式。相当直观：通常权重更高得选择器胜出，如果权重相同，定义在后边的规则胜出。

- 占位符 %
    - 定义：%mt15 {margin-top: 15px;}
    - 调用：@extend %mt15
    - 相同代码会被合并在一起

比较|混合宏|继承|占位符
---|---|---|---
声明方式|@mixin|.class|%placeholder
调用方式|@include|@extend|@extend
使用环境|如果有变量，使用混合宏|已经存在类，不需要任何变量参数，继承|不会生成基本代码。独立

> 占位符用则有，不用则无！继承有父级才行，父级改动全局动（风险大）。变量混合宏。

- \#{}插值，mixin 慎用，extend 可用
- 注释: // 编译后不显示      /**/ 编译后显示
- 数据类型：
    - 数字：如 1， 2， 13， 10px
    - 字符串：有引号字符串或无引号字符串。如 'foo','bar’,baz。使用插值时，有引号会被转换为无引号
    - 颜色：如 blue, #02c6dc, rgba(255,0,0,0.5)
    - 布尔型：如，true, false;
    - 空值：如，null
    - 值列表：用空格或者逗号分开，如，1.5em 1em 0 2em, Helvetica, Arial, sans-serif. **事实上，独立的值也被视为值列表——只包含一个值的值列表。**  		

# Sass运算

- 加法
    ```
    .box {
      width: 20px + 8in;
    }
    不同类型的单位会报错 
    ```
- 减法，同理加法
- 乘法
    ```
    // 当一个单位同时声明两个值时会报错。
    .box {
      width: 20px * 8px; // 160px*px isn't a valid CSS value.
    } 
    
    .box {
      width: 20px * 8; // 正确
    }
    // 同理，不同单位也会报错
    ```
- 除法
    - 如果使用了变量，‘/’ 符号是除法运算
    - 使用了函数，是除法运算
    - 使用了圆括号，是除法运算
    - 使用了符号（+，-，*），是除法运算
    - 除法如果两个值带有相同的单位，则会得到一个不带单位的数值。
    ```
    .box {
      width: 10px / 5px; // 不是除法运算
      $h: 1000px;
      height: $h / 2; // 使用了变量，是除法运算
      margin-top: round(1.5) / 2; // 使用了函数，是除法运算
      margin-left: (500px / 2); // 使用了圆括号，是除法运算
      margin-bottom: 5px / 2 + 8 * 2px; // 使用了符号，是除法
    }
    
    // 编译后
    .box {
      width: 10px / 5px;
      height: 500px;
      margin-top: 1;
      margin-left: 250px;
      margin-bottom: 18.5px;
    } 
    ```    
- 变量也可以计算
- 字符运算
    - 如果有引号的字符串 + 一个没有引号的字符串，结果会是有引号
    - 如果没有引号在左侧，则结果是没有引号的。

# 进阶

- @if...@else...
    ```
    @mixin blockOrHidden($boolean: true) {
      @if $boolean {
        @debug "$boolean is #{$boolean}";
        display: block;
      }
      @else {
        @debug "$boolean is #{$boolean}";
        display: none;
      }
    }
    .block {
      @include blockOrHidden;
    }
    .hidden {
      @include blockOrHidden(false);
    } 
    ```
- @for 循环，两种方式
    - @for $i from <start> through <end>
    - @for $i from <start> to <end>
        - $i 表示变量
        - start 表示起始值
        - end 表示结束值
    - 这两个的区别是关键字 through 表示包括end 这个数，而 to 则不包括 end 这个数
    ```
     @for $i from 1 through 3 {
       .item-#{$i} {
         width: 2em * $i;
       }
     }
     // 编译后
     .item-1 {
       width: 2em;
     }
     
     .item-2 {
       width: 4em;
     }
     
     .item-3 {
       width: 6em;
     }
     
     // 网格系统生成
     $grid-prefix: span !default;
     $grid-width: 60px !default;
     $grid-gutter: 20px !default;
     
     %grid {
       float: left;
       margin-left: $grid-gutter / 2;
       margin-right: $grid-gutter / 2;
     }
     @for $i from 1 through 12 {
       .#{$grid-prefix}#{$i} {
         width: $grid-width * $i + $grid-gutter * ($i - 1);
         @extend %grid;
       }
     }
    ```
- @while循环
    ```
    $types: 4;
    $types-width: 20px;
    
    @while $types > 0 {
      .while-#{$types} {
        width: $types-width + $types;
      }
      $types: $types - 1;
    } 
    ```
- @each 循环，遍历一个列表，从列表中取出对应的值。
    - @each $var in \<list>
    - $var 是一个变量名，\<list>是一个SassScript表达式，他将返回一个列表值。变量$var会在列表中做遍历，遍历出与$var对应的样式块。
    ```
    $list: adam john wynm mason kuroir;
    @mixin author-images {
      @each $author in $list {
        .photo-#{$author} {
          background: url("images/avatars/#{$author}.png") no-repeat;
      }
      }
    }
    
    .author-bio {
      @include author-images;
    } 
    ```

# Sass的函数

- 字符串函数-unquote()函数
    - unquote($string): 删除字符串中的引号；
    - quote($string):给字符串添加引号。如果字符串本身有引号，统一换成双引号“”。同时，quote()碰到特殊符号，比如：！，？，> 等，除中折号 **-** 和**下划线_**都需要使用双引号括起。否则报错。 
- To-upper-case()，转换成大写字母
- To-lower-case(), 转换成小写字母    
- percentage($value): 将一个不带单位的数转换成百分比值；
- round($value): 将数值四舍五入，转换成一个最接近的整数
- ceil($value): 小数向上取整
- floor($value): 小数向下取整
- abs($value): 取绝对值
- min($numbers...): 找出几个数值之间的最小值
- max($numbers...): 找出几个数值之间的最大值
- random(): 获取随机数
- length()函数。返回一个列表中有几个值。列表参数之间使用空格隔开，不能使用逗号。











