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

![1630651417544](C:\Users\VunboYao\AppData\Roaming\Typora\typora-user-images\1630651417544.png)

4. 执行上下文栈：ECS
5. 全局执行栈：GEC
6. 函数执行上下文：FEC
7. 作用域链：VO（在函数中就是AO）和父级VO组成，查找时会一层层查找。
   1. 新的ECMA标准中，VO称呼变为VE（VariableEnvironment）

## 02-内存管理和内存泄露

1. 代码被解析，V8引擎内部会帮助我们创建一个对象（GlobalObject => GO）
2. 运行代码
   1. V8为了执行代码，V8引擎内部会有一个执行上下文栈（Execution Context Stack, ECStack)函数调用栈
   2. 因为我们执行的是全局代码，为了全局代码能够正常的执行，需要创建全局上下文（Global Execution Context）（全局代码需要被执行时才会创建）

3. 作用域链，由函数定义位置所决定。预编译阶段就固定了

## 03-闭包

1. 高阶函数
   1. 如果一个函数接受另外一个函数作为参数，或者该函数会返回另一个函数作为返回值，这个函数就称之为高阶函数

2. 闭包的销毁
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

