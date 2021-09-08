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
