    编译命令：i5ting_toc -f demo.md -o
# 第一章：简介
* 起源：Netscape Navigator--布兰登·艾奇（Brendan Eich）1995
* ECMA：欧洲计算机制造商协会（ECMA，European Computer Manufacturers Association）
* 组成：
    - 核心：ECMAScript
    - 文档对象模型：DOM，提供访问和操作网页内容的方法和接口
    - 浏览器对象模型: BOM，提供与浏览器交互的方法和接口
    
# 第二章：在HTML中使用JavaScript
    script标签中属性：
    - async: 异步，立即下载脚本。针对外部脚本文件
    - defer: 延迟，文档被完全解析和显示之后执行。针对外部文件
    - type: 默认text/javascript。可省略
    - src: 可选。执行外部代码文件
    - charset: 表示通过 src 属性指定的代码的字符集。很少用
    
    
# 第三章：基本概念
## 语法
1. **区分大小写**
2. **标识符**：指变量、函数、属性的名字，或者函数的参数。
> - 第一个字符必须是一个字母、下划线(_)或一个美元符号（$）
> - 其他字符可以是字母、下划线、美元符号或数字
> - ECMAScript标识符采用驼峰大小写格式，第一个字母小写，剩下的每个单词首字母大写
3. **注释**：ECMAScript 使用 C 风格的注释，包括单行注释和块级注释。
> - 单行注释以两个斜杠开头， // 单行注释
> - 块级注释（ /\* ）开头，以（ \*/ ）结尾
4. **严格模式**："use strict";

## 数据类型
1. **基本数据类型**：null, undefined, boolean, string, number, symbol
2. **复杂数据类型**：Object(对象)
3. **typeof**
    > - "undefined"——如果这个值未定义
    > - "boolean"——如果这个值是布尔值
    > - "string"——如果这个值是字符串
    > - "number"——如果这个值是数值
    > - "object"——如果这个值是对象或null
    > - "function"——如果这个值是函数
    > - *声明未初始化的变量，typeof是undefined, 同时未声明的变量，typeof 也是undefined*
4. **undefined**: 派生自null值
    > 当变量声明，未对其初始化时，这个变量的值就是undefined   
5. **null**: 一个空对象指针
6. **NaN**
    > - NaN ，即非数值（Not a Number）是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数未返回数值的情况
    > - 只有 0除以 0 才会返回 NaN，正数除以 0 返回 Infinity，负数除以 0返回-Infinity   
    > - 任何涉及 NaN 的操作（例如 NaN /10）都会返回 NaN，这个特点在多步计算中有可能导致问题。其次， NaN 与任何值都不相等，包括 NaN 本身     
    > - isNaN()函数，可以确定参数是否“不是数值”。
7. **转换为字符串**
    > - toString(): null 和 undefined 值没有这个方法。 多数情况下，调用 toString() 方法不必传递参数。
    > - 调用数值时，toString() 可以输出以二进制、八进制、十六进制，乃至其他任意有效进制格式表示的字符串值。默认为10进制。
    > - **String()**: 在不知道要转换的值是不是 null 或 undefined 的情况下，如果值有 toString() 方法，则调用该方法（没有参数）并返回相应的结果；**如果值是 null ，则返回 "null" ；如果值是 undefined ，则返回 "undefined" 。**
    > - 要把某个值转换为字符串，可以使用加号与字符串(" ")加在一起。
    > - **对象的基本类型转换：首先调用valueOf(),再调用toString() ???**
    
### Object实例的属性和方法 
- constructor ：保存着用于创建当前对象的函数。
- hasOwnProperty(propertyName) ：用于检查给定的属性在当前对象实例中（而不是在实例
的原型中）是否存在。其中，作为参数的属性名（ propertyName ）必须以字符串形式指定（例如： o.hasOwnProperty("name") ）。
- isPrototypeOf(object) ：用于检查传入的对象是否是传入对象的原型
- propertyIsEnumerable(propertyName) ：用于检查给定的属性是否能够使用 for-in语句来枚举。与 hasOwnProperty() 方法一样，作为参数的属性名必须以字符串形式指定。
- toLocaleString() ：返回对象的字符串表示，该字符串与执行环境的地区对应。
- toString() ：返回对象的字符串表示。
- valueOf() ：返回对象的字符串、数值或布尔值表示。通常与 toString() 方法的返回值相同。
- 由于在 ECMAScript 中 Object 是所有对象的基础，因此所有对象都具有这些基本的属性和方法。 
## 操作符
### 逻辑非
-  如果操作数是一个对象，返回 false ；
-  如果操作数是一个空字符串，返回 true ；
-  如果操作数是一个非空字符串，返回 false ；
-  如果操作数是数值 0，返回 true ；
-  如果操作数是任意非 0 数值（包括 Infinity ），返回 false ；
-  如果操作数是 null ，返回 true ；
-  如果操作数是 NaN ，返回 true ；
-  如果操作数是 undefined ，返回 true 。

### 逻辑与
-  如果第一个操作数是对象，则返回第二个操作数；
-  如果第二个操作数是对象，则只有在第一个操作数的求值结果为 true 的情况下才会返回该
- 对象；
-  如果两个操作数都是对象，则返回第二个操作数；
-  如果有一个操作数是 null ，则返回 null ；
-  如果有一个操作数是 NaN ，则返回 NaN ；
-  如果有一个操作数是 undefined ，则返回 undefined 。
- **逻辑与操作属于短路操作,如果第一个操作数是 false ，则无论第二个操作数是什么值，结果都不再可能是true 了**
- **不能在逻辑与操作中使用未定义的值，否则报错**
```
    let a= 2;
    let b = 3;
    let and = a && b;
    let or = a || b;
    console.log(and);// 3
    console.log(or); // 2
    
    console.log(a && d); // ReferenceError: d is not defined
    
    a = false;
    console.log(a && d); // false    短路操作符，为false后不再执行d
```

### 逻辑或
-  如果第一个操作数是对象，则返回第一个操作数；
-  如果第一个操作数的求值结果为 false ，则返回第二个操作数；
-  如果两个操作数都是对象，则返回第一个操作数；
-  如果两个操作数都是 null ，则返回 null ；
-  如果两个操作数都是 NaN ，则返回 NaN ；
-  如果两个操作数都是 undefined ，则返回 undefined 。
- **逻辑或也是短路操作符。如果第一个操作数的求值结果为true ，就不会对第二个操作数求值了**
```
    let a = "" || null || 3 || 4;
    console.log(a); // 3
    let b = 4 && 5 && null && 0;
    console.log(b); // null
```

### 加性操作符
- **当数字和字符串相加时，数字会被转换为字符串**
- **如果想先对数值执行算术计算，然后再将结果与字符串拼接起来，应该添加圆括号**

```
var num1 = 5;
var num2 = 10;
var message = "The sum of 5 and 10 is " + num1 + num2;
alert(message); // "The sum of 5 and 10 is 510"

var num1 = 5;
var num2 = 10;
var message = "The sum of 5 and 10 is " + (num1 + num2);
alert(message); //"The sum of 5 and 10 is 15"
```

### 关系操作符
- **如果两个操作数都是字符串，则比较两个字符串对应的字符编码值。**
- **如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较。**
- 如果是对象，则调用这个对象的valueOf()，按以上规则比较。如果没有valueOf()方法，则调用toString()方法，进行比较。

## 语句
### do-while语句
```
 do {
    statement
 } while (expression);
 常用于循环体中的代码至少要被执行一次的情形
```
### while
```
while(expression) {
    statement
} 
```
### for-in语句
```
一种精准的迭代语句，用来枚举对象的属性
for (let propName in window) {
    console.log(propName)
} 
```
### break和continue语句
```
break: 立即退出循环，强制继续执行循环后面的语句。
let num = 0;
for (let i = 1; i < 10; i++) {
    if (i % 5 === 0) {
        break;
    }
    num ++;
}
console.log(num); // 4
```
```
continue: 立即退出循环，从循环顶部继续执行
let num = 0;
for (let i = 1; i < 10; i++) {
    if (i % 5 === 0) {
        continue;
    }
    num ++;
}
console.log(num); // 8 
```
### label语句
```
用于优化性能，提前退出多层循环
 let num = 0;
 outermost:
 for (let i = 0; i < 10; i++) {
     for (let j = 0; j < 10; j++) {
         if (i === 5 && j === 5) {
             break outermost;
         }
         num++;
     }
 }
 console.log(num); // 55
```
```
let num = 0;
outermost:
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        if (i === 5 && j === 5) {
            continue outermost;
        }
        num++;
    }
}
console.log(num); // 95
```
### with
    with 语句的作用是将代码的作用域设置到一个特定的对象中。其作用是省略重复书写该对象名称，起到简化书写的作用
    ```
    let qs = location.search.substring(1);
    let hostName = location.hostname;
    let url = location.href;
    
    with(location) {
        let qs = search.substring(1)
        let hostName = hostname;
        let url = href;
    }
    ```
    - 使用with语句关联了location对象，意味着with语句的代码块内部，每个变量首先认为是一个局部变量。
    - 如果在局部环境中找不到该变量的定义，就会查询location对象中是否有同名的属性。
    - 如果发现同名属性，则以location对象属性的值作为变量的值。
    - 严格模式下，不允许使用with语句

### switch
    switch 语句中的每一种情形（case）的含义是：“
    - 如果表达式等于这个值（value），则执行后面的语句（statement）”。
    - 而 break 关键字会导致代码执行流跳出 switch 语句。
    - 如果省略 break 关键字，就会导致执行完当前case后，继续执行下一个 case。
    - 最后的 default 关键字则用于在表达式不匹配前面任何一种情形的时候，执行机动代码（因此，也相当于一个 else 语句）。
    ```
        switch (expression) {
            case value:
                statement
                break;
            case value:
                statement
                break;
            default:
                statement
        }
    ``` 
