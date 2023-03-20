# TypeScript回顾

## 1-JavaScript 有什么缺点？ TypeScript 弥补了 JavaScript 什么缺点？

缺点：

- ES5之前使用var关键字作用域的问题
- 最初JavaScript设计的数组类型并不是连续的内存空间
- 直到今天, JavaScript 也没有加入类型检测这一机制

类型检测带来的好处：

- 错误出现的越早越好
  - 能在写代码时候发现的错误，不在编译时发现
  - 能在编译时发现错误，就不在代码运行期间发现(类型检测可以做到)
- JavaScript 目前做不到

**TypeScript弥补了JavaScript的类型缺失**

JavaScript所拥有的特性，TypeScript全部都是支持的。紧随ECMAScript的标准，支持ESNext的新标准语法

TypeScript在实现新特性的同时，总是保持和ES标准的同步甚至是领先

语言层面上：不仅仅增加了类型约束，还有语法扩展，如枚举、元组等

最终会被编译成 JavaScript

## 2-TypeScript 有什么特点？哪些框架或者项目在使用TypeScript？

特点：

- 始于JavaScript，归于JavaScript
- TypeScript是一个强大的工具，用于构建大型的项目
  - 配合高效的开发工具，让静态类型检查能够在项目中大显光彩
  - 类型是可选的，类型推断能够提升编码效率
- 拥有先进的JavaScript

使用TypeScript	

- Angular
- Vue3
- VSCode
- Ant-Design
- Element-Plus
- 小程序

## 3-TypeScript的运行环境如何搭建？如何运行TypeScript 代码？

安装TypeScript

`npm install typescript -g`

查看版本

`tsc --version`

**Webpack 配置**

https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw;

**使用ts-node**

安装

`npm i ts-node -g`

`ts-node`依赖

`npm i tslib @types/node -g`

运行

`ts-node xxx.ts`

## 4-如何定义TypeScript的变量，定义变量支持哪些JavaScript类型

- 类型注解

`let/const 标识符：数据类型 = 赋值`

如：`let message:string = "Hello world"`

**string(基础类型)是小写的，和String(包装对象)有区别**

- 支持哪些JavaScript类型

  - number
  - boolean
  - string
  - Array
  - object
  - null
  - undefined
  - Symbol

  - Function

## 5-常见的TypeScript特有类型有哪些？这些类型有什么作用？

- any: 万物皆可any
- unknown: 更加安全的初始类型声明，不能在unknown类型上做任何操作
- void: 无返回或者返回的是undefined
  - 针对函数的返回如果是void，也可以是返回null/undefined.**因为null和undefined是所有类型的子类型**

- never 表示永远不会发生的类型
- typle元组：useState

## 6-什么是联合类型和交叉类型，它们有什么区别？

**联合类型**

- 由两个或者多个其他类型组成的类型，使用符号‘’|‘’
- 可以是这些类型中的任意一个值
- 联合类型中的每一个类型被称之为联合成员

**交叉类型**

- 交叉类型表示需要满足多个类型的条件；使用‘’&‘’符号
- 原始类型、字面量类型、函数类型等原子类型合并成交叉类型，没有任何用处。最终为never
- 特性：唯一性、满足交互定律、满足结合律、父类型收敛

**区别**

- 交叉类型是类型缩减，而联合类型则是类型扩大

## 7-别名和接口类型有什么关系和区别？

- `interface`只能声明对象，类型别名可以声明 **元组、联合类型、交叉类型、原始类型、对象等**
- `interface`可以重复的对某个接口来定义属性和方法；`type`不可以重复
- 扩展：`interface`支持 **extends**；`type`支持 **&**
- 两者相互兼容

## 8-什么是TypeScript的类型缩小？有什么作用？

在逻辑执行中，通过缩小比声明时更小的类型，这个过程称之为类型缩小。

如使用：

- typeof
- 比较(`===, !==`)
- instanceof
- in

**作用**

通过执行缩小后的类型比较，能够执行不同条件的逻辑，增加代码的安全性、健壮性

## 9-函数有自己的类型吗？如何定义？什么是函数调用签名？什么是函数构造函数签名？

