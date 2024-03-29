## 01-JavaScript高级-邂逅

1. 机器语言=> 汇编语言=>高级语言
2. JavaScript解释型高级语言
3. V8引擎原理
   1. JS代码
   2. parse
   3. AST抽象语法树
   4. ignition
      1. 字节码
      2. 运行结果
   5. TurboFan热收集
   6. MachineCode 优化的机器码
   7. deoptimization => bytecode
   8. 运行结果
4. 执行上下文栈：**ECS（Execution Context Stack)**， 执行代码的调用栈
5. 全局执行栈：**GEC (Global Execution Context)**
   1. GEC会被放到ECS中执行
   2. GEC被放到ECS里面包含两部分内容：执行前代码VO（变量提升）
   3. 代码执行
6. 函数执行上下文：**FEC(Functional Execution Context)**
   1. **AO(Action Object)**: 包含形参、arguments、函数定义和指向函数对象、定义的变量
   2. **作用域链(Scope Chain)**：**由 VO和父级VO(ParentScope)组成**
   3. **thisValue**
7. 作用域链：VO（在函数中就是AO）和父级VO组成，查找时会一层层查找。
   1. 新的ECMA标准中，VO称呼变为VE（VariableEnvironment）

## 02-内存管理和内存泄露

0. 基本数据类型内存分配在栈空间；复杂数据类型会在堆内存中开辟一块空间，并且将这块空间的指针返回值变量引用

1. 代码被解析，V8引擎内部会帮助我们创建一个对象（GlobalObject => GO）

2. 运行代码
   1. V8为了执行代码，V8引擎内部会有一个执行上下文栈（Execution Context Stack, ECStack)函数调用栈
   2. 因为我们执行的是全局代码，为了全局代码能够正常的执行，需要创建全局上下文（Global Execution Context）（全局代码需要被执行时才会创建）
   2. 预解析阶段，VO(variable Object)指向GO，用到的变量会提前声明，值为undefined，函数指向一个内存地址。
   2. 执行阶段，遇到函数，生成函数执行上下文FEC，会创建一个VO对象，指向AO
   2. 函数执行完，释放内存，出栈。AO对象销毁。

3. 作用域链，由函数定义位置所决定。**预编译阶段就固定了**

   1. scope chain: VO + ParentScope(GO)

      ```js
      var message = 'Hello Global'
      function foo(){
        console.log(message) // Hello Global 函数解析阶段已经确认了作用域链。父级window
      }
      function bar() {
        var message = 'Hello Bar'
      }
      bar()
      ```

   2. 函数预解析阶段，不管return语句

4. GC（Garbage Collection）垃圾回收

   1. 引用计数。指向当前对象的引用数0时，垃圾回收。缺点：循环引用问题
   2. 标记清除。设置一个根对象，垃圾回收器会定期从这个根开始，找所有从根开始有引用到的对象，对于没有引用到的对象，就认为是不可用对象


## 03-闭包 

1. 高阶函数
   1. 如果一个函数接受另外一个函数作为参数，或者该函数会返回另一个函数作为返回值，这个函数就称之为高阶函数
2. 闭包实现上是一个结构体，它存储了一个函数和一个关联的环境
   1. JS中一个函数，如果访问了外层作用域的变量，那么它是一个闭包

3. 闭包的销毁
   1. 赋值为：null

## 04-内存溢出

- 变量未使用，自动回收
- GO不定时回收内存空间

## 05-this的指向

1. 全局作用域下
   1. 浏览器：window(globalObject)
   2. Node环境：{}。*每个环境被当成一个模块来处理*

2. 绑定规则
   1. 默认绑定
      1. **独立函数调用，指向window**
   2. 隐士绑定
      1. **`object.fn()`: object 对象会被 JS 引擎绑定到 fn 函数中 this 里面**
   3. 显示绑定
      1. **JavaScript所有的函数都可以使用call和apply方法**
      2. call的参数为参数列表；applay的参数为数组
      3. **bind（this），返回一个新的函数**
      4. **显示绑定优先级大于隐式绑定**
   4. new绑定
      1. **this === new绑定出来的对象**