### 函数
**return语句之后的任何代码都永远不会执行。当return语句不带有返回值时，函数在停止后将返回undefined值。**
- 可以向 ECMAScript 函数传递任意数量的参数，并且可以通过 arguments对象来访问这些参数。
- ECMAScript中没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式传递的    
# 第四章 变量、作用域和内存问题

## 基本类型与引用类型
- **基本类型：操作实际的值**
- **引用类型：按照引用访问，一个地址。复制时是对象的地址，但添加属性时，是实际的对象**
> - 基本类型的复制，内存中开辟新的空间。互不干扰
> - 引用类型的复制，复制的是一个指针，指向存储在堆中的一个对象。改变其中一个变量，就会影响另一个变量。

## 函数的参数，是按值传递的
> **即使在函数内部修改了参数的值，但原始的引用仍然保持不变。实际上，当在函数内部重写obj时，这个变量引用的就是一个局部对象了。而这个局部对象会在函数执行完毕后立即被销毁。**
```
function setName(obj) {
    obj.name = 'Yyb'
    obj = new Object();
    obj.name = 'Greg'
}
let person = new Object();
setName(person)
console.log(person.name); // Yyb 
```

## 检测类型
- typeof 操作符是确定一个变量是字符串、数值、布尔值，还是 undefined 的最佳工具。
- 如果变量的值是一个对象或者 null，则 typeof 操作符返回“object”
- instanceof 操作符： result = variable instanceof constructor
```
function Person(name, age, score) {
this.name = name;
this.age = age;
this.score = score;
} 
let p1 = new Person('zs', 18, 89);
console.log(p1 instanceof Person); // true
```
- 如果使用instanceof 操作符检测基本类型的值，该操作符会返回 false，因为基本类型不是对象。
- typeof 检测函数返回function， 检测正则表达式，返回 object

## 延长作用域链
- with语句
- try-catch语句的catch块
```
function bulidUrl() {
    let qs = '?debug=true';
    with(location) {
        var url = href + qs;
    }
    console.log(url)
} 
```
- with中的‘变量对象’是只读的，所以在他本层中定义的标识符不能定义在本层，而是存储到它的上一层作用域。因此，上一层可以访问url
- 参考文章：https://lllt.iteye.com/blog/1246424

## 垃圾收集
- 标记清除
- 引用计数（循环引用问题。不适用该方式，后续均采用标记清除）

## 内存管理
- 解除引用：设置变量的值为null，让值脱离执行环境，以便垃圾收集器下次运行时将其回收

## 小结
**执行环境**
- 执行环境有全局执行环境（也称为全局环境）和函数执行环境之分；
- 每次进入一个新执行环境，都会创建一个用于搜索变量和函数的作用域链；
- 函数的局部环境不仅有权访问函数作用域中的变量，而且有权访问其包含（父）环境，乃至全局环境；
- 全局环境只能访问在全局环境中定义的变量和函数，而不能直接访问局部环境中的任何数据；
- 变量的执行环境有助于确定应该何时释放内存。

**自动垃圾收集机制**
- 离开作用域的值将被自动标记为可以回收，因此将在垃圾收集期间被删除。
- “标记清除”是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值加上标记，然后再回收其内存。
- 另一种垃圾收集算法是“引用计数”，这种算法的思想是跟踪记录所有值被引用的次数。JavaScript引擎目前都不再使用这种算法；但在 IE 中访问非原生 JavaScript 对象（如 DOM 元素）时，这种算法仍然可能会导致问题。
- 当代码中存在循环引用现象时，“引用计数”算法就会导致问题。
- 解除变量的引用不仅有助于消除循环引用现象，而且对垃圾收集也有好处。为了确保有效地回收内存，应该及时解除不再使用的全局对象、全局对象属性以及循环引用变量的引用。
# 第五章：引用类型

## object类型
- 创建Object实例的方式
    > 构造函数： new  Object()
    > 对象字面量
    
## Array类型
- 设置数组的length, 可以从数组的末尾移除项或添加新项
- 利用length属性可以方便地在数组末尾添加新项
- 当向数组下标插入一个新的值时，数组新的长度是最后一项的索引加1 

### 检测数组:Array.isArray(value)

### 转换方法
- 调用数组的toString()方法会返回由数组中每个值的字符串形式，拼接而成的一个以逗号分隔的字符串。
- alert（）接受的是字符串参数，因此输出数组时，后台调用toString() 方法。
- 数组继承的toLocalString()、toString() 和 valueOf() 方法，默认以逗号分隔的字符串的形式返回
- join()只接受一个参数，即用作分隔符的字符串，可以自定义分隔符
- > 如果数组中的某一项的值是 null 或者 undefined ，那么该值在 join() 、toLocaleString() 、 toString() 和 valueOf() 方法返回的结果中以空字符串表示。

### 栈方法
- push() 数组末尾添加任意数量的参数，并返回修改后数组的长度
- pop() 删除数组末尾的最后一项，并返回该项
- shift() 删除数组第一项，并返回该项
- unshift() 数组前添加项，并返回新数组的长度

### 排序方法
- reverse() 反转数组项
- sort() 方法会根据测试字符串的结果改变原来顺序。可以传递一个比较函数作为参数，进行比较。
```
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
let values = [0, 1, 4, 10, 15];
console.log(values.sort()); // [ 0, 1, 10, 15, 4 ]
console.log(values.sort(compare)); // [ 0, 1, 4, 10, 15 ] 
```
- 对于数值类型或者其 valueOf() 方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。
```
function compare(value1, value2){
    return value2 - value1;
}
由于比较函数通过返回一个小于零、等于零或大于零的值来影响排序结果，因此减法操作就可以适当地处理所有这些情况
```

### 操作方法
- concat() 拼接数组。创建当前数组的一个副本，将接收到的参数拼接到副本数组末尾，返回新构建的数组。
> 如果传递给concat()方法的是一或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中。如果传递的不是数组，这些值就会被简单地添加到结果数组的末尾。
```
let values = [0, 1, 4, 10, 15];
let newValue = values.concat('yellow', ['black', 'brown'],{name: 'age'})
console.log(newValue); 
// [ 0, 1, 4, 10, 15, 'yellow', 'black', 'brown', { name: 'age' } ]
```
- slice() 方法，基于当前数组中的一或多个项创建一个新数组。
> slice() 方法可以接受一或两个参数， 即要返回项的起始和结束位置。在只有一个参数的情况下，slice()方法返回从该参数指定位置到末尾的所有的选项。两个参数时，返回起始到结束位置之间的项——但不包括结束位置的项。slice() 方法不会影响原始数组。
```
let colors = ['red', 'green', 'blue', 'yellow', 'purple']
console.log(colors.slice(1)); // [ 'green', 'blue', 'yellow', 'purple' ]
console.log(colors.slice(1, 4)); // [ 'green', 'blue', 'yellow' ]
如果结束位置小于起始位置，则返回空数组
```
- splice() 方法
    - 删除：删除任意数量的项。只需指定2个参数：要删除的第一项的位置和要删除的数量。
    - 插入：指定位置插入任意数量的项。 3个参数：起始位置、0（要删除的数量）和要插入的项。
    - 替换：指定位置插入任意数量的项，且同时删除任意数量的项。3个参数：起始位置、要删除的数量和插入的任意数量的项。
    
    ```
    let colors = ['red', 'green', 'blue'];
    let remove = colors.splice(0, 1);
    console.log(colors); // [ 'green', 'blue' ]
    console.log(remove); // [ 'red' ]
    
    remove = colors.splice(1, 0, 'yellow', 'orange');
    console.log(colors); // [ 'green', 'yellow', 'orange', 'blue' ]
    console.log(remove); // []
    
    remove = colors.splice(1, 1, 'red', 'purple');
    console.log(colors); // [ 'green', 'red', 'purple', 'orange', 'blue' ]
    console.log(remove); // [ 'yellow' ]
    ```
    
### 位置方法
- indexOf 和 lastIndexOf()，没有找到该子字符串，则返回-1
> 这两个方法都接受两个参数：要查找的项和（可选的）表示查找起点位置的索引。 
> indexOf()会从该参数指定的位置向后搜索，忽略该位置之前的所有字符；而lastIndexOf()则会从指定的位置向前搜索，忽略该位置之后的所有字符。
- demo 
    ```
    let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    console.log(numbers.indexOf(4)); // 3
    console.log(numbers.lastIndexOf(4)); // 5
    console.log(numbers.indexOf(4, 4)); // 5
    
    // 找到所有的匹配的字符串
    let stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
    let positions = new Array();
    let pos = stringValue.indexOf("e");
    while(pos > -1){
        positions.push(pos);
        pos = stringValue.indexOf("e", pos + 1);
    }
    console.log(positions); //"3,24,32,35,52" 
    ```  
    
### 迭代方法
> 每个方法都接受两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接受三个参数：数组项的值、该项在数组中的位置和数组对象本身。    
-  every() ：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true ，则返回 true 。
-  filter() ：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
-  forEach() ：对数组中的每一项运行给定函数。这个方法没有返回值。
-  map() ：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
-  some() ：对数组中的每一项运行给定函数，如果该函数对任一项返回 true ，则返回 true 。
- 以上方法都不会修改数组中的包含的值。

    ```
    let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    let everyResult = numbers.every((item, index, array) => item > 2);
    console.log(everyResult); // false
    
    let someResult = numbers.some((item, index, array) => item > 2);
    console.log(someResult); // true
    
    let filterResult = numbers.filter((item, index, array) => item > 2);
    console.log(filterResult); // [ 3, 4, 5, 4, 3 ]
    
    let mapResult = numbers.map((item, index, array) => item * 2);
    console.log(mapResult); // [ 2, 4, 6, 8, 10, 8, 6, 4, 2 ]
    // 该方法适合创建包含的项与另一个数组一一对应的数组
    
    numbers.forEach((item, index, array) => {
        // 执行某些操作, 与for一样
    }); 
    ```
    
### 归并方法
**reduce() 和 reduceRight() **    
> 这两个方法都会迭代数组的所有项，构建一个最终的返回值。其中，reduce()方法从数组的第一项开始，逐个遍历到最后。而reduceRight()则从数组的第一项开始，向前遍历到第一项。
> 都接受两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。

