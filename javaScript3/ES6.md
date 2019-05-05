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

# Class 继承

- Class 可以通过 **extends** 关键字实现继承.
- **super** 表示父类的构造函数, 用来创建父类的 **this** 对象
- **子类必须在 constructor 方法中调用 super 方法**, 否则新建实例时会报错. 这是因为子类自己的 this 对象, 必须先通过父类的构造函数完成塑造, 得到与父类同样的实例属性和方法, 然后再对其进行加工, 加上子类自己的实例属性和方法. 如果不调用 super 方法, 子类就得不到 this 对象.
- 如果子类没有定义 constructor 方法, 这个方法会被默认添加.
    ```javascript
    class ColorPoint extends Point {
    }
    
    // 等同于
    class ColorPoint extends Point {
      constructor(...args) {
        super(...args);
      }
    }
    ```
- **注意点: 在子类的构造函数中, 只有调用 super 之后, 才可以使用 this 关键字.**
- 父类的静态方法, 也会被子类继承.

## Object.getPrototypeOf()

- Object.getPrototypeOf 方法可以用来从子类上获取父类.
- 因此,可以使用这个方法判断,一个类是否继承了另一个类
```javascript
console.log(Object.getPrototypeOf(ColorPoint) === Point); // true
```

## super 关键字
- super 关键字, 可以当作函数使用, 也可以当作对象使用. 在这两种情况下, 它的用法完全不同.
- **作为函数调用时:** super 代表调用父类的构造函数. 这是必须的, 否则 error. 
    ```javascript
    class A {}
    
    class B extends A {
      constructor() {
        super();
      }
    }
    ```
- **注意:** super 虽然代表了父类 A 的构造函数, 但是返回子类 B 的实例, 即 super 内部的 this 指的是 B 的实例.因此 super() 在这里相当于 
    ```javascript
    A.prototype.constructor.call(this)
    ```
- super() 作为函数时, 只能用在子类的构造函数中, 用在其他地方就会报错.
- **super 作为对象时: 在普通方法中, 指向父类的原型对象; 在静态方法中, 指向父类**
    ```javascript
    class A {
        p() {
            return 2;
        }
    }
    class  B extends A{
        constructor () {
            super()
            console.log(super.p()); // 2
        }
    }
    let b = new B(); 
    /* 上面代码中,子类 B 当中的 super.p(), 就是将 super 当作一个对象使用.
      这时, super 在普通方法之中, 指向 A.prototype, 所以 super.p() 就相当于
      A.prototype.p()
    */
    ```
- 注意: super 指向父类的原型对象, 所以定义在父类实例上的方法或属性, 是无法通过 super 调用的.
    ```javascript
    class A {
        constructor() {
            this.p = 2;
        }
    }
    class  B extends A{
        get m() {
            return this.p;
        }
    }
    let b = new B();
    console.log(b.m);// undefined
    // p 是父类 A 的实例属性, super.p 就引用不到它.
  
    // 如果属性定义在父类的原型对象上, super就可以取到
    class A {
        constructor() {
            this.p = 2;
        }
    }
    A.prototype.x = 2;
    class  B extends A{
        get m() {
            return super.x;
        }
    }
    let b = new B();
    console.log(b.x);// 2
    ```
- 在子类普通方法之中通过 super 调用父类的方法时, 方法内部的 this 指向当前的子类实例
    ```javascript
    class A {
        constructor() {
            this.x = 1;
        }
        print() {
            console.log(this.x);
        }
    }
    
    class B extends A {
        constructor() {
            super()
            this.x = 2;
        }
        m() {
            super.print();
        }
    }
    
    let b = new B()
    b.m();// 2
    ```

- 由于 this 指向子类实例, 所以如果通过 super 对某个属性赋值, 这时 super 就是 this, 赋值的属性会变成子类实例的属性
    ```javascript
    class A {
        constructor() {
            this.x = 1;
        }
    }
    
    class B extends A {
        constructor() {
            super()
            this.x = 2;
            super.x = 3;
            console.log(super.x); // undefined
            console.log(this.x); // 3
        }
        m() {
            super.print();
        }
    }
    
    let b = new B();
    /*super.x 赋值为 3, 这时等同于对 this.x 赋值为 3. 而当读取 super.x 的时候, 
      读取的是 A.prototype.x, 所以返回 undefined
   */
    ```