函数有自己的类型; 一个只有参数列表和返回值类型的函数定义

`type CalcFunc = (num1: number, num2: number) => void`

```typescript
type CalcFunc = (num1:number, num2: number) => void

let calcInstance: CalcFunc = (a, b) => {
  return a + b
}
```

**函数调用签名**

通过在一个对象类型中写一个调用签名

```typescript
interface iCalcFn {
  name: string
  // 函数调用签名
  (num1: number, num2: number): void
}

function calc(calcFn: iCalcFn) {
  console.log(calcFn.name);
  calcFn(1,2)
}
```

**构造函数签名**

JavaScript函数也可以使用 new 操作服调用，当被调用的时候，TypeScript会认为这是一个构造函数，因为会产生一个新对象;调用签名前加一个new关键词

```typescript
interface iPerson {
	new (name: string): Person
}

// 正常直接使用Person作为类型使用
class Person {
  private name: string;
  constructor(name: string) {
    this.name = name
  }
}
interface iPerson {
  new (name:string): void
}
let foo:Person = new Person('123')
```

## 10-什么是函数的重载，函数的重载有什么作用？

函数的重载就是**同名的函数可以根据参数的不同实现不同的功能**

## 11-TypeScript中的函数如何绑定this?有哪些this相关的工具？

- 在开启`noImplicitThis`的情况下，我们必须指定this的类型

- 函数的第一个参数用于声明this, 后续调用函数传参数时，从第二个参数开始传递，this参数会在编译后被抹除

  ```typescript
  function foo(this:{name: string}){
    console.log(this) // {name: 'why'}
  }
  foo.call({name: "why"})
  ```

**this相关内置工具**

- `ThisParameterType`:  获取一个函数**类型Type**的this参数类型；没有this参数则返回unknown

  ```typescript
  function foo(){}
  type thisType = ThisParameterType<typeof foo> // unknown
  ```

- `OmitThisParameter`：移除函数类型Type的this参数类型, 返回当前的函数类型

  ```typescript
  type omitThis = OmitThisParameter<typeof Person>
  ```

- `ThisType`：用于标记上下文类型中的`this`类型

  ```typescript
  const info: iData & ThisType<iState> = {...方便内部使用this}
  ```

## 12-TypeScript中类的定义有什么特点？什么是属性修饰符?

**特点**

- 可以在类的内部声明类的属性以及对应的类型
- 也可以给属性值设置初始值
- 在默认的`strictPropertyInitialization`模式下，属性必须是初始化的，否则无法编译
  - 如果不希望初始化，可以使用`name!:string`语法。即不需要在constructor中进行初始化

**属性修饰符**

- `public`, 默认，公有属性
- `private`,私有，只能类中使用
- `protected`, 受保护的，只能在类和子类中使用

- `readonly`, 只读属性

## 13-什么是TypeScript的抽象类？抽象类有什么作用？

- 抽象类使用abstract声明的类

- 抽象类是不能被实例的（即不能通过new创建）
- 抽象方法必须被子类实现，否则该类必须是一个抽象类
- 抽象方法，必须存在于抽象类中

**作用**

定义通用的调用接口、属性等

- 抽象类是用来捕捉子类的通用特性的，是被用来创建继承层级里子类的模版
- 现实中有些父类中的方法没有必要写，因为各个子类中这个方法肯定会有所不同
- 写成抽象类，看代码时，知道这是抽象方法，在子类中实现，提示作用

## 14-什么是类类型？类类型具有什么样的特点？

**类本身可以作为一种数据类型**

- 类可以创建类对应的实例对象
- 类本身可以作为这个实例的类型，即作为类类型
- 类也可以当中有一个构造签名的函数

**特点**

- 可以作为类使用，也可以作为类类型使用
- 类也可以当作一个有构造签名的函数

```typescript
class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  running() {
    console.log(this.name);
  }
}

const p1: Person = new Person('vunbo')
const p2: Person = {
  name: 'vun',
  running() {
    console.log('name');
  }
}
```

## 15-接口和抽象类有什么区别？

接口包括各种各样的数据

抽象类注重行为、规则

接口和抽象类的区别：

