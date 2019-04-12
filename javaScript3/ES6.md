# 变量
- var
    - 可以重复声明
    - 无法限制修改
    - 没有块级作用域
- let: 不能重复声明, 变量可以修改,块级作用域
- const: 不能重复声明,常量不能修改,块级作用域

# 箭头函数
- 只有一个参数时括号可以省略
- 只有一个 return 时, 大括号可以省略

# 函数
- 参数扩展/数组展开  ...
- 默认参数

# 解构赋值
- 左右两边结构必须一样
- 右边必须是合法的语句
- 声明和复制不能分开(必须一句话里完成)

# 数组
- map 映射-------------一个对一个
- reduce 汇总----------一堆算出来一个
    - 参数: prev, cur, index, arr
- filter --------------过滤器
- forEach--------------迭代
- includes-------------包含
- keys/values/entries

## for/in 与 for/of

方式|数组|json    
---|---|---
for/in|下标key|key
for/of|值value|error

- for/in 专用于对象/无序对象
- for/of 专用于数组
- keys/values/entries实体

```
let arr = [123,4,23,11]
for (let i of arr.entries()) {
    console.log(i);
} 
```


# 字符串
- startsWith('http')----------以http开头
- endsWith('.txt')------------以txt结尾的
- 模板字符串   

# 面向对象
- class 关键字,构造器和类分开
- class 里面直接加方法

## 继承
- extends
- super 超类,代表父类构造函数

# JSON
- JSON 对象
    - JSON.stringify
    - JSON.parse
- 简写
    - 名字跟值( key 和 value )一样的,写一个就行
    - 方法: show: function(){...}, 写为 show(){}

# Promise
- new Promise(function(resolve, reject){})
- 一次读一堆数据请求
    
# generator 生成器

```
function *show() {
    alert('a')
    yield;
    alert('b')
}
let genObj = show(); // Generator 对象
genObj.next()
genObj.next() 
```

- 逻辑性    
    
# Math 新增方法
- 3**8-------3的8次方


# Symbol

## 概述
- 一种新的数据类型,独一无二的值. Symbol 值通过 Symbol 函数生成, 也就是说, 对象的属性名现在可以有两种类型, 一种是原来就有的字符串, 另一种就是新增的 Symbol 类型. 凡是属性名属于 Symbol 类型, 就都是独一无二的, 保证不会与其他属性名冲突.
- Symbol 函数前不能使用 new 命令, 否则会报错. 因为 Symbol 是一个原始类型的值, 不是对象. 一种类似于字符串的数据类型
- 可以接受一个字符串作为参数, 表示对 Symbol 实例的描述, 主要是为了在控制台显示, 或者转为字符串时, 比较容易区分.
- 如果 Symbol 的参数是一个对象, 就会调用该对象的 toString 方法, 将其转换为字符串, 然后才生成一个 Symbol 值
- **相同参数的 Symbol 函数的返回值是不相等的**
- Symbol 值不能与其他类型的值进行运算.**可以显示转换为字符串**
- Symbol 值也可以转换为布尔值, 但是不能转为数值

## 作为属性名的 Symbol

- Symbol 值可以作为标识符, 用于对象的属性名,就能保证不会出现同名的属性.
- **Symbol 值作为对象属性名时, 不能用点运算符**. 因为点运算符后面总是字符串, 所有不会读取 Symbol 作为标识名所指代的那个值. **类型不同, 字符串与 Symbol**
    ```javascript
    const mySymbol = Symbol()
    const a = {}
    
    a.mySymbol = 'Hello'
    console.log(a[mySymbol]); // undefined
    console.log(a['mySymbol']); // Hello 
    ```
- **同理, 在对象的内部, 使用 Symbol 值定义属性时, Symbol 值必须放在方括号之中**
    ```javascript
    let s = Symbol()
    let obj = {
        [s]: function (arg) {
            console.log(arg);
        }
    }
    obj[s](123); // 123
    // 上面代码中,如果 s 不是放在方括号中, 该属性的键名就是字符串 s, 而不是 s 所代表的那个 Symbol 值.
    
    // 采用增强的对象写法, 上面代码的 obj 对象可以写得更简洁一些
    let s = Symbol()
    let obj = {
        [s](arg) {
            console.log(arg);
        }
    }
    obj[s](13); // 13
    ```
