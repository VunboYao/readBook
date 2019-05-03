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
- for (let index of arr.keys()){}

```
let arr = [123,4,23,11]
for (let i of arr.entries()) {
    console.log(i);
} 
```

# 字符串
- startsWith('http')----------以http开头
- endsWith('.txt')------------以txt结尾的
- padStart(minLen, str), 第一个参数为指定参数的最小长度,第二个参数用来补全字符串. 如果省略第二个参数, 则用空格来补全
- padEnd(minLen, str)
- 模板字符串   

# 面向对象

## class 关键字,定义类
- class 中有个 constructor 方法, 这就是构造方法, **this 关键字** 则代表实例对象.
- class 中定义方法时, **不需要** 添加 **function** 关键字, 方法之间**不需要逗号分隔**
    ```javascript
    class Point {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }
        toString() {
            return `(${this.x}, ${this.y})`;
        }
    }
    let p = new Point(1,2);
    console.log(typeof Point); // function
    console.log(Point === Point.prototype.constructor); // true
    ``` 
- **类的数据类型就是函数, 类本身就指向构造函数**
- 构造函数的 prototype 属性, 在 ES6 的 '类'上面继续存在. 事实上, 类的所有方法都定义在类的 prototype 属性上面
- 由于类的新方法可以添加在 prototype 对象上面. Object.assign 方法可以很方便的一次向类添加多个方法
    ```javascript
    class Point {
        constructor(x,y) {
           
        }
    }
    Object.assign(Point.prototype,{
        toString(){},
        toValue(){}
    });
    ```
- **类的内部所有定义的方法, 都是不可枚举的(non-enumerable)**, 无法通过 Object.keys(Point.prototype) 获取方法. **ES5 中方法可以枚举.**

## constructor

- constructor 方法是类的**默认方法**, 通过 new 命令生成对象时, 自动调用该方法. **必须有 constructor 方法**, 没有显示定义, 一个空的 constructor 方法会被默认添加
- constructor 方法**默认返回实例对象 (即 this)**, 可以指定返回**另外一个对象**. 则 instanceof 方法会返回 false
- **必须通过 new 调用**,否则回报错.

## 类的实例
- 与 ES5 一样, 实例的属性除非显示定义在其本身 (即定义在 **this** 对象上), 否则都是定义在原型上 (即定义在 **class** 上)
- hasOwnProperty(propertyName) ：用于检查给定的属性在当前对象实例中（而不是在实例
的原型中）是否存在。其中，作为参数的属性名（ propertyName ）必须以字符串形式指定（例如： o.hasOwnProperty("name") ）。
- 与 ES5 一样, 类的所有实例共享一个原型对象. 可以通过 **\_\_proto\_\_** 为"类"添加方法,但最好不要.

## 取值函数 (getter) 和存值函数 (setter)

- 与 ES5 一样, 在'类'的内部可以使用 get 和 set 关键字, 对某个属性设置存值函数和取值函数,拦截该属性的存取行为.
    ```javascript
    class Myclass {
        constructor(){}
        get prop() {
            return 'getter';
        }
        set prop(value) {
            console.log('setter: ' + value);
        }
    }
    let demo = new Myclass()
    demo.prop = 123; // setter: 123
    console.log(demo.prop); // getter
    ```
- 存值函数和取值函数是设置在属性的 Descriptor 对象上的. 与 ES5 完全一致

## 属性表达式
- 类的属性名,可以采用表达式
    ```javascript
    let methodName = 'getA'
    class Square{
        constructor(le) {}
        [methodName]() {}
    }
    ```

## Class 表达式
- 与函数一样, 类也可以使用表达式的形式定义
- 采用 class 表达式, 可以写出立即执行的 class
    ```javascript
    let person = new class {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    }('yyb')
    person.sayName();// yyb
    ```

## 注意点:
- 默认严格模式
- 类**不存在变量提升** (hoist), 与 ES5 完全不同
- name 属性总是返回紧跟在 class 关键字后面的类名.
- 如果方法之前加上星号(*),表示该方法是一个 Generator 函数.
- this 的指向,默认指向类的实例.