1. 抽象类可以有构造方法，接口中不能有构造方法
2. 抽象类中可以有普通成员变量，接口中没有普通成员变量
3. 抽象类中可以包含静态方法，接口中不能包含静态方法
4. 一个类可以实现多个接口，但只能继承一个抽象类
5. 接口可以被多重实现，抽象类只能被单一继承
6. 如果抽象类实现接口，则可以把接口中方法映射到抽象类中作为抽象方法而不必实现，而在抽象类的子类中实现接口中方法

接口和抽象类的相同点：

1. 都可以被继承
2. 都不能被实例话
3. 都可以包含方法声明
4. 派生类必须实现未实现的方法

## 16-什么是严格的字面量赋值检测，在行为上有什么特点？

即接口定义的属性，若没有索引签名，则在第一次实现该接口时，必须完全匹配，不能有多余的其他属性。

**特点**

- 每个对象字面量最初都认为是“新鲜的“
- 当一个新的对象字面量分配给一个变量或传递给一个非空目标类型的参数时，对象字面量指定目标类型中不存在的属性是错误的
- 当类型断言或对象字面量的类型扩大时，新鲜度会消失

## 17-什么是泛型？泛型有什么作用，如何使用？

- 泛型指类型参数化，即将原来某种具体的类型进行参数化
- 和定义函数一样，可以给泛型定义若干个类型参数，并在调用时给泛型传入明确的类型参数。

**作用**

泛型设计的目的在于，有效的约束类型成员之间的关系，比如函数参数和返回值，类或者接口成员和方法成员之间的关系

```typescript
function foo<T>(arg: T):T[]{
  return [arg]
}
```

**尖括号<>语法给函数定义一个泛型参数arg, 并指定 arg的参数类型为T**

## 18-什么是泛型约束和泛型条件？在开发中如何被使用？

默认情况下我们可以指定泛型为任意类型，但是有些情况下我们需要指定的类型满足特定条件后才能指定

- 可以声明一个类型参数，这个类型参数被其他类型参数约束
- extends关键字约束

```typescript
interface length {
  length: number
}
const foo = <T extends length>(value: T): number => {
  return value.length
}

console.log(foo('123'))
```

## 19-TypeScript中映射类型有什么特点？如何使用？

- 映射类型，建立在索引签名的语法上
- 多是通过keyof创建，循环便利键名创建一个类型

```typescript
interface iState {
  name: string
  age: number
}

// in关键字遍历
type mapType<T> = {
  [P in keyof T]: T[P]
}
type myMap = mapType<iState>
```

## 20-TypeScirpt条件类型如何使用？解释一下什么是infer和distributive？

**条件类型**就是用来帮助我们描述输入类型和输出类型之间的关系。类似js中的条件表达式

`someType extends OtherType ? TrueType : FalseType`

**infer**

- 用于条件类型中推断，**在 true 分支里使用该推断结果**

```typescript
// T继承一个函数，在返回值中推导。如果继承于一个函数，推导infer R 
type MyReturnType<T extends (..args:any) => any> = T extends (...args: any) => infer R ? R : never

type calcFnType = (num1: number, num2: number) => string
type calcFn = ReturnType<calcFnType> // string 推导某个函数类型的返回值类型 
```

**分布条件类型 distributive**

**当在泛型中使用条件类型的时候，如果传入一个联合类型，就会变成分发的**

```typescript
type toArray<T> = T extends any ? T[] : never

type newType = toArray<number ｜ string> // type newType = string[] | number[]

                       
// 推导函数参数的类型
type MyParameterType<T extends (...args:any[]) => any> = T extends (...args: infer A) => any ? A : never
function foo(a: string, b: number) {
  console.log(a + b);
}
type fooCb = MyParameterType<typeof foo> // [a:string, b:string]
```

## 21-列举一下常见的TypeScript内置工具？分别说出它们的作用以及实现

- Partial： 用于构造一个Type下所有的属性，都设置为可选的

  ```typescript
  type Partial<T> = {
    [K in keyof T]?: T[K]
  }
  ```

- Required, 用于构造一个Type下所有的属性，都设置为必填的

  ```typescript
  type Required<T> = {
    [K in keyof T]: T[K]
  }
  ```