3. 规则优先级

   1. 默认规则的优先级最低

   2. **显示高于隐式绑定**

      1. ```js
         function foo() {
             console.log(this) // abc
         }
         let obj = {
             name: 'obj',
             foo: foo.bind('abc')
         }
         obj.foo()
         ```

   3. **new 高于隐式绑定**

   4. new 关键字不能与apply、call一起使用。new的优先级高于bind

   5. **call、apply、bind传入null和undefined，自动将 this 绑定至全局对象**

4. **异常问题**

   ```js
   let obj1 = {
       name: 1,
   } // 此处需要加分号
   ;[(1, 2, 3, 4)].forEach(element => {
       // Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
       console.log(element)
   })
   ```

5. **箭头函数**

   1. **不会绑定this、arguments**

   2. 箭头函数不能用new来调用

   3. 如果函数执行体只有一行代码，`{}` 可以省略。

      1. **默认将这行代码的执行结果作为返回值**

      ```js
      let bar = () => ({name: 'yyb', age: 12}) // 箭头函数返回一个对象的简写
      ```

   4. 箭头函数的 this 绑定，从上层作用域中查找

## 06-手写bind

```js
Function.prototype.myBind = function(targetObj, ...bindArgs) {
    // 对传入的对象进行数据处理，如果是真值，则Object包装下。否则指向window
    targetObj = targetObj ? Object(targetObj) : window
    // 将this绑定至传入的对象
    targetObj.fn = this
    // 返回一个新的函数，传入参数，与原函数的参数重叠
    return function (...newArgs) {
        let args = [...bindArgs, ...newArgs]
        return targetObj.fn(...args)
    }
}
function showCall(a, b, c) {
    console.log(`a, b, c`, a, b, c)
    console.log('myCall is running', this);
}
let c = showCall.myBind('123', [1, 2])
console.log(c(3), 'c333')
```



## 07-柯里化函数

```js
function foo(m) {
    return function (n) {
        return function(x) {
            return function(y) {
                return m + n + x + y
            }
        }
    }
}
console.log(foo(1)(2)(3)(4));

// 柯里化简写
let foo2 = x => y => z => x+y+z
console.log(foo2(1)(2)(3));
```

- 让函数的职责单一
- 逻辑的复用

### 自动柯里化实现

```js
// 自动柯里化
function myCurrying(fn) {
    return function curried(...args) {
        // 当已经传入的参数大于等于需要的参数时，就执行函数
        // 参数满足，直接执行
        if (args.length >= fn.length) {
            // fn(...args)
            // fn.call(this, ...args)
            return fn.apply(this, args)
        } else {
             // 参数不满足时：返回一个新的函数，继续接收参数
            return function curried2(...args2) {
                // 递归调用curried来检查函数的个数是否达到
                return curried.apply(this, [...args, ...args2])
            }
        }
    }
}
```

### 高阶柯里化自动执行

```js
function double(m) {
    return m * 2
}
function square(n) {
    return n ** 2
}

// 实现先执行double获取返回值，再执行square
function hyCompose(...fns) {
    let length = fns.length
    for (let i = 0; i < length; i++) {
        if (typeof fns[i] !== 'function') {
            throw new TypeError('excepted arguments are functions')
        }
    }

    return function (...args) {
        let index = 0
        // 数组长度如果为0，则直接返回参数
        let result = length ? fns[index].apply(this, args) : args
        while(++index < length) {
            // 索引递增，继续执行下一个函数
            result = fns[index].call(this, result)
        }
        return result
    }
}

let newFn = hyCompose(double, square)
console.log(newFn(12)) // 576
```

## 08-对象

```js
Object.defineProperty(someObj, xxx, {
  configurable: true,
  enumerable: true,
  get(){
    console.log('get')
  },
  set(){
    console.log('set')
  }
})

// ===============等价于================
someObj = {
  // 默认可枚举、可配置
  set age(value) {},
  get age() {}
}
```

- `Object.preventExtensions(obj)`，禁止对象继续添加新的属性
- `Object.seal(obj)`，密封一个对象。不可配置、不可删除。**属性值可以修改**
- `Object.freeze(obj)`，不可删除、不可配置，**不可修改属性值**

## 09-面向对象

 ### 工厂函数

无法区分对象的类型

### 构造函数

1. 创建一个空对象
2. 将构造函数的`protytype`赋值到该对象的`__proto__`
3. 绑定this绑定，指向该空对象
4. 进行属性赋值
5. 如果没有返回对象，则默认返回该对象