- Symbol 值作为属性名时, 该属性是公共属性,不是私有属性.
- 适合用于消除魔术字符串

## 属性名的遍历
- Symbol 作为属性名, 该属性不会出现在 **for...in, for...of**循环中,也不会被 Object.keys(), Object.getOwnPropertyNames(), JSON.stringify()返回.
- 通过Object.getOwnPropertySymbols 方法,返回一个数组,可以获取指定对象的所有 Symbol 属性名. 
- Reflect.ownKeys(obj),可以返回所有类型的键名, 包括常规键名和 Symbol 键名. 

## Symbol.for(), Symbol.keyFor()
- Symbol.for(), 接受一个字符串作为参数,搜索有没有以该参数作为名称的 Symbol 值. 如果有则返回该 Symbol, 否则创建一个新的 Symbol 值.
- **Symbol.for() 与 Symbol() 区别: 前者会被登记在全局环境中供搜索,后者不会.**. Symbol.for() 不会每次调用就返回一个新的 Symbol 类型的值, 而是先检查给定的 key 是否已经存在, 如果不存在才会创建一个值.
    ```javascript
    Symbol.for('bar') === Symbol.for('bar') // true
    Symbol('bar') === Symbol('bar') // false 
    ```
- Symbol.keyFor(),可以返回一个已登记的 Symbol 类型值的 key
- Symbol.for() 为 Symbol 值登记的名字, 是全局环境, 可以在不同的 iframe 或 service worker 中取到同一个值.

## 内置的 Symbol 值
- Symbol.hasInstance 属性,指向一个内部方法. 当其他对象调用 instanceof 运算符时,判断是否为该对象的实例时,会调用这个方法. 如 foo instanceof Foo 在语言内部, 实际调用 Foo\[Symbol.hasInstance\](foo)
    ```
    class MyClass {
        [Symbol.hasInstance](foo) {
            return foo instanceof Array;
        }
    }
    
    console.log([1, 2, 3] instanceof new MyClass()); // true 
    ```
- Symbol.isConcatSpreadable 等于一个布尔值, 表示该对象用于 Array.prototype.concat() 时,是否可以展开. 数组默认为 true (默认可以展开), 对象为 false
- Symbol.species 属性, 指向一个构造函数. 创建衍生对象时, 使用该属性
- Symbol.match 属性,指向一个函数. 当执行 str.match(myObject) 时, 如果属性存在, 调用并返回该方法的返回值.
- Symbol.replace 属性, 指向一个方法, 当该对象被 String.prototype.replace 方法调用时, 会返回该方法的返回值. 接收两个参数, 第一个参数是 replace 方法正在作用的对象, 第二个参数是替换后的值.
- Symbol.search 属性, 指向一个方法, 当该对象被 String.prototype.search 方法调用时, 会返回该方法的返回值.
- Symbol.split 属性, 指向一个方法, 当该对象被 String.prototype.split 方法调用时,会返回该方法的返回值.
- Symbol.iterator 属性, 指向该对象的默认遍历器方法
- Symbol.toPrimitive 属性, 指向一个方法. 该对象被转为原始类型的值时,会调用这个方法,返回该对象对应的原始类型值.接收一个字符串参数,表示当前运算的模式, Number\String\Default
- Symbol.toStringTag 属性, 指向一个方法.在该对象上调用 Object.prototype.toString 方法时, 如果这个属性存在, 它的返回值会出现在 toString 方法返回的字符串中,表示对象的类型. **这个属性可以用来定制\[object Object\]或\[object Array\] 中 object 后面的那个字符串.**
- Symbol.unscopables 属性, 指向一个对象. 该对象指定了使用 with 关键字时, 哪些属性会被 with 环境排除.
