**该函数接受4个参数：**
- 前一个值、当前值、项的索引和数组对象
    ```
    let values = [1, 2, 3, 4, 5];
    let sum = values.reduce((prev, cur, index, array) => prev + cur);
    console.log(sum); // 15
    
    let values2 = [1, 2, 3, 4, 5];
    let sum2 = values.reduce((prev, cur, index, array) => prev + cur, 10);
    console.log(sum2); // 25
    // 第二个参数为初始值
    ```
    
## Date类型    
- 创建一个日期对象，使用new操作符和 Date构造函数即可
`let now = new Date()`
- 不传参时，自动获取当前日期和时间
- 获取当前时间戳秒：Math.round(new Date() / 1000)
- Date.parse()方法，接收一个表示日期的字符串参数。返回相应的日期的毫秒数

    **字符串参数：**
    - “月/日/年”，如 6/13/2004；
    - “英文月名 日,年”，如 January 12,2004；
    - “英文星期几 英文月名 日 年 时:分:秒 时区”，如 Tue May 25 2004 00:00:00 GMT-0700。
    - ISO 8601 扩展格式 YYYY-MM-DDTHH:mm:ss.sssZ（例如 2004-05-25T00:00:00）。只有兼容ECMAScript 5的实现支持这种格式。
    ```
        console.log(Date.parse("6/12/2004")); // 1086969600000
        console.log(Date.parse("January 12, 2004")); // 1073836800000
        console.log(Date.parse("2004-5-12")); // 1084291200000 
    ```
    **超出的日期格式。提示：`Invalid Date`**
- Date.UTC()方法，返回世界时从1970年1月1日午夜到日期的毫秒数

参数 | 描述
---|---
year|必须。表示年份的四位数字。
month|必须。表示月份的整数。0~11
day|可选。表示日期的整数，介于 1 ~ 31。
hours|可选。表示小时的整数，介于 0 ~ 23。
minutes|可选。表示分钟的整数，介于 0 ~ 59。
seconds|可选。表示秒的整数，介于 0 ~ 59。
ms|可选。表示毫秒的整数，介于 0 ~ 999。
```angular2html
console.log(Date.UTC(2000, 0)); // 946684800000
console.log(Date.UTC(2005, 4, 5, 17, 55, 55)); // 1115315755000
```
- Date.now() 方法，返回调用这个方法的日期和时间的毫秒数。
```angular2html
//取得开始时间
var start = Date.now();
//调用函数
doSomething();
//取得停止时间
var stop = Date.now(),
result = stop – start;
```

### 继承的方法
**chrome浏览器为例：**
- new Date().toString()：Thu Jan 03 2019 10:19:44 GMT+0800 (中国标准时间)
- new Date().toLocaleString()：2019/1/3 上午10:19:44
- new Date().valueOf(): 返回日期的毫秒表示

### 日期格式化方法
-  toDateString() ——以特定于实现的格式显示星期几、月、日和年；
-  toTimeString() ——以特定于实现的格式显示时、分、秒和时区；
-  toLocaleDateString() ——以特定于地区的格式显示星期几、月、日和年；
-  toLocaleTimeString() ——以特定于实现的格式显示时、分、秒；
-  toUTCString() ——以特定于实现的格式完整的 UTC 日期。
- **以上方法因浏览器而异。**

### 日期/时间组件方法
方法|说明
---|---
*getTime()|返回表示日期的毫秒数；与valueOf()方法返回的值相同
setTime(ms)|以毫秒数设置日期，会改变整个日期
*getFullYear()|取得4位数的年份（2018）
getUTCFullYear()|返回UTC日期的4位数年份
setFullYear(year)|设置日期的年份。传如的年份必须是4位数字（2018）
*getMonth()|返回日期中的年份。0~11
getUTCMonth()|返回UTC日期中的月份。0~11
setMonth(month)|设置日期的月份。传入的月份必须大于0，超过11则增加年份
setUTCMonth(month)|设置UTC日期的月份。传入的月份值必须大于0，超过11则增加年份
*getDate()|返回日期月份中的天数。1~31
getUTCDate()|返回UTC日期月份中的天数。1~31
setDate(日)|设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份
setUTCDate(日)|设置UTC日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份
*getDay()|返回日期中星期的星期几（其中0表示星期日，6表示星期六）
getUTCDay()|返回UTC日期中的星期几（其中0表示星期日，6表示星期六）
*getHours()|返回日期中的小时数。0~23
getUTCHours()|返回UTC日期中的小时数。0~23
setHours(时)|设置日期中的小时数。传入的值超过了23则增加月份中的天数
setUTCHours( 时 )|设置UTC日期中的小时数。传入的值超过了23则增加月份中的天数
*getMinutes()|返回日期中的分钟数。0~59
getUTCMinutes()|返回UTC日期中的分钟数。0~59
setMinutes(分)|设置日期中的分钟数。传入的值超过59则增加小时数
setUTCMinutes( 分 ) |设置UTC日期中的分钟数。传入的值超过59则增加小时数
*getSeconds()|返回日期中的秒数。0~59
getUTCSeconds()|返回UTC日期中的秒数。0~59
setSeconds(秒)|设置日期中的秒数。传入的值超过了59会增加分钟数
setUTCSeconds(秒)|设置UTC日期中的秒数。传入的值超过了59会增加分钟数。
*getMilliseconds()|返回日期中的毫秒数
getUTCMilliseconds()|返回UTC日期中的毫秒数
setMilliseconds()|设置日期中的毫秒数
setUTCMilliseconds( 毫秒 )|设置UTC日期中的毫秒数
*getTimezoneOffset()|返回本地时间与UTC时间相差的分钟数。

## RegExp 类型

**字面量形式：let expression = / pattern / flags**

**构造函数模式：let expression = ('pattern', 'flags')，参数是字符串**
- g（global）：表示全局模式。
- i（ignoreCase）:不区分大小写模式。
- m（multiLine）: 表示多行模式
- 方括号内的转义字符不是必要的。可以省略'\'转移字符

### 语法