- **如果 super 作为对象, 用在静态方法之中, 这时 super 将指向父类, 而不是父类的原型对象**
    ```javascript
    class Parent {
        static myMethod(msg) {
            console.log('static', msg);
        }
        myMethod(msg) {
            console.log('instance', msg);
        }
    }
    class Child extends Parent {
        static myMethod(msg) {
            super.myMethod(msg);// 指向 Parent, 而不是 Parent.prototype
        }
        myMethod(msg) {
            super.myMethod(msg)
        }
    }
    Child.myMethod(1); // static 1
    
    let child = new Child();
    child.myMethod(2); // instance 2
    // super 在静态方法之中指向父类, 在普通方法之中指向父类的原型对象
    ```
- 在子类的静态方法中通过 super 调用父类的方法时, 方法内部的 this 指向当前的子类, 而不是子类的实例.
- 注意: 使用 super 的时候, 必须显示指定是作为函数, 还是作为对象使用, 否则会报错.
- 对象总是继承其他对象的, 所以可以在任意一个对象中, 使用 super 关键字.    
    ```javascript
    var obj = {
      toString() {
        return "MyObject: " + super.toString();
      }
    };
    
    obj.toString(); // MyObject: [object Object]
    ```
## 类的 prototype 属性和 \_\_proto\_\_ 属性
- 子类的 \_\_proto\_\_ 属性, 表示构造函数的继承, 总是指向父类
- 子类 prototype 属性的 \_\_proto\_\_ 属性, 表示方法的继承, 总是指向父类的 prototype 属性.   
   ```javascript
    class A{}
    class B extends A {}
    
    console.log(B.__proto__ === A); // true
    console.log(B.prototype.__proto__ === A.prototype); // true
    ``` 
> 上面代码中, 子类 B 的 \_\_proto\_\_ 属性指向父类 A, 子类 B 的 prototype 属性的 \_\_proto\_\_ 属性指向父类 A 的 prototype 属性.这样的结果是因为, 类的继承是按照下面的模式实现的.
```javascript
class A{}
class B {}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);
// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();
```
- 对象扩展中给出 Object.setPrototypeOf 方法的实现
```javascript
Object.setPrototypeOf = function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
// 因此得到了上面的结果

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;
```
> 这两条继承链, 可以这样理解: 作为一个对象, 子类 (B) 的原型 (\_\_proto\_\_ 属性)是父类 (A); 作为一个构造函数, 子类 (B) 的原型对象 (prototype属性) 是父类的原型对象 (prototype属性) 的实例.

## 原生构造函数的继承
- 原生构造函数是指语言内置的构造函数, 通常用来生成数据结构.
    - Boolean()
    - Number()
    - String()
    - Array()
    - Date()
    - Function()
    - RegExp()
    - Error()
    - Object()
- ES5 不能继承以上原生构造函数, 因为子类无法获取原生构造函数的内部属性. ES5 是先新建子类的实例对象 this, 再将父类的属性添加到子类上, 由于父类的内部属性无法获取, 导致无法继承原生的构造函数.
- ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。
    
# JSON
- JSON 对象
    - JSON.stringify
    - JSON.parse
- 简写
    - 名字跟值( key 和 value )一样的,写一个就行
    - 方法: show: function(){...}, 写为 show(){}

# Promise
- Promise 对象代表一个异步操作, 有三种状态: pending (进行中), fulfilled (完成) 和 rejected (失败). 只有异步操作的结果, 可以决定当前是哪一种状态.
- 一旦状态改变, 就不会再变, 任何时候都可以得到这个结果.

## 基本用法
- ES6 规定, Promise 对象是一个构造函数, 用来生成 Promise 实例. Promise 构造函数接受一个函数作为参数, 该函数的两个参数分别是 resolve 和 reject. 它们是两个函数, 由 JavaScript 引擎提供, 不用自己部署.
- resolve 函数的作用是, 将 Promise 对象的状态从 **'pending' 变为 'resolved'**, 在异步操作成功时调用, 并将异步操作的结果作为参数传递出去.
- reject 函数的作用是, 将 Promise 对象的状态从 **'pending' 变为 'rejected'**, 异步操作失败时调用, 并将异步操作的结果作为参数传递出去.
- Promise 实例生成以后, 可以用 then 方法分别指定 resolve 状态和 rejected 状态的回调函数.
    ```javascript
    promise.then(function(value) {
      // success
    }, function(error) {
      // failure
    });
    ```