- Readonly,用于构造一个Type下所有的属性，都设置为只读的

  ```typescript
  type Readonly<T> = {
    readonly [K in keyof T]: T[K]
  }
  ```

- Record, 基于传入的keys和type，构建一个新的Type类型

  ```typescript
  type MyRecord<K extends keyof any, T> = {
    [P in K]: T
  }
  ```

- Pick, 从一个**接口**中里挑一些 keys，组成新的类型，**第二个参数应该是接口中的某些字段**

  ```typescript
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
  ```

- Omit, 从interface里面过滤掉一些属性Keys

  ```typescript
  type Omit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P]
  }
  ```

- Exclude, 从联合类型中排除一些类型

  - 分发，extends

  ```typescript
  type Exclude<T, K> = T extends K ? never : T
  ```

- Extract,从联合类型中提取类型

  ```typescript
  type Extract<T, K> = T extends K ? T : never
  ```

- NonNullable<Type>: 用于构造一个类型，这个类型从Type中排除了所有的null、undefined的类型。
- InstanceType<Type> : 用于构造一个由所有Type的构造函数的实例类型组成的类型。

## 22-TypeScript模块化和JavaScript模块化有什么区别？什么是命名空间?

**区别**

- JS有一个很长的处理模块化代码的历史，比如：将一个模块封装到一个立即执行函数中
- 随时时间的流逝，ESModule出现，即 import/export语法
- JS规范声明任何没有 export 的 JS 文件都应该被认为是一个脚本，而非一个模块
- 在TS中最主要使用的模块化方案就是ESModule， 在TS中如果想要让一个JS文件变成模块化可以添加 export{}语法

**命名空间**

- 命名空间在TypeScript早起时，称之为内部模块
- 目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题
- 未废弃，但推荐使用ES模块

## 23-什么是TypeScript声明文件，声明文件如何分类？如何引入和起作用？

TypeScript 声明文件

- xx.d.ts文件，用来做类型声明的(declare), 称之为类型声明(Type Declaration) 或者类型定义文件

声明文件如何分类

- 内置类型声明：是 TypeScript自带的、内置了JS运行时的一些标准API的声明文件，无需导入
- 外部定义类型声明： 是我们使用一些库时，需要的一些类型声明，需要额外安装
- 自己定义类型声明：在项目代码中声明一些类型，方便在其他地方直接使用

## 24-如何编写自己的声明文件？可以声明哪些类型？

**编写自己的声明文件**

- 建立一个`xxx.d.ts`文件，然后在该文件中根据声明模块的语法编写类型声明
- 如：可以声明变量、函数、类、模块、文件等

```typescript
declare module "lodash" {
  export function join(..args: any): any
}
  
declare const name: string
declare const age: number
declare const height: number
declare function foo(bar: string): string
  
declare class Person {
  constructor(public name: string, public age: number)
}

declare module "*.png"
declare module "*.jpg"
  
// 不适合声明成模块,所以使用命名空间 (模块都有import导入，jQuery没有导入)
declare namespaces $ {
  export function ajax(settings: any): any
}
```



## 25-tsconfig.json文件的作用是什么？有哪些比较常见的配置？

tsconfig.json文件有两个作用：

- 作用一（主要的作用）：让TypeScript Compiler在编译的时候，知道如何去编译TypeScript代码和进行类型检测；

  - 比如是否允许不明确的this选项，是否允许隐式的any类型；

  - 将TypeScript代码编译成什么版本的JavaScript代码；

- 作用二：让编辑器（比如VSCode）可以按照正确的方式识别TypeScript代码；
  - 对于哪些语法进行提示、类型错误检测等等；

常见的配置：

```typescript
{
  "compilerOptions": {
    "target": "ES2016",                                  
    "module": "commonjs",                               
    
    "esModuleInterop": true,                 
    "forceConsistentCasingInFileNames": true,            
 
    "strict": true,                                   
    "noImplicitAny": true,                           
    "strictNullChecks": true,                        
    "strictFunctionTypes": true,                     
    "noImplicitThis": true,                           
    "skipLibCheck": true                                
  },
 "files": [],
 "include": ["./src/**/*.ts", "./types/*.d.ts"]
}
```