符号|描述
---|---
\|将其后的特殊字符，转译为字面量。在非特殊字符之前的反斜杠表示下一个字符是特殊的。
^|匹配输入的开始
$|匹配输入的结束
*|匹配前一个表达式0次或多次。等价{0，}
+|匹配前面一个表达式1次或者多次。 等价{1,}
?|匹配前面一个表达式0次或者1次。 等价{0，1}
.|匹配除换行符之外的任何单个字符
(x)|匹配‘x'并且记住匹配项。
(？:x）|匹配’x'但是不记住匹配项
x(x?=y)| 匹配‘x'仅仅当’x'后面跟着‘y',正向查找
x（x！y）|匹配’x'仅仅当‘x'后面不跟着’y'，正向否定查找
xly|匹配‘x'或’y'
{n} |n 是一个正整数，匹配前面一个字符n次
{n,m}| 匹配前面的字符至少n次，最多m次。
[xyz] |一个字符集合。匹配方括号中的任意字符，包括转义序列
[^xyz]|一个反向字符集。匹配任何没有包含方括号中的字符。匹配第一个则结束
\b|匹配一个词的边界
\B|匹配一个非单词边界
\cX|当X是处于A到Z之间的字符的时候，匹配字符串中的一个控制字符
\d|匹配一个数字。等价[0-9]
\D|匹配一个非数字。等价[^0-9]
\f|匹配一个换页符
\n|匹配一个换行符
\r|匹配一个回车符
\s|匹配一个空白字符，包括空格、制表符，换页符和换行符
\S|匹配一个非空白字符
\t|匹配一个水平制表符
\v|匹配一个垂直制表符
\w|匹配一个单字字符（字母、数字或者下划线）。等价于[A-Za-z0-9_]
\W|匹配一个非单字字符。 等价于[^A-Za-z0-9_]
\O|匹配null字符

### 实例属性
-  global ：布尔值，表示是否设置了 g 标志。
-  ignoreCase ：布尔值，表示是否设置了 i 标志。
-  lastIndex ：整数，表示开始搜索下一个匹配项的字符位置，从 0 算起。
-  multiLine ：布尔值，表示是否设置了 m 标志。
-  source ：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。
- 没多大的用

### RexExp对象方法
- test（）方法检索字符串中是否存在指定的值。返回true/false
    - **语法：Pattern.test(测试的内容)**
- exec()方法，专门为捕获组而设计。接受一个参数，既要应用模式的字符串。
    - 返回包含第一个匹配项信息的数组；没有匹配项则返回null
    - 返回项虽然是Array的实例，但包含两个额外的属性：index 和 input
    - index 表示匹配项在字符串中的位置，input表示应用正则表达式的字符串
    - **语法：pattern.exec(text)**;
- RegExp实例继承的toLocalString（）和toString()方法都返回正则表达式    
- 正则表达式的 valueOf() 方法返回正则表达式本身。
- match()，本质上与exec()相同。只接收一个参数，正则表达式。
- search(),唯一参数与match()相同。返回字符串中第一个匹配项的索引。
- replace(),该方法接收2个参数。第一个参数（需要替换的字符串）为字符串或者RegExp对象，第二个参数是一个字符串或者一个函数。
### RegExp构造函数属性
- 9 个用于存储捕获组的构造函数属性。
- $1, $2, $3, $4....匹配相应的捕获组
    ```
    var text = "this has been a short summer";
    var pattern = /(..)or(.)/g;
    if (pattern.test(text)){
        alert(RegExp.$1); //sh
        alert(RegExp.$2); //t
    } 
    ```

### demo
```
日期格式：
普通验证：/^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/
精确数字验证：/^\d{4}[/-](0?[1-9]|1[0-2])[/-]((0?[1-9])|([1|2][0-9])|30|31)$/
```

## Function类型

### 没有重载

### 函数声明与函数表达式
- 函数声明会通过一个函数声明提升（function declaration hoisting）的过程，读取并将函数声明添加到执行环境中。
- 函数表达式，必须等到解析器执行到它所在的代码行，才会真正被解释执行。

### 作为值的函数
```
例如，假设有一个对象数组，我们想要根据某个对象属性对数组进行排序。而传递给数组 sort() 方法的比较函数要接收两个参数，
即要比较的值。可是，我们需要一种方式来指明按照哪个属性来排序。要解决这个问题，可以定义一个函数，
它接收一个属性名，然后根据这个属性名来创建一个比较函数，下面就是这个函数的定义。
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

let data = [{name: 'Zachary', age: 28}, {name: 'Nicholas', age: 29}];
data.sort(createComparisonFunction('name'));
console.log(data[0].name); // Nicholas
data.sort(createComparisonFunction('age'));
console.log(data[0].name); // Zachary 
```

### 函数内部属性
- arguments
    - 该对象有一个叫callee的属性，该属性是一个指针。指向拥有这个arguments对象的函数
    - 严格模式callee会导致错误。ES5新增caller，严格模式下也会错误。
    ```
    // 高耦合
    function factorial(num) {
        if (num <= 1) {
            return 1;
        } else {
            return num * factorial(num - 1);
        }
    }
    
    function factorial(num) {
        if (num <= 1) {
            return 1;
        } else {
            return num * arguments.callee(num - 1)
        }
    }
    let trueFactorial = factorial;
    factorial = function () {
        return 0;
    }
    console.log(trueFactorial(5)); // 120
    console.log(factorial(5)); // 0 
    ```
- this：引用的是函数据以执行的环境对象——或者也可以说是this值（网页的全局作用域中调用函数时，this对象引用就是window。node.js中指向global）
    ```
    window.color = 'red';
    let o = { color: "blue" };
    function sayColor() {
        console.log(this.color);
    }
    sayColor(); // "red"
    o.sayColor = sayColor;
    o.sayColor(); // "blue"
    ```
- **函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的sayColor()函数与o.sayColor()指向的仍然是同一个函数**
- ECMAScript 5 也规范化了另一个函数对象的属性： caller。这个属性保存着调用当前函数的函数的引用。如果全局作用域中调用当前函数，它的值为null。**函数.caller**
- ECMAScript 5 还定义了**arguments.caller** 属性，但在严格模式下访问它也会导致错误，而在非严格模式下这个属性始终是undefined。
    ```
     function outer() {
         inner()
     }
     function inner() {
         console.log(inner.caller)
     }
     inner(); // null
     outer(); // 显示outer()函数的源代码
     
     // 为了实现更松散的耦合，可以通过arguments.callee.caller来访问相同的信息
     function outer() {
         inner();
     }
     function inner() {
         console.log(arguments.callee.caller);
     }
     outer(); // 显示outer()函数的源代码
    ```

### 函数属性和方法
- length属性，表示函数希望接收的命名参数的个数
- prototype属性：保存所有引用类型的实例方法。不可以枚举，因此无法通过for-in发现
- apply()方法和call()方法。都是在特定的作用域中调用函数，实际上等同于设置函数体内this对象的值。
- apply()方法接受两个参数：一个是在其中运行函数的作用域，另一个是数组（可以是Array实例，也可以是arguments对象）。
- call()方法与apply()作用相同，第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。传递的参数必须逐个列举出来。
- 严格模式下，未指定环境对象而调用函数，则this值不会转型为window。除非明确指定某个对象，否则undefined
    ```
    window.color = 'red'
        let o = { color: 'blue'}
        function sayColor() {
            console.log(this.color)
        }
        sayColor(); // red
        
        sayColor().call(this); // red
        sayColor().call(window); // red
        sayColor().call(o); // blue  
    ```
- **使用 call() （或 apply() ）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。**
- ES5新增bind()方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值。
    ```
    window.a = 123; // let 声明的变量不在全局中
    function foo() {
        console.log(this.a)
    }
    foo(); // 123
    let o = { a: 'abc'};
    let boo = foo.bind(o); //改变this指向
    boo(); // abc 
    ```
- 每个函数继承的toLocaleString()和toString（）方法始终都返回函数的代码。valueOf()同样也只返回函数代码

## 基本包装类型
- Boolean、Number和String.每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象。
- 适用于Boolean和Number
    ```
    let s1 = 'some text'
    let s2 = s1.substring(2)
    /* 等同于
    * 1.创建String类型的一个实例
    * 2.在实例上调用指定的方法
    * 3.销毁这个实例
    * */
    let s1 = new String('some text');
    let s2 = s1.substring(2);
    s1 = null;
    ```
- 使用 new 调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的
    ```
    var value = "25";
    var number = Number(value); //转型函数
    alert(typeof number); //"number"
    var obj = new Number(value); //构造函数
    alert(typeof obj); //"object" 
    ```

### Number类型
- toFixed()，按照指定的小数位返回数值的字符串表示
- toExponential(),返回指数表示法（e表示法）表示的数值的字符串形式。 
    ```
    let num = 10;
    console.log(num.toExponential(2)); // 1.00e+1 
    ```
- toPrecision(),返回固定大小（fixed）格式，也可能返回指数格式；参数表示数值的数字的位数（不包括指数部分）

### String类型
- 特定字符的方法：charAt()和charCodeAt()。这两个方法都接收一个参数，即基于0的字符位置。
- 如果想得到字符编码，则使用charCodeAt()
    ```
    var stringValue = "hello world";
    console.log(stringValue.charAt(1)) //"e"
    
    var stringValue1 = "hello world";
    console.log(stringValue1.charCodeAt(1)); // 输出"101" 
    ```
- 可以使用方括号加数字索引来访问字符串中的特定字符    
- slice()，参数为起始位置和结束位置。截取到结束位置前一个。当参数为负数时，与字符串的长度相加
- substr(),**参数为起始位置和返回的个数**。第一个参数为负数则加字符串长度，第二个参数为负数，则转换为0
- substring()，参数为起始位置和结束位置。截取到结束位置前一个。参数为负数转换为0，这个方法会将较小的数作为开始位置，将较大的数作为结束位置。
- trim() 方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。
- toUpperCase(),toLocaleUpperCase()，大写
- toLowerCase()，toLocaleLowerCase(),小写
- replace(),这个方法接受两个参数：第一个参数可以是一个 RegExp对象或者一个字符串（这个字符串不会被转换成正则表达式），第二个参数可以是一个字符串或者一个函数。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（ g ）标志.
    ```
     var text = "cat, bat, sat, fat";
     var result = text.replace("at", "ond");
     alert(result); //"cond, bat, sat, fat"
     
     result = text.replace(/at/g, "ond");
     alert(result); //"cond, bond, sond, fond"
     
     // 去掉所有空格
     let str = '  vunbo yao ';
     let pattern = /\s/g;
     console.log(str.replace(pattern, '')); // vunboyao
    ```
    字符序列|替换文本
    ---|---
    $$|$
    $&|匹配整个模式的子字符串。与 RegExp.lastMatch 的值相同
    $'|匹配的子字符串之前的子字符串。与 RegExp.leftContext 的值相同
    $`|匹配的子字符串之后的子字符串。与 RegExp.rightContext 的值相同
    $n|匹配第n个捕获组的子字符串，其中n等于0～9。例如， $1 是匹配第一个捕获组的子字符串， $2 是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串
    ``` 
    var text = "cat, bat, sat, fat";
    result = text.replace(/(.at)/g, "word ($1)");
    alert(result); //word (cat), word (bat), word (sat), word (fat)
    // 所有匹配的单词都被替换为word+(捕获组对应的单词)
    ```
- split()方法，基于字符串中指定的符号将一个字符串分割成多个子字符串，并将结果放入一个数组中。第二个参数可以指定数组的大小。
- localeCompare()方法，比较两个字符串。
    - 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数（-1）
    - 如果字符串等于字符串参数，则返回0
    - 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数（1)
    ```
    let stringValue = 'yellow'
    console.log(stringValue.localeCompare('brick')); // 1
    console.log(stringValue.localeCompare('yellow')); // 0
    console.log(stringValue.localeCompare('zoo')); // -1 
    ```
- fromCharCode()方法，接受一或多个字符编码，然后转换成一个字符串。与charCodeAt()执行相反的操作。  
    `console.log(String.fromCharCode(104, 101, 108, 108, 111)); // hello`  
    `console.log('hello'.charCodeAt(2)); // 108`

## 单体内置对象

### global 对象
- 所有在全局作用域中定义的属性和函数，都是Global对象的属性。诸如isNaN(),isFinite(),parseInt()以及parseFloat()
- URI编码方法：encodeURI()和encodeURIComponent()方法可以对URI进行编码。有效的URI中不能包含某些字符，例如空格。
- encodeURI()主要用于整个URI，而encodeURIComponent()主要用于对URI中的某一段进行编码。
- 区别：encodeURI()不会对本身的属于URI的特殊字符进行编码，例如冒号，正斜杠，问好和井字号；而encodeURIComponent()会对任何非标准字符进行编码。
    ``` 
    let uri = 'http://www.wrox.com/illegal value.html#start';
    console.log(encodeURI(uri)); 
    // http://www.wrox.com/illegal%20value.html#start 使用encodeURI()编码后除了空格之外的其他字符都原封不动
    console.log(encodeURIComponent(uri)); 
    // http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.html%23start  使用encodeURIComponent()编码。替换所有非字母数字字符
    ```
- 使用encodeURIComponent()比encodeURI()更多。
- 对应解码：decodeURI()和decodeURIComponent()
- eval()方法，一个完整的ECMAScript解析器，只接受一个参数，即要执行的ECMAScript字符串。——严格模式禁止使用，会发生代码注入
- 特殊的值undefined,NaN以及Infinity都是Global对象的属性。此外，所有原声引用类型的构造函数，如Object和Function，也都是Global对象的属性。

属性|说明
---|---
undefined|特殊值undefined
NaN|特殊值NaN
Infinity|特殊值Infinity
Object|构造函数Object
Array|构造函数Array
Function|构造函数Function
Boolean|构造函数Boolean
String|构造函数String
Number|构造函数Number
Date|构造函数Date
RegExp|构造函数RegExp
Error|构造函数Error
EvalError|构造函数EvalError
RangeError|构造函数RangeError
ReferenceError|构造函数ReferenceError
SyntaxError|构造函数SyntaxError
TypeError|构造函数TypeError
URIError|构造函数URIError

### Math 对象
- Math.PI, Π的值
- max()和min() 方法，确定一组数值中的最大值和最小值。
    ```
    let max = Math.max(3,12,4,1212); // 1212
    let min = Math.min(3,12,4,1212); // 3
    console.log(max, min);
     
    //找到一组数组中的最大值，使用apply()方法
    let values = [1, 2, 3 ,4 ,5 , 7, 8];
    let max = Math.max.apply(Math, values);
    console.log(max); // 8
    ```
- Math.ceil(),向上取整
- Math.floor(),向下取整
- Math.round()，四舍五入
- Math.abs(num), 绝对值
- Math.random(),返回一个大于等于0小于1的随机数。
    ```
    利用Math.random()从某个正数范围内随机选择一个值
    值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值) 
    公式中用到了Math.floor()方法，因为Math.random()总返回一个小数值。
    
    1到10之间的数值。
    let num = Math.floor(Math.random() * 10 + 1);
    
    function selectFrom(lowerValue, upperValue) {
        let choices = upperValue - lowerValue + 1;
        return Math.floor(Math.random() * choices + lowerValue);
    }
    let num = selectFrom(2, 10);
    console.log(num); // 介于2和10之间（包括2和10）的一个数值
    
    let colors = ['red', 'green', 'blue', 'yellow', 'black', 'purple', 'orange', 'brown']
    let color = colors[selectFrom(0, colors.length - 1)]
    console.log(color)
    ```
    
    
# 第六章：面向对象的程序设计
## 理解对象
```
对象字面量
let person = {
    name: 'Nicholas',
    age: 29,
    job: 'Software Engineer',
    sayName: function(){
        console.log(this.name);
    }
} 
```
### 数据属性
- [[Configurable]] ：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true 。
- [[Enumerable]] ：表示能否通过 for-in 循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true 。
- [[Writable]] ：表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为 true 。
- [[Value]] ：包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为 undefined 。
- 要修改属性默认的特性，必须使用 ECMAScript 5 的 Object.defineProperty() 方法。
    - 这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。
    - 描述符（descriptor）对象的属性必须是： configurable 、 enumerable 、 writable 和 value 。设置其中的一或多个值，可以修改对应的特性值。
    ``` 
    let person = {};
    Object.defineProperty(person, "name", {
        writable: false, // 只读，无法修改
        value: "Nicholas"
    });
    console.log(person.name); //"Nicholas"
    person.name = "Greg";
    console.log(person.name); //"Nicholas"
    ```
    - 把 configurable 设置为 false ，表示不能从对象中删除属性。而且，一旦把属性定义为不可配置的，就不能再把它变回可配置了。
    ```
    let person = {};
    Object.defineProperty(person, "name", {
        configurable: false,
        value: "Nicholas"
    });
    //抛出错误
    Object.defineProperty(person, "name", {
        configurable: true, // TypeError: Cannot redefine property: name
        value: "Nicholas"
    }); 
    ```
    - 在调用 Object.defineProperty() 方法时，如果不指定， configurable 、 enumerable 和writable 特性的默认值都是 false 。

### 访问器属性
> 访问器属性不包含数据值；它们包含一对儿 getter 和 setter 函数（不过，这两个函数都不是必需的）。在读取访问器属性时，会调用 getter 函数，这个函数负责返回有效的值；在写入访问器属性时，会调用setter 函数并传入新值，这个函数负责决定如何处理数据。
- [[Configurable]] ：表示能否通过 delete 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为数据属性。对于直接在对象上定义的属性，这个特性的默认值为true 。
- [[Enumerable]] ：表示能否通过 for-in 循环返回属性。对于直接在对象上定义的属性，这个特性的默认值为 true 。
- [[Get]] ：在读取属性时调用的函数。默认值为 undefined 。
- [[Set]] ：在写入属性时调用的函数。默认值为 undefined 。
    - 访问器属性不能直接定义，必须使用 Object.defineProperty() 来定义
    ``` 
    let book = {
        _year: 2004,
        edition: 1
    };
    Object.defineProperty(book,'year', {
        get: function () {
            return this._year;
        },
        set: function (newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    });
    book.year = 2005;
    console.log(book.edition); // 2
    ```

### 定义多个属性
- Object.defineProperties() 方法。接收2个对象参数，第一个对象是要添加和修改其属性的对象。第二个对象的属性与第一个对象中要添加和修改的属性一一对应。
```
let book = {}
Object.defineProperties(book, {
    _year: {
        writable: true,
        value: 2004
    }, 
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get: function () {
            return this._year;
        },
        set: function (newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
// 以上代码在 book 对象上定义了两个数据属性（ _year 和 edition ）和一个访问器属性（ year ）。最终的对象与上一节中定义的对象相同。唯一的区别是这里的属性都是在同一时间创建的。 
```

### 读取属性的特性
- 使用 ECMAScript 5 的 Object.getOwnPropertyDescriptor() 方法，可以取得给定属性的描述符。
- 这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。
- 返回值是一个对象，如果是访问器属性，这个对象的属性有 configurable 、 enumerable 、 get 和 set ；
- 如果是数据属性，这个对象的属性有 configurable 、 enumerable 、 writable 和 value 。

```
let book = {}
Object.defineProperties(book, {
    _year: {
        writable: true,
        value: 2004
    },
    edition: {
        writable: true,
        value: 1
    },
    year: {
        get: function () {
            return this._year;
        },
        set: function (newValue) {
            if (newValue > 2004) {
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    }
});
let descriptor = Object.getOwnPropertyDescriptor(book, '_year');
console.log(descriptor.value); // 2004
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // undefined

let descriptor1 = Object.getOwnPropertyDescriptor(book, 'year');
console.log(descriptor1.value); // undefined
console.log(descriptor1.configurable); // false
console.log(typeof descriptor1.get); // function 指向getter函数的指针
```

## 创建对象
### 工厂模式
> 工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程
```
 function createPerson(name, age, job) {
     let o = new Object();
     o.name = name;
     o.age = age;
     o.job = job;
     o.sayName = function () {
         console.log(this.name);
     };
     return o;
 }
 let p1 = createPerson('Nicholas', 29, 'Software Engineer');
```    

- **工厂方法虽然解决了创建多个相似对象的问题， 但却没有解决对象识别的问题（即怎样知道一个对象的类型）**
    
### 构造函数模式   
```
 function Person(name, age, job) {
     this.name = name;
     this.age = age;
     this.job = job;
     this.sayName = function () {
         console.log(this.name);
     };
 }
 let p1 = new Person('Nicholas', 29, 'Software Engineer');
 p1.sayName(); // Nicholas 
 ```
**不同之处：**
- 没有显示的创建对象
- 直接将属性和方法赋给了 this 对象
- 没有 return 语句    
> 此外，还应该注意到函数名 Person 使用的是大写字母 P。按照惯例，构造函数始终都应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。这个做法借鉴自其他 OO 语言，主要是为了区别于 ECMAScript 中的其他函数；因为构造函数本身也是函数，只不过可以用来创建对象而已。   
  
**要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下4个步骤：**
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）    
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象
> 以这种方式定义的构造函数是定义在 Global 对象（在浏览器中是 window 对象）中的。
---
1. **将构造函数当作函数，与普通函数并没有区别。**    
    ```
    let p1 = new Person('Nicholas', 29, 'Software Engineer');
    p1.sayName(); // Nicholas
    
    Person('Greg', 25, 'Doctor'); // 添加到window
    window.sayName(); // Greg
    
    let o = {};
    Person.call(o, 'Kristen', 27, 'Nurse');
    o.sayName(); // Kristen 
    ```
2. **构造函数的问题**    
    - 每个方法都要在每个实例上重新创建一遍
    - 逻辑角度，此实的构造函数也可以这样定义：
    ``` 
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = new Function("console.log(this.name)");
    }
    ```
    -  从这个角度上来看构造函数，更容易明白每个 Person 实例都包含一个不同的 Function 实例（以显示 name 属性）的本质。说明白些，以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍然是相同的。
    - 因此，不同实例上的同名函数是不相等的
    `alert(person1.sayName === person2.sayName); //false`
    > 然而，创建两个完成同样任务的 Function 实例的确没有必要；况且有 this 对象在，根本不用在执行代码前就把函数绑定到特定对象上面。因此，大可像下面这样，通过把函数定义转移到构造函数外部来解决这个问题。  
  
    ``` 
    function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = sayName;
    }
    function sayName() {
        console.log(this.name);
    }
    let p1 = new Person('Nicholas', 29, 'Software Engineer');
    p1.sayName(); // Nicholas
    let p2 = new Person('Nick', 29, 'Software Engineer');
    p2.sayName(); // Nick
    console.log(p1.sayName === p2.sayName); // true
    ```
---
- **新的问题：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。**
- **新的问题：如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了**

### 原型模式
- 每一个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象。
- 该对象包含了由特定类型的所有实例共享的属性和方法。
- prototype 是通过构造函数创建的实例的原型对象。
``` 
function Person() {}
Person.prototype.name = 'Nickolas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
};
let person1 = new Person();
person1.sayName(); // Nickolas
let person2 = new Person();
person1.sayName(); // Nickolas
console.log(person1.sayName === person2.sayName); // true
```
- 与构造函数不同的是，新对象的这些属性和方法是由所有实例共享的。
****************
**1.理解原型对象**
- 无论什么时候创建一个新的函数，都有一个prototype属性，指向函数的原型对象。
- 所有原型对象都默认自动获得一个 constructor (构造函数) 属性。这个属性包含一个指向 prototype 属性所在函数的指针。
- 通过构造函数创建的实例，默认有一个属性 \_\_proto\_\_ 指向构造函数的原型对象。
- \_\_proto\_\_ 属性存在于实例与构造函数的原型对象之间，而不是实例与构造函数之间。

![原型对象](http://www.vunbo.com/usr/uploads/2018/12/1555594304.jpg)

- **判断原型**
> 虽然在所有实现中都无法访问到 [[Prototype]] ，但可以通过 **isPrototypeOf()** 方法来确定对象之间是否存在这种关系。从本质上讲，如果 [[Prototype]] 指向调用 isPrototypeOf() 方法的对象（ Person.prototype ），那么这个方法就返回 true ，如下所示：
```
console.log(Person.prototype.isPrototypeOf(person1)); // true
console.log(Person.prototype.isPrototypeOf(person2)); // true 
// 因为它们内部都有一个指向 Person.prototype 的指针，因此都返回了 true
```

- **ES5新增 Object.getPrototypeOf()，返回 \_\_proto\_\_  的值**
    ```
     // Object.getPrototypeOf() 返回的对象实际就是这个对象的原型
    console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
    console.log(Object.getPrototypeOf(person1).name); // Nickolas 
    ```
- *每当代码读取某个对象的属性的时候，都会执行一次搜索。目标是具有给定名字的属性。**首先从对象实例开始，如果没有则继续搜索原型对象。调用person1.sayName()时，先后执行了2次搜索。** *
> 原型最初只包含 constructor 属性，而该属性也是共享的，因此可以通过对象实例访问
```
console.log(person1.constructor === Person.prototype.constructor); // true
console.log(person1.constructor); // [Function: Person]
```
- 可以通过对象实例访问保存在原型中的值，但是不能通过对象实例重写原型中的值。
- 在实例中添加的属性与原型的属性中同名时，该属性会屏蔽原型中的那个属性。

    ```
    function Person() {}
    Person.prototype.name = 'Nickolas';
    Person.prototype.age = 29;
    Person.prototype.job = 'Software Engineer';
    Person.prototype.sayName = function () {
        console.log(this.name);
    };
    let person1 = new Person();
    let person2 = new Person();
    person1.name = 'Greg';
    console.log(person1.name); // Greg
    console.log(person2.name); // Nickolas 
    
    delete person1.name;
    console.log(person1.name); // Nickolas
    ```
- **使用 delete 操作符，可以删除实例属性，从而重新获取原型中的属性**

- 实例通过使用 **hasOwnProperty()** 方法可以检测一个属性是存在于实例中，还是存在于原型中。这个方法（不要忘了它是从 Object 继承来的）只在给定属性存在于对象实例中时，才会返回 true 。
```
console.log(person1.hasOwnProperty('name')); // false
person1.name = 'yyb';
console.log(person1.hasOwnProperty('name')); // true 
```

**2.原型与 in 操作符**

有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时， in 操作符会在通过对象能够访问给定属性时返回 true ，无论该属性存在于实例中还是原型中。
```
function Person() {}
Person.prototype.name = 'Nickolas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
};
let person1 = new Person();
let person2 = new Person();

console.log(person1.hasOwnProperty('name')); // false
console.log('name' in person1); // true

person1.name = 'Greg';
console.log(person1.name); // Greg  ——来自实例
console.log(person1.hasOwnProperty('name')); // true
console.log('name' in person1); // true

delete person1.name;
console.log(person1.name); // Nicholas ——来自原型
console.log(person1.hasOwnProperty('name')); // false
console.log('name' in person1); // true 
```
- 同时使用 hasOwnProperty() 方法和 **in** 操作符，可以确定该属性到底是存在于对象中，还是存在于原型中。

```
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
} 
// 由于 in 操作符只要通过对象能够访问到属性就返回 true ， hasOwnProperty() 只在属性存在于
   实例中时才返回 true ，因此只要 in 操作符返回 true 而 hasOwnProperty() 返回 false ，就可以确
   定属性是原型中的属性
   function Person() {}
   Person.prototype.name = 'Nickolas';
   Person.prototype.age = 29;
   Person.prototype.job = 'Software Engineer';
   Person.prototype.sayName = function () {
       console.log(this.name);
   };
   let person1 = new Person();
   console.log(hasPrototypeProperty(person1, 'name')); // true
   person1.name = 'Greg';
   console.log(hasPrototypeProperty(person1, 'name')); // false
   // 在这里， name 属性先是存在于原型中，因此 hasPrototypeProperty() 返回 true 。
   当在实例中重写 name 属性后，该属性就存在于实例中了，因此 hasPrototypeProperty() 返回 false。
   即使原型中仍然有 name 属性，但由于现在实例中也有了这个属性，因此原型中的 name 属性就用不到了。
```
- for-in,返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。
- 屏蔽了原型中不可枚举属性（即将[[Enumerable]] 标记为 false 的属性）的实例属性也会在 for-in 循环中返回，因为根据规定，所有开发人员定义的属性都是可枚举的——IE8例外。
- 要取得对象上所有可枚举的实例属性，可以使用ES5的Object.keys()方法。该方法，接收一个参数，返回一个包含所有可枚举属性的字符串数组

``` 
function Person() {}
Person.prototype.name = 'Nickolas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
};

let keys = Object.keys(Person.prototype);
console.log(keys); // [ 'name', 'age', 'job', 'sayName' ]

let person1 = new Person();
person1.name = 'Rob';
person1.age = 32;
let p1Keys = Object.keys(person1);
console.log(p1Keys); // [ 'name', 'age' ]
```
> 这里，变量 keys 中将保存一个数组，数组中是字符串 "name" 、 "age" 、 "job" 和 "sayName"。
> 这个顺序也是它们在 for-in 循环中出现的顺序。如果是通过 Person 的实例调用，则 Object.keys()返回的数组只包含 "name" 和 "age" 这两个实例属性。

- 如果要得到所有的实例属性，无论它是否可枚举，都可以使用Object.getOwnPropertyNames()方法。

```
let keys = Object.getOwnPropertyNames(Person.prototype);
console.log(keys); // [ 'constructor', 'name', 'age', 'job', 'sayName' ] 
//  注意结果中包含了不可枚举的 constructor 属性。
```

-  Object.keys() 和 Object.getOwnPropertyNames() 方法都可以用来替代 for-in 循环。

**3.更简单的原型语法**
- 将Person.prototype 设置为等于一个以对象字面量形式创建的新对象。
    ```
    function Person() {}
    Person.prototype = {
        name: 'Nicholas',
        age: 29,
        job: 'Software Engineer',
        sayName: function () {
            console.log(this.name);
        }
    } 
    ```
- **但此时 constructor 属性不再指向Person**，因为每创建一个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 对象，因此 constructor 属性也就变成了新对象的 constructor 属性（指向 Object）。虽然 instanceof 操作符还能返回true, 但 constructor 已经无法确定对象的类型了。
    ```
     let friend = new Person();
     console.log(friend instanceof Object); // true
     console.log(friend instanceof Person); // true
     console.log(friend.constructor === Person); // false
     console.log(friend.constructor === Object); // true
    ```
- 显式的设置 constructor 属性的值为 Person
    ```
     function Person() {}
     Person.prototype = {
         constructor: 'Person', // 默认不可枚举，但此时 Enumerable 属性为true
         name: 'Nicholas',
         age: 29,
         job: 'Software Engineer',
         sayName: function () {
             console.log(this.name);
         }
     }
    ```
- 注意，以这种方式重设 constructor 属性会导致它的 [[Enumerable]] 特性被设置为 true。默认情况下，原生的 constructor 属性是不可枚举的。**通过ES5中Object.defineProperty()**
    ```
     function Person() {}
     Person.prototype = {
         name: 'Nicholas',
         age: 29,
         job: 'Software Engineer',
         sayName: function () {
             console.log(this.name);
         }
     }
     Object.defineProperty(Person.prototype, 'constructor', {
         enumerable: false,
         value: Person
     })
    ```

**4.原型的动态性**
- 由于在原型上查找值的过程是一次搜索，因此即使是先创建了实例后，再修改原型，也能立即在实例上反映出来。
    ``` 
    let friend = new Person();
    Person.prototype.sayName = function() {
        console.log('hi');
    }
    friend.sayName(); // hi
    ```
- 但如果重写整个原型对象，则不一样。调用构造函数时会为实例添加一个指向最初原型的[[Prototype]] 指针，而把原型修改为另外一个对象就等于切断了构造函数与最初原型之间的联系。**实例中的指针仅指向原型，而不指向构造函数**
    ``` 
    function Person() {}
    let friend = new Person();
    Person.prototype = {
        name: 'Nicholas',
        age: 29,
        job: 'Software Engineer',
        sayName: function () {
            console.log(this.name);
        }
    }
    friend.sayName(); // Uncaught TypeError: friend.sayName is not a function
    ```
![重写原型对象](https://files.jb51.net/file_images/article/201606/201606131458517.png)

**5.原生对象的原型**
- 原生的引用类型，都是采用原型模式创建的。所有原生引用类型（Object, Array, String, 等等）都是在其构造函数的原型上定义了方法。如Array.prototype 中可以找到 sort() 方法，而在 String.prototype 中可以找到 substring() 方法
- 通过自定义添加 String 中一个首字母大写的方法。 
```
String.prototype.strFirstUpper = function () {
    let first = this.substr(0, 1); // this.charAt(0)
    let free = this.substring(1); // this.substr(1)
    first = first.toLocaleUpperCase();
    return first + free;
}
let str = 'yyb';
console.log(str.strFirstUpper()); // Yyb 
```
- str是字符串，后台通过调用 String 基本包装函数创建这个字符串，因此通过 str可以使用strFirstUpper（）方法。
```
// 基本类型调用方法，后台执行操作。
let _s = new String('yyb'); // 创建一个临时的字符串对象
_s.strFirstUpper(); // 调用该方法
_s = null; // 释放该对象 
```
> 不推荐在产品化的程序中修改原生对象的类型。

**6.原型对象的问题**
- 所有实例默认情况下将取得相同的属性值。
- 对于包含引用类型值的属性，不太友好。
```
function Person(){}
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
    }
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Court,Van"
alert(person2.friends); //"Shelby,Court,Van"
alert(person1.friends === person2.friends); //true 
```

### 组合使用构造函数模式和原型模式

- 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
- 每个实例都有自己的一份实例属性副本，但同时共享对方法的引用。最大限度节省了内存。
- 该模式还支持向构造函数传递参数；集两种模式之长。

```
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['Shelby', 'Court'];
}
Person.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    }
}
let person1 = new Person('Nicholas', 29, 'Software Engineer');
let person2 = new Person('Greg', 25, 'Doctor');

person1.friends.push('Van');
console.log(person1.friends); // [ 'Shelby', 'Court', 'Van' ]
console.log(person2.friends); // [ 'Shelby', 'Court' ]

console.log(person1.friends === person2.friends); // false
console.log(person1.sayName === person2.sayName); // true 
```

### 动态原型模式

```
function Person(name, age, job) {
    // 属性
    this.name = name;
    this.age = age;
    this.job = job;

    // 方法
    if (typeof this.sayName !== 'function') {
        Person.prototype.sayName = function () {
            console.log(this.name);
        }
    }
}
let friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); // Nicholas 
```

- 构造函数中方法部分，这里只会在sayName() 方法不存在的情况下，才会添加到原型中。
- 只会在初次调用构造函数时才会执行，此后，不需要再做修改。
> 使用动态原型模式时，不能使用对象字面量重写原型。前面已经解释过了，如果在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。

### 寄生构造函数模式
```
function Person(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
let friend = new Person('Nicholas', 29, 'Software Engineer');
friend.sayName(); // Nicholas 
```

> 在这个例子中， Person 函数创建了一个新对象，并以相应的属性和方法初始化该对象，然后又返回了这个对象。除了使用 new 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个 return 语句，可以重写调用构造函数时返回的值。

> 这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊
  数组。由于不能直接修改 Array 构造函数，因此可以使用这个模式。
  
```
function SpecialArray() {
    let values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function () {
        return this.join('|');
    };
    return values;
}
let colors = new SpecialArray('red', 'blue', 'green');
console.log(colors.toPipedString()); // "red|blue|green" 
```
> 在这个例子中，我们创建了一个名叫 SpecialArray 的构造函数。在这个函数内部，首先创建了
  一个数组，然后 push() 方法（用构造函数接收到的所有参数）初始化了数组的值。随后，又给数组实
  例添加了一个 toPipedString() 方法，该方法返回以竖线分割的数组值。最后，将数组以函数值的形
  式返回。接着，我们调用了 SpecialArray 构造函数，向其中传入了用于初始化数组的值，此后又调
  用了 toPipedString() 方法。
  关于寄生构造函数模式，有一点需要说明：首先，**返回的对象与构造函数或者与构造函数的原型属
  性之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此，
  不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在可以使用其他模式的情
  况下，不要使用这种模式。**
  
- 在构造函数中创建工厂模式，添加自定义方法。并显式的返回对象。
```
function ToUpper(value) {
    let str = new String(value);
    str.toUp = function () {
        return this.charAt(0).toUpperCase() + this.substr(1);
    }
    return str;
}
let a = new ToUpper('ssss');
console.log(a.toUp()); // Ssss 
```

### 稳妥构造函数模式
- 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this对象。
- 稳妥对象最适合在一些安全的环境中（这些环境中会禁止使用 this 和 new），或防止数据被其他应用程序改动时使用。
- 新创建对象的实例方法不引用this; 不使用 new 操作符调用构造函数。 
    ```
    function Person(name, age, job) {
        let o = new Object();
        o.sayName = function () {
            console.log(name);
        }
        return o;
    }
    let friend = Person('Nicholas', 29, 'Software Engineer')
    friend.sayName(); // Nicholas 
    // 注意，在以这种模式创建的对象中，除了使用 sayName() 方法之外，没有其他办法访问 name 的值。
    ```
> 变量 friend 中保存的是一个稳妥对象，而除了调用 sayName() 方法外，没有别的方式可
  以访问其数据成员。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的办法访问传
  入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环
  境下使用。
  
**与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此 instanceof 操作符对这种对象也没有意义。**    

## 继承

- OO 语言都支持两种继承方式： 接口继承和实现继承。接口继承只继承方法签名，而实现继承则继承实际的方法。
- 由于函数没有签名，在 ECMAScript 中无法实现接口继承。ECMAScript 只支持实现继承，主要依靠原型链来实现。

### 原型链

```
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function SubType() {
    this.subprototype = false;
}
// 继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
    return this.subprototype;
}
let instance = new SubType();
console.log(instance.getSuperValue); // true
console.dir(instance.constructor); // SuperType 
```

- 以上代码定义了2个类型：SuperType 和 SubType。每一个类型分别有一个属性和方法。
- SubType 继承了 SuperType， 继承是通过创建 SuperType 的实例（new SuperType()）,并将该实例赋给了SubType.prototype实现的。
- SubType 通过**重写原型对象**，继承了SuperType的实例属性以及原型中的函数。并添加一个新的方法（getSubValue）
- SubType 内部有一个指针（\_\_proto\_\_），指向 SuperType 的原型。
- getSuperValue() 方法仍在SuperType.prototype 中，但property 是一个实例属性，则在SubType.prototype中。
- instance.constructor 因为 SubType 重写原型对象，现指向SuperType的原型。而这个原型对象的 constructor 属性指向的是 SuperType.

![原型链](http://www.vunbo.com/usr/uploads/2019/01/3991745163.jpg)

- 调用instance.getSuperValue() 会经历三个搜索步骤：
- 1.搜索实例
- 2.搜索 SubType.prototype ；
- 3.搜索 SuperType.prototype ，最后一步才会找到该方法
- 在找不到属性或方法的情况下，搜索过程总是要一环一环地前行到原型链末端才会停下来。
 
**1.别忘记默认的原型**
- 所有引用类型默认都继承了 Object， 而这个继承也是通过原型链是实现的。
- 所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。
- 因此所有自定义类型都会继承 toString()、valueOf() 等默认方法。

![默认原型](http://www.vunbo.com/usr/uploads/2019/01/2820600037.jpg)
**2.确定原型和实例的关系**

- instanceof 操作符。只要用这个操作符来测试实例与原型链中出现过的构造函数，结果就会返回true
```
instance instanceof Object; // true
instance instanceof SuperType; //true
instance instanceof SubType; //true
```
- isPrototypeOf()方法。只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型。
```
Object.prototype.isPrototypeOf(instance); // true 
SuperType.prototype.isPrototypeOf(instance); // true 
SubType.prototype.isPrototypeOf(instance); // true 
```

**3.谨慎地定义方法**
- 重写方法将会屏蔽原来的那个方法。但必须在新实例替换原型之后，再定义新的方法。
- 通过原型链实现继承时，不能使用对象字面量创建原型方法。因为这样做会重写原型链。

**4.原型链的问题**
- 在通过原型来实现继承时，原型实际上会变成另一个类型的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了

```
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}
function SubType() {}
// 继承了 SuperType
SubType.prototype = new SuperType();

let instance = new SubType();
instance.colors.push('black');
console.log(instance.colors); // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green', 'black' ] 
```
> 这个例子中的 SuperType 构造函数定义了一个 colors 属性，该属性包含一个数组（引用类型值）。
  SuperType 的每个实例都会有各自包含自己数组的 colors 属性。当 SubType 通过原型链继承了
  SuperType 之后， SubType.prototype 就变成了 SuperType 的一个实例，因此它也拥有了一个它自
  己的 colors 属性——就跟专门创建了一个 SubType.prototype.colors 属性一样。**结果是 SubType 的所有实例都会共享这一个 colors 属性。**

### 借用构造函数

- 函数是在特定环境中执行代码的对象，因此通过apply()和 call（）方法，可以在（将来）新创建的对象上执行构造函数。

``` 
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}
function SubType() {
    // 继承了 SuperType
    SuperType.call(this);
}
let instance = new SubType();
instance.colors.push('black');
console.log(instance.colors); // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green' ]
```
- 通过使用call()方法，在（未来将要）新创建的SubType 实例的环境下调用了SuperType构造函数。**这样一来，就会在新 SubType 对象上执行 SuperType() 函数中定义的所有对象初始化代码。**

**1.传递参数**
- 相对于原型链而言，借用构造函数有一个很大的优势，即可以在子类型构造函数中向超类型构造函数传递参数。

```
function SuperType(name) {
    this.name = name;
}
function SubType() {
    // 继承了 SuperType， 同时还传递了参数
    SuperType.call(this, 'Nicholas');

    // 实例属性
    this.age = 20;
}
let instance = new SubType();
console.log(instance.name); // Nicholas
console.log(instance.age); // 20 
```
- 在 SubType 构造函数内部调用 SuperType 构造函数时，实际上是为 SubType 的实例设置了 name 属性。**为了确保SuperType 构造函数不会重写子类型的属性，可以在调用超类型构造函数后，再添加应该在子类型中定义的属性。**

**2.借用构造函数的问题**
- 如果仅仅是借用构造函数，那么也将无法避免构造函数模式存在的问题——方法都在构造函数中定义，因此函数复用就无从谈起了。
- 而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式。
  
### 组合继承

- 将原型链和借用构造函数的技术组合到一起，从而发挥二者之长的一种继承模式。
- 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

```
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
}
function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
    console.log(this.age);
}

let instance = new SubType('Nicholas', 29);
instance.colors.push('brown');
console.log(instance.colors); // [ 'red', 'blue', 'green', 'brown' ]
instance.sayName(); // Nicholas
instance.sayAge(); // 29

let instance1 = new SubType('Greg', 27);
console.log(instance1.colors); // [ 'red', 'blue', 'green' ]
instance1.sayName(); // Greg
instance1.sayAge(); // 27 
```

### 原型式继承
- 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

```
function object(o) {
    function F() {
    }
    F.prototype = o;
    return new F();
} 
let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'court', 'van']
}
let anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

let yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda';
yetAnotherPerson.friends.push('Barbie');

console.log(person.friends); // [ 'Shelby', 'court', 'van', 'Rob', 'Barbie' ]
```
克罗克福德主张的这种原型式继承，要求你必须有一个对象可以作为另一个对象的基础。如果有这么
一个对象的话，可以把它传递给 object() 函数，然后再根据具体需求对得到的对象加以修改即可。在这
个例子中，可以作为另一个对象基础的是 person 对象，于是我们把它传入到 object() 函数中，然后该
函数就会返回一个新对象。这个新对象将 person 作为原型，所以它的原型中就包含一个基本类型值属性
和一个引用类型值属性。这意味着 person.friends 不仅属于 person 所有，而且也会被 anotherPerson
以及 yetAnotherPerson 共享。实际上，这就相当于又创建了 person 对象的两个副本。    

- ECMAScript 5 通过新增 Object.create() 方法规范化了原型式继承.
- 在传入一个参数的情况下，Object.create() 与 object() 方法的行为相同。
- Object.create() 方法的第二个参数与 Object.defineProperties() 方法的第二个参数格式相同：每个属性都是通过自己的描述符定义的。以这种方式指定的任何属性都会覆盖原型对象上的同名属性。
- 包含引用类型值的属性始终都会共享相应的值，就像使用原型模式一样。

``` 
function object(o) {
    function F() {
    }
    F.prototype = o;
    return new F();
}
let person = {
    name: 'Nicholas',
    friends: ['Shelby', 'court', 'van']
}
let anotherPerson = Object.create(person, {
    name: {
        value: 'Greg'
    }
});
console.log(anotherPerson.name);  // Greg
```

### 寄生式继承
寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该
函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。

```
function object(o) {
    function F() {
    }
    F.prototype = o;
    return new F();
}
function createAnother(original) {
    let clone = object(original); // 通过调用构造函数创建一个新对象
    clone.sayHi = function () { // 以某种方式来增强这个对象
        console.log('hi');
    };
    return clone;   // 返回这个对象
}
let person = {
    name: 'Nicholas',
    friends: ['shelby', 'court', 'Van']
};
let anotherPerson = createAnother(person);
anotherPerson.sayHi(); // hi 
```
> 使用寄生式继承来为对象添加函数，会由于不能做到函数复用而降低效率；这一点与构造函数模式类似

### 寄生组合式继承

- 问题：组合继承最大的问题就是无论什么情况下，都会调用两次超类型构造函数：一次是在创建子类型的时候，另一次是在子类型构建函数内部。
- 子类型最终会包含超类型的全部实例属性。

```
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};
function SubType(name, age){
    SuperType.call(this, name); // 第二次调用 SuperType()
    this.age = age;
}
SubType.prototype = new SuperType(); // 第一次调用 SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    console.log(this.age);
}; 
```
- 第一次调用 SuperType 构造函数时，SubType.prototype 会得到两个属性：name 和 colors; 它们都是 SuperType 的实例属性，只不过现在位于 SubType 的原型中。
- 当调用 SubType 构造函数时，又会调用一次 SuperType 构造函数，这一次又在新对象上创建了实例属性 name 和 colors。于是，这两个属性就屏蔽了原型中的两个同名属性。

**寄生组合式继承**
- 不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已
- 本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。

```
function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype);  // 创建对象
    prototype.constructor = subType;              // 增强对象
    superType.prototype = prototype;              // 指定对象
} 
```
> 这个示例中的 inheritPrototype() 函数实现了寄生组合式继承的最简单形式。这个函数接收两
  个参数：子类型构造函数和超类型构造函数。在函数内部，第一步是创建超类型原型的一个副本。第二
  步是为创建的副本添加 constructor 属性，从而弥补因重写原型而失去的默认的 constructor 属性。
  最后一步，将新创建的对象（即副本）赋值给子类型的原型。这样，我们就可以用调用 inheritPrototype() 函数的语句，去替换前面例子中为子类型原型赋值的语句了，例如：

```
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
    console.log(this.age);
} 
```
- 这个例子的高效率体现在它只调用了一次 SuperType 构造函数，并且因此避免了在 SubType.prototype 上面创建不必要的、多余的属性。
- 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf() 。

## 小结

ECMAScript 支持面向对象（OO）编程，但不使用类或者接口。对象可以在代码执行过程中创建和
增强，因此具有动态性而非严格定义的实体。在没有类的情况下，可以采用下列模式创建对象。
- 工厂模式，使用简单的函数创建对象，为对象添加属性和方法，然后返回对象。这个模式后来被构造函数模式所取代。
- 构造函数模式，可以创建自定义引用类型，可以像创建内置对象实例一样使用 new 操作符。不过，构造函数模式也有缺点，即它的每个成员都无法得到复用，包括函数。由于函数可以不局限于任何对象（即与对象具有松散耦合的特点），因此没有理由不在多个对象间共享函数。
- 原型模式，使用构造函数的 prototype 属性来指定那些应该共享的属性和方法。组合使用构造函数模式和原型模式时，使用构造函数定义实例属性，而使用原型定义共享的属性和方法。

JavaScript 主要通过原型链实现继承。原型链的构建是通过将一个类型的实例赋值给另一个构造函
数的原型实现的。这样，子类型就能够访问超类型的所有属性和方法，这一点与基于类的继承很相似。
原型链的问题是对象实例共享所有继承的属性和方法，因此不适宜单独使用。解决这个问题的技术是借
用构造函数，即在子类型构造函数的内部调用超类型构造函数。这样就可以做到每个实例都具有自己的
属性，同时还能保证只使用构造函数模式来定义类型。使用最多的继承模式是组合继承，这种模式使用
原型链继承共享的属性和方法，而通过借用构造函数继承实例属性。此外，还存在下列可供选择的继承模式。
- 原型式继承，可以在不必预先定义构造函数的情况下实现继承，其本质是执行对给定对象的浅复制。而复制得到的副本还可以得到进一步改造。
- 寄生式继承，与原型式继承非常相似，也是基于某个对象或某些信息创建一个对象，然后增强对象，最后返回对象。为了解决组合继承模式由于多次调用超类型构造函数而导致的低效率问题，可以将这个模式与组合继承一起使用。
- 寄生组合式继承，集寄生式继承和组合继承的优点与一身，是实现基于类型继承的最有效方式。

# 第六章 函数表达式

## 递归

递归函数是在一个函数通过名字调用自身的情况下构成的。

```
// 严格模式下禁止使用arguments.callee
function factorial(num) {
    if (num < 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
} 
// 更稳妥的方式。实现阶乘递归
let factorial = (function f(num) {
    if (num < 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});
```

## 闭包 ？

- 闭包是指有权访问**另一个函数作用域**中的变量的**函数**
- 闭包常见的创建方式，就是在一个函数内部，创建另一个函数，并调用外层函数的变量。
- 内部定义的函数会将外部函数的活动对象添加到它的作用域中。
- **闭包会引用包含函数的整个活动对象**，如果要释放某个内存，显式的设置为null，

```
function makeSize(size) {
    return function () {
        document.body.style.fontSize = size + 'px';
    }
}
btn1.onclick = makeSize(12);
btn2.onclick = makeSize(14); 
```
- **在 createComparisonFunction() 函数内部定义的匿名函数的作用域链中，实际上将会包含外部函数 createComparisonFunction() 的活动对象。**

```
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
let compare = createComparisonFunction('name');
let result = compare({name: 'Nicholas'}, {name: 'Greg'}); 
```

在匿名函数从 createComparisonFunction() 中被返回后，它的作用域链被初始化为包含createComparisonFunction() 函数的活动对象和全局变量对象。这样，匿名函数就可以访问在createComparisonFunction() 中定义的所有变量。更为重要的是， createComparisonFunction()函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换句话说，当 createComparisonFunction() 函数返回后，其执行环境的作用域链会被销毁，但它的活动对象仍然会留在内存中；直到匿名函数被销毁后， createComparisonFunction() 的活动对象才会被销毁

```
// 创建函数
let compare = createComparisonFunction('name');

//调用函数
let result = compare({name: 'Nicholas'}, {name: 'Greg'});

//解除对匿名函数的引用（以便释放内存）
compare = null; 
```
首先，创建的比较函数被保存在变量 compareNames 中。而通过将 compareNames设置为等于 null解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域(除了全局作用域）也都可以安全地销毁了。

### 闭包与变量 ？

- 作用域链的这种配置机制引出了一个副作用，即闭包只能取得包含函数中任何变量的最后一个值。
- 闭包保存的是整个变量对象，而不是某个特殊的值。

### 关于this对象 ?

- 全局函数中，this 等于 window
- 当函数被作为某个对象的方法调用时，this等于那个对象。
- 匿名函数的执行环境具有全局性，因此其this对象通常指向window

```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下） 
```
以上代码先创建了一个全局变量 name ，又创建了一个包含 name 属性的对象。这个对象还包含一
个方法—— getNameFunc() ，它返回一个匿名函数，而匿名函数又返回 this.name 。由于 getNameFunc()
返回一个函数，因此调用 object.getNameFunc()() 就会立即调用它返回的函数，结果就是返回一个
字符串。然而，这个例子返回的字符串是 "The Window" ，即全局 name 变量的值。为什么匿名函数没
有取得其包含作用域（或外部作用域）的 this 对象呢？

前面曾经提到过，每个函数在被调用时都会自动取得两个特殊变量： this 和 arguments 。内部函
数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量不过，把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了，如下所示。

```
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name;
        };
    }
};
console.log(object.getNameFunc()()); // My Object 
```

### 内存泄漏

- IE9之前，显式的设置对象为null,释放内存。

## 模仿块级作用域

```
(function () {
   // 这里是块级作用域
})(); 
```
这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函
数执行完毕，就可以立即销毁其作用域链了。

## 私有变量 ？

- 任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。
- 私有变量包括函数的参数、局部变量和在函数内部定义的其他函数。

