- then 方法可以接受两个回调函数作为参数. 第一个回调函数是 Promise 对象的状态变为 resolved 时调用, 第二个回调函数是 Promise 对象的状态变为 rejected 时调用. 其中第二个函数是可选的.
- Promise 新建后就会立即执行
    ```javascript
    let promise = new Promise((resolve, reject) => {
        console.log('Promise');
        resolve();
    })
    promise.then(() => {
        console.log('resolved');
    })
    console.log('Hi');
    // Promise
    // Hi
    // resolved
    
    // Promise 新建后立即执行, 所以首先输出的是 Promise. 然后, then 方法指定的回调函数, 将在当前脚本所有同步任务执行完才会执行, 所以 resolved 最后输出.
    ```
- 一般来说, 调用 resolve 或 reject 以后, Promise 的使命就完成了, 后续操作应该放到 then 方法里面, 而不应该直接写在 resolve 或 reject 的后面. 所以, 最好在它们的前面加上 return 语句, 这样就不会有意外.
    
## Promise.prototype.then()    
- Promise 实例具有 then 方法, 也就是说, then 方法是定义在原型对象 Promise.prototype 上的. 它的作用是为 Promise 实例添加状态改变时的回调函数. **then 方法的第一个参数是 resolved 状态的回调函数, 第二个参数(可选) 是 rejected 状态的回调函数**.    
- then 方法返回的是一个新的 Promise 实例(注意,不是原来那个Promise实例). 因此可以采用链式写法, 即 then 方法后面再调用另一个 then 方法.
    
## Promise.prototype.catch()
- Promise.prototype.catch 方法是 .then(null, rejection) 或 .then(undefined, rejection) 的别名, 用于指定发生错误时的回调函数.    
    ```javascript
    getJSON('/posts.json').then(function(posts) {
      // ...
    }).catch(function(error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
    });
    /* 上面代码中, getJSON 方法返回一个 Promise 对象, 如果该对象状态变为 resolved, 则会调用 then 方法指定的回调函数; 如果异步操作抛出错误, 状态就变为 rejected, 就会调用 catch 方法指定的回调函数, 处理这个错误. 另外, then 方法指定的回调函数, 如果运行中抛出了错误, 也会被 catch 方法捕获. */
    ```  
- 如果 Promise 状态已经变成了 resolved, 再抛出错误是无效的. 因为 Promise 的状态一旦改变, 就永久保存该状态, 不会再变.     
- Promise 对象的错误具有'冒泡'性质, 会一直向后传递, 知道被捕获为止. 也就是说, 错误总是被下一个 catch 语句捕获.    
- 一般来说, 不要在 then 方法里面定义 Reject 状态的回调函数 (即 then 的第二个参数), 总是用 catch 方法.    
- 与传统的 try/catch 代码块不同的是, 如果没有使用 catch 方法指定错误处理的回调函数, Promise 对象抛出的错误不会传递到外层代码, 即不会有任何反应. **Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。** 
- 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。

## Promise.prototype.finally()
- finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的
- finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。finally本质上是then方法的特例。 

## Promise.all()
- Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
    ```javascript
    const p = Promise.all([p1,p2,p3]);
    ```    
- Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。    
- p的状态由p1、p2、p3决定，分成两种情况
    - 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数    
    - 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数
- 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

## Promise.race()
- Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
    ```javascript
    const p = Promise.race([p1, p2, p3]);
    ```
- Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。    
- 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。     

## Promise.resolve()
- 将现有对象转换为 Promise 对象, Promise.resolve 方法就起到该作用.
    ```javascript
    Promise.resolve('foo')
    // 等价于
    new Promise(resolve => resolve('foo')) 
    ```   
- **Promise.resolve 方法的参数分为四种情况**
    - **参数是一个 Promise 实例**. 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。
    - **参数是一个thenable对象**,Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法
    - **参数不是具有then方法的对象，或根本就不是对象**, 如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。
    - **不带有任何参数**, Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
- 需要注意的是，**立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时**。

## Promise.reject()
- Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
- 注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。

## Promise.try()
- 模拟 try 代码块, 实现 catch 捕获所有的同步和异步错误.
   
   
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

# Proxy