## 静态方法
- 类相当于实例的原型, 所有在类中定义的方法, 都会被实例继承. 如果在一个方法之前, 加上 static 关键字, 就表示该方法不会被实例继承, 而是直接通过类来调用. 这就称为 **"静态方法"**
    ```javascript
    class Foo {
        static classMethod() {
            console.log('hello');
        }
    }
    Foo.classMethod(); // hello
    
    let foo = new Foo()
    foo.classMethod(); // TypeError: foo.classMethod is not a function
    ```
- **如果静态方法包含 this 关键字, 这个 this 指的是类,而不是实例**
- 静态方法可以与非静态方法重名, 父类的静态方法, 可以被子类继承. 静态方法也可以从 super 对象上调用

## 实例属性的新写法
- 实例属性除了定义在 constructor() 方法里面的 this 上面, 也可以定义在类的最顶层
- 实例属性与方法在同一层级, 不需要在实例属性前面加上 this

## 静态属性
- 静态属性指的是 Class 本身的属性, 即 **Class.propName**, 而不是定义在实例对象 (this) 上的属性.
    ```javascript
    class Foo{}
    
    Foo.prop = 1;
    console.log(Foo.prop); // 1
    ```
- 目前,只有这种写法可行, 因为 ES6 明确规定, Class 内部只有静态方法, 没有静态属性.
- 有一个提案: 在实例属性的前面,加上 static 关键字.
    ```javascript
    class Foo{
        static prop = 1;
        constructor() {
            console.log(Foo.prop);
        }
    }
    ```

## 私有方法和私有属性
- 私有方法和私有属性, 是只能在类的内部访问的方法和属性, 外部不能访问. 这是常见需求,有利于代码的封装, 但 ES6 不提供, 只能通过变通方法实现.
- 一种是在命名上加以区别. 如 _bar. 方法前加上下划线,表示一个只限内部使用的方法. 但是不保险, 在类的外部, 还是可以调用到这个方法.
- 另一种方法索性将私有方法移出模块, 因为模块内部的所有方法都是对外可见的.
- 还有一种方法是利用 **Symbol** 值的唯一性, 将私有方法的名字命名为一个 Symbol 值. 但是也不是绝对不行, Reflect.ownKeys() 依然可以拿到它们.

## 私有属性的提案
- 在属性名前加上'#'表示私有属性.
- 只能在内部使用,在类的外部使用则报错.
- 也可以用于私有方法
- 私有属性也可以设置 getter 和 setter 方法
- 私有属性不限于从 this 引用, 只要是在类的内部, 实例也可以引用私有属性.
- 私有属性和私有方法前面, 也可以加上 static 关键字, 表示这是一个静态的私有属性或私有方法.

## new.target 属性

new 是从构造函数生成实例对象的命令. ES6 为 new 命令引入了一个 new.target 属性, 该属性一般用在构造函数之中, **返回 new 命令作用的那个构造函数**. 如果构造函数不是通过 new 命令或 Reflect.construct() 调用的. new.target 会返回 undefined, 因此这个属性可以用来确定构造函数是怎么调用的.
```javascript
function Person(name) {
    if (new.target !== undefined) {
        this.name = name;
    } else {
        throw new Error('please use new command')
    }
}
// 另一种写法
function Person(name) {
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('please use new command')
    }
}
let person = new Person('yb'); // 正确
let notAPerson = Person.call(person, 'yb'); // error
```
```javascript
// Class 内部调用 new.target, 返回当前 Class
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}
let obj = new Rectangle(3,4); // true
```
- 需要注意的是, 子类继承父类时, new.target 会返回子类.

```javascript
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
    }
}
class Square extends Rectangle {
    constructor(length,width) {
        super(length, width)
    }
}

let obj = new Square(3,4); // false
console.log(obj); // Square
```

- 利用这个特点,可以写出不能独立使用,必须继承后才能使用的类

```javascript
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
    }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
- 上面的代码, Shape 类不能被实例化, 只能用于继承. 注意, 在函数外部, 使用 new.target 会报错.

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
- **new: ES2019 新增实例属性 description, 直接返回 Symbol 的描述**

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
















