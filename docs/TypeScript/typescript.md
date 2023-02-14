TypeScript 是拥有类型的 JS 超集，可以编译成普通、干净、完整的JS代码

#  基础

## 基础数据类型

- `let val:number`, 定义 number 类型
- `let val2:boolean`, 定义 boolean 类型
- `let val3:string`, 定义 string 类型
- **number和bigint都表示数字，但是这两个类型不兼容**
- string是 TS 所提供

## 数组和元素类型

1. `[]`定义数组

- `let arr2:string[]`, 只能存储字符串类型的数组
- `let arr3:(number|string)[]`, 只能存储字符串类型和数值类型的数组
- `let arr4:any[]`, 存储任意类型的数据

2. **`Array`泛型建立数组**

- `let arr:Array<number>`, 只能存储数值类型的数组
- **推荐使用`[]`，一方面可以避免与 JSX 的语法冲突，另一方面可以减少不少代码量**

3. 元祖类型: 保存定长定数据类型的数据

- `let arr5:[string, boolean, number]`, 表示一个可以存放三个元素的数组。分别是字符串、布尔值、数值

## any、void 类型

1. any 类型

- 表示任意类型，当不清楚某个值的具体类型时使用
- 任何类型数据都可以赋值给 any 类型
- any 也可以赋值给出了never之外的任意其他类型

```typescript
let value: any // 定义了一个可以保存任意类型数据的变量
value = 123
value = 'abc'
value = true
value = [1, 2, 3]
```

2. void 类型

- void 与 any 正好相反，表示没有任何类型，**一般用于函数返回值**
- **在 TS 中只有 null(strickNullChecks: false 时) 和 undefined 可以赋值给 void 类型**
- **null 和 undefined 是所有类型的子类型，所以可以将 null 和 undefined 赋值给任意类型**
- 基于上下文的类型推导出返回类型为 void 的时候，并不会强制函数一定不能返回内容

```typescript
// 无返回值函数。默认返回undefined
function yao(): void {
  console.log('typescript')
}
yao()

// 定义一个不可以保存任意类型数据的变量，只能保存null和undefined
let variable: void
variable = 1 // error
variable = 'yao' // error
variable = null
```

## unknown

与 any 不同的是，unknown 在类型上更安全。

- **不能在unknow类型上执行，如xxx.length操作**

- 比如我们可以将**任意类型的值赋值给 unknown**，
- **unknown 类型的值只能赋值给 unknown 或 any**

```typescript
let result: unknown;
let num: number = result; // 提示 ts(2322)
let anything: any = result; // 不会提示错误
```

- 使用 unknown 后， TS 会对它做类型检测。但是，**如果不缩小（Type Narrowing)，我们对 unknown 执行的任何操作都会出现如下错误**

  ```typescript
  let result:unknown
  result.toFixed() // error: ts(2571)
  
  // 如下
  let value: unknown;
  value.foo.bar; // Error
  value.trim(); // Error
  value(); // Error
  new value(); // Error
  value[0][1]; // Error
  // 避免undefined的方法错误
  ```

- 所有类型的缩小手段对 unknown 都有效。最终是其他任何类型

- 除了any外，与其他任何类型组成的联合类型最后都是unknown类型

- never 类型是 unknown 类型的子类型

- `keyof unknown` 等于 never

- **any 和 unknown 可以被断言成任何类型，反过来任何类型也都可以被断言成 any 或 unknown。**

  - ```鹿 as unknown as 马```


## never 类型与 object 类型

never 类型表示的是那些永不存在的值的类型;一般用于抛出异常或根本不可能有返回值的函数

- **never是所有类型的子类型，可以给所有类型赋值**

- 反过来，除了 never 自身以外，其他类型（包括 any 在内的类型）都不能为 never 类型赋值

- 在恒为false的类型守卫条件判断下，变量的类型将缩小为never。**使用 never 可以避免出现了新增联合类型没有对应的实现，目的就是写出类型绝对安全的代码**

  ```tsx
  type Foo = string | number
  function controlFlow(foo: Foo) {
      if (typeof foo === 'string') {
          console.log('string')
      } else if (typeof foo === 'number') {
          console.log('number')
      } else {
          // foo 在这里是 never
          const check:never = foo
      }
  }
  
  // 如果后续修改了Foo的类型
  type Foo = string | number | boolean
  // 此时else 分之会被收窄为 boolean 类型，并导致错误
  // 因此，这种方式确保方法 controlFlow 中穷尽了 Foo 的所有类型
  ```

- 基于never的特性，可以使用never实现一些有意思的功能。如可以把never作为接口类型下的属性类型，用来禁止写接口下特定的属性

  ```typescript
  const props: {
    id: number
    name?: never
  } = {
    id: 1
  }
  props.name = null // ts(2322))
  props.name = 'str' // ts(2322)
  props.name = 1 // ts(2322)
  ```

```typescript
function Yao(): never {
  throw new Error('has some error')
}
Yao()

function Vunbo(): never {
  while (true) {}
}
```

object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型

```typescript
let obj: object
obj = 1 // error
obj = 'yao' // error

obj = {
  name: 'yao',
  age: 20,
}
console.log(obj) // Object { name: "yyb", age: 12 }
```

## null 和 undefined

- 可以将null和undefined赋值给任意类型
- 默认情况可以相互赋值
- **如果不想把 null 和 undefined 赋值给其他的类型，可以开启 strickNullChecks**
  - 如果开启了strickNullChecks，还想把 null 和 undefined 赋值给其他的类型.就必须在声明的时候使用联合类型
  - 对于可选属性和可选参数而言，如果开启了 **strickNullChecks**，默认情况下数据类型就是联合类型。当前的类型 + undefined类型

## {}类型

{}类型描述了一个没有成员的对象。当你试图访问这样一个对象的任意属性时，TS会产生一个编译时错误。

```ts
// Type {}
const obj = {};

// Error: Property 'prop' does not exist on type '{}'.
obj.prop = "semlinker";
```

但是，仍然可以使用在 Object 类型上定义的所有属性和方法，这些属性和方法可通过JS的原型链隐式地使用

```ts
// Type {}
const obj = {};

// "[object Object]"
obj.toString();
```

## 类型断言

明确告诉编译器，不用帮我检查。将一种类型强制转换成另一种类型

1. 方式一

```typescript
let str: any = 'VunboYao'
let len: number = (<string>str).length
```

2. 方式二

```typescript
let str: any = 'VunboYao'
let len: number = (str as string).length
```

3. 方式三: 常量断言

```typescript
/** str 类型是 '"str"' */
let str = 'str' as const;
/** readOnlyArr 类型是 'readonly [0, 1]' */
const readOnlyArr = [0, 1] as const;
```

4. 方式四：**非空断言**：值后边添加`!`断言操作符。排除值为null、undefined的情况。
   1. 建议使用“类型守卫“代替非空断言
   1. **常规使用时，用可选链可替代。但是当未知属性在左侧进行赋值时，会产生错误，此时可以用非空断言**

**企业中使用第二种，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。**

- 不建议随意使用非空断言来排除可能为null或undefined的情况

  ```typescript
  userInfo.id!.toFixed()
  userInfo.name!.toLowerCase()
  ```

- **建议使用单问号(Optional Chain)，双问号（空值合并）,保障代码的安全性**

  ```typescript
  userInfo.id?.toFixed() // Optional Chain
  const myName = userInfo.name ?? `my name is ${userInfo.name}` // 空值合并
  ```

- TS允许类型断言转换为 **更具体 或者 不太具体(any/unknown)**的类型版本，此规则可防止不可能的强制转换

  ```typescript
  const name = 'vunbo' as number // error
  const name = ('vunbo' as unknown) as number
  ```

# 枚举类型

- 枚举和其他任何枚举、类型都不可比较，除了数字枚举可以与数字类型比较之外
- 数字枚举极其不稳定

## 数字枚举

1. 表示固定的几个取值。例如：一年四季、人的性别

```typescript
// 定义了一个名称叫做Gender的枚举类型，这个枚举类型的取值有两个，分别是Male和Female
enum Gender {
  Male,
  Female,
}
let val: Gender // 定义的变量val，只能保存Male或Female
val = Gender.Male
val = Gender.false // error
```

2. 枚举类型的本质是数值类型，所以可赋值一个数值

```typescript
val = 123 // 不会报错
console.log(Gender.Male) // 0
console.log(Gender.Female) // 1
```

3. 枚举类型的取值，默认从上至下，从 0 开始递增

- 虽然默认从 0 开始递增，但可以手动指定枚举的取值
- 如果手动指定了前面枚举的取值，后面的枚举值的取值会根据前面的递增
- 如果手动指定了后面枚举的取值，前面的枚举值的取值不会被影响
- 同时修改多个枚举值的取值，修改的是什么最后就是什么

```typescript
// 递增
enum Size {
  small = 3,
  big,
}
console.log(Size.small) // 3
console.log(Size.big) // 4 从3开始递增

// 前面的无影响
enum Size {
  small,
  big = 100,
}
console.log(Size.small) // 0
console.log(Size.big) // 100
```

4. 底层原理

- 可以通过枚举值拿到对应的数字
- 可以通过对应的数字拿到枚举值

```typescript
enum Size {
  small = 2,
  big = 4,
}
console.log(Size.small) // 2
console.log(Size[2]) // small

// 源码分析
var Size
;(function (Size) {
  Size[(Size['small'] = 2)] = 'small'
  Size[(Size['big'] = 4)] = 'big'
})(Size || (Size = {}))

// 本质Size["small"] = 2 赋值语句的结果为2
// 然后传递给外层: Size[2] = "small"
```

## 字符串枚举

## 常量枚举

```ts
const enum Day {
  SUNDAY,
  MONDAY
}
const work = (d: Day) => {
  switch (d) {
    case Day.SUNDAY:
      return 'take a rest'
    case Day.MONDAY:
      return 'work hard'
  }
}

// 转移为 JavaScript 后
const enum Day {
  SUNDAY,
  MONDAY
}
const work = (d: Day) => {
  switch (d) {
    case Day.SUNDAY:
      return 'take a rest'
    case Day.MONDAY:
      return 'work hard'
  }
}
```

## 外部枚举

- 外部`xxx.d.ts`中通过 `declare` 描述一个在其他地方定义变量
- 主要用于在不显示引入定义枚举的模块情况下，可以直接使用该枚举类型

## info

- 常量命名、结构顺序都一致的两个枚举，即便转译为 JS 后，同名成员的值仍然一样。但在TS看来，它们不相同、不满足恒等。
- 使用常量枚举管理相关的常量，能提高代码的可读性和易维护性
- 不要使用其他任何类型替换所使用的枚举成员

# 空值合并

- `??`是一个逻辑操作符，当左侧的操作数为null和undefined时，返回右侧操作数。否则返回左侧操作数
- 与逻辑或(`||`)不同，逻辑或会在左侧为**假值**时返回右侧操作数。

# 接口

## 接口初探

```typescript
// 定义接口类型
interface FullName {
  firstName: string
  lastName: string
}

let obj = {
  firstName: 'Vunbo',
  // lastName: 20,
  lastName: 'Yao',
}
// 输出一个人的全名，参数必须都是字符串. 无返回值
function say({ firstName, lastName }: FullName): void {
  console.log(`My Name is ${firstName}_${lastName}`)
}
say(obj)
```

## 可选属性

1. 可选属性：接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在

- 可以对可能存在的属性进行预定义

- 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号

  ```tsx
  interface ProgramLanguage {
    name: string
    age?: () => number
  }
  function Study(language: ProgramLanguage) {
    console.log(`${language.name}-${language.age?.()}`); 
    // 值可能是 undefined。使用类型守卫或者 Optional Chain
  }
  ```


## 索引签名

- 索引签名只允许`number,string,symbol,模版字符串`和这些基础类型组成的联合类型

- **数字索引签名的返回类型，必须是字符串索引签名返回的类型的字类型**

- **使用接口定义限定了变量或形参，在给变量或形参赋值时，赋予的值必须和接口限定的一样，多一个少一个都不行**

```typescript
interface FullName {
  firstName: string
  lastName: string
  middleName?: string // 可选的
}
function say9({ firstName, lastName, middleName }: FullName): void {
  if (middleName) {
    console.log(`My Name is: ${firstName}_${middleName}_${lastName}`)
  } else {
    console.log(`My Name is: ${firstName}_${lastName}`)
  }
}
```

1. **索引签名**：多一个或多多个如何绕开 TS 检查。用于描述那些 ”通过索引得到” 的类型，比如`arr[0]`或`obj['key']`

- 使用类型断言

  ```typescript
  say9({ firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc' } as FullName)
  ```

- 使用变量（不推荐）

  ```typescript
  let obj9 = { firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc' }
  say9(obj9)
  ```

- **使用索引签名**

  ```typescript
  interface FullName {
    firstName: string
    lastName: string
    middleName?: string
    [propName: string]: any // key为string,value为任意类型。
  }
  say9({
    firstName: 'Vunbo',
    lastName: 'Yao',
    middleName: '666',
    abc: 'abc',
    score: 12,
    1: 'string', // 对象中，无论key是什么类型，最终都会自动转换成字符串类型
  })
  ```

2. 索引签名用于数组

```typescript
// 索引签名
interface stringArray {
  [propName: number]: string
}
let arr10: stringArray = {
  0: 'a',
  1: 'b',
  2: 'c',
}
// let arr10:stringArray = ['d', 'e', 'f']
console.log(arr10[0])
console.log(arr10[1])
console.log(arr10[2])
```

## 只读属性

让对象属性只能在对象刚刚创建的时候修改。**接口定义时，属性前增加readonly**

```typescript
interface FullName {
  readonly firstName: string
  lastName: string
}
let MyName: FullName = {
  firstName: 'Vunbo',
  lastName: 'Yao',
}
MyName.firstName = 'vunbo' // error 只读，禁止修改
console.log(MyName) // {firstName: "Vunbo", lastName: "Yao"}
```

TS 内部对只读属性进行了扩展，扩展出来一个只读数组**ReadonlyArray**

```typescript
// let arr10:Array<string> = ['a1', 'b1', 'c1']
let arr10: ReadonlyArray<string|number> = ['a1', 'b1', 'c1']
console.log(arr10[1])
// arr10[1] = '666' // error
console.log(arr10[1])
```

## 混合接口

混合接口类型，同时提供函数与变量的多种类型

```typescript
interface CountInterface {
  (): void
  count: number
}

let CountTest = (function (): CountInterface {
  // CountInterface接口要求：既是一个没有参数返回的函数，又是一个拥有count属性的对象

  // fn作为函数时符合接口定义中函数接口的设定：(): void
  // fn作为对象时符合接口定义中对象属性的设定：count: number

  // 类型断言
  let fn = <CountInterface>function () {
    fn.count++
    console.log(fn.count)
  }
  fn.count = 0
  return fn
})()
CountTest() // 1
CountTest() // 2
CountTest() // 3
```

## 接口继承

```typescript
interface WidthInterface {
  width: number
}

interface HeightInterface {
  height: number
}

interface colorInterface {
  color: string
}

interface rectInterface extends WidthInterface, HeightInterface, colorInterface {
  border: string
}

let obj12: rectInterface = {
  width: 100,
  height: 200,
  color: 'red',
  border: '1',
}
```

## 函数

```typescript
// 命名函数
function demo13t(name: string): void {
  console.log(name)
}

// 匿名函数
const a = function (name: string): void {
  console.log(name)
}

// 箭头函数：name可选参数
let arrowF = (name?:string): void => {
  console.log(name);
}

// 剩余参数：定义一个name字符串，剩余参数为字符串，并放到一个数组中
let argument13 = (name:string, ...argument:string[]): string =>{
  console.log(name, argument);
  return 'string'
}
argument13('yao', '123', '4444', '122')
```

## 函数声明

TS中函数的完整格式应该是由函数的定义和实现两个部分组成

```typescript
// 定义一个函数
let AddFun:(a: number, b: number) => number
// 根据定义实现函数
AddFun = function (x: number, y: number):number {
  return x + y
}
let res14 = AddFun(100, 200)
console.log(res14);


// 一步到位写法
let AddFun: (a: number, b: number) => number = function (x:number, y: number): number {
  return x * y
}
// 精简版本，根据函数定义，自动推导对应的数据类型
let AddFun: (a: number, b: number) => number = (x, y) => {
  return x * y
}
console.log(AddFun(10, 20))
```

函数的先声明，再使用
```typescript
// TS函数声明
// 声明一个函数
type AddFun = (a: number, b: number) => number
let add14:AddFun = function (x:number, y: number): number {
  return x + y
}
console.log(add14(10, 30))

// 简写
type AddFun = (a: number, b: number) => number
let add14:AddFun = function (x, y) {
  return x + y
}
console.log(add14(10, 30))
```

## 重载

TS函数重载: 函数的重载就是同名的函数可以根据不同的参数实现不同的功能

```typescript
// 定义函数的重载
function getArray(x: number): number[]
function getArray(x: string): string[]
// 实现函数的重载
function getArray(value:any): any {
  if (typeof value === 'number') {
    let arr = []
    for (let i = 0; i < value; i++) {
      arr.push(i)
    }
    return arr
  } else {
    return value.split('')
  }
}
console.log(`getArray(10)`, getArray(10))
console.log(`getArray`, getArray('11231232'))
```

## 可选参数

**可选参数后面只能跟可选参数**

```typescript
// 可选参数
// 需求：要求定义一个函数可以实现2个数或者3个数的加法

function add15(x:number, y?:number, z?: number): number {
  return x + (y ? y : 0) + (z ? z : 0)
}

console.log(`add15(10, 20)`, add15(10))
```

## 默认参数

```typescript
function add15(x:number, y:number=30, z?: number): number {
  return x + (y ? y : 0) + (z ? z : 0)
}

console.log(add15(10))
```

# 类型别名

`type 别名名字 = 类型定义`

## interface 与 type 的区别

- **重复定义的接口类型，会自动合并特性。别名不可以**
- 接口类型只能声明对象, 类型别名可以声明元组、联合类型、交叉类型、原始类型，对象等。接口类型支持 **extends**扩展
- type 支持交叉运算符**（&）**来扩展已定义的接口类型
- **索引签名**
  - interface：虽然属性可以与索引签名进行混用，但是属性的类型必须是对应的数字索引或字符串索引的类型的**子集**，否则会出现错误提示
- **两者相互兼容**

## 联合类型

- 通过“｜”操作符分隔类型的语法表示联合类型。

- 将原始类型string和“string"字面量类型组合成一个联合类型，会类型缩减为原始类型string

## 交叉类型

- 多个类型合并成一个类型，合并后的类型将拥有所有成员类型的特性
- **原始类型、字面量类型、函数类型等原子类型合并成交叉类型，是没有任何用处的。因为任何类型都不能满足同时属于多种原子类型，比如既是 string 类型又是 number 类型。最终为 never**
- 交叉运算符的特性
  - 唯一性：`A & A 等价于 A`
  - 满足交换律：`A & B 等价于 B & A`
  - 满足结合律：`（A & B) & C 等价于 A & (B & C)`
  - 父类型收敛：`如果 B 是 A 的父类型，则 A & B 将被收敛成 A 类型`


## 合并接口类型

> 等同接口继承的效果。{} & {}

- 如果同名属性的类型不兼容，number 和 string 两个原子类型的交叉类型，即 never
- 如果同名属性的类型兼容，一个是number，一个是 number 的子类型、数字字面量类型，合并后的类型就是两者中的子类型

## 类型缩减

如果将 string 原始类型和“string字面量类型”组合成联合类型会是什么效果？效果就是类型缩减成 string 了

- TypeScript 对这样的场景做了缩减，它把字面量类型、枚举成员类型缩减掉，只保留原始类型、枚举类型等父类型，这是合理的“优化”

  - **可是这个缩减，却极大地削弱了 IDE 自动提示的能力**，如下代码所示

    ```typescript
    type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string; // 类型缩减成 string
    
    // 需要给父类型添加“& {}”
    type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string & {}; // 字面类型都被保留
    ```

- 如何定义如下所示 age 属性是数字类型，而其他不确定的属性是字符串类型的数据结构对象？

  - **也可以用interface的extends**
  
  - ```typescript
    {
      age: 1, // 数字类型
      anyProperty: 'str' // 其他不确定的属性都是字符串类型
      ...
    }
    ```

  - **用到两个接口的联合类型及类型缩减，这个问题的核心在于找到一个既是 number 的子类型，这样 age 类型缩减之后的类型就是 number；同时也是 string 的子类型，这样才能满足属性和 string 索引类型的约束关系**

    - *never 有一个特性是它是所有类型的子类型，自然也是 number 和 string 的子类型，所有如下所示：*
  
    - ```typescript
      type UnionInterface = {
        age: number
      } | {
        [key:string]: string 
        // 因为 never 同时又是 string 类型的子类型，所以 age 属性的类型和字符串索引签名类型不冲突
        age: never 
        // 等价于 age 属性的类型是由 number 和 never 类型组成的联合类型
      }
      
      let person:UnionInterface = {
        age: 12,
        string: 'string'
      }
      ```
  
      

# 函数类型

## 函数声明

- 一个只有参数列表和返回值类型的函数定义；

- **参数列表里的每个参数都需要名字和类型**；

  ```typescript
  type func = (num1: number, num2: number) => void
  // 接收2个参数：num1和num2，都是number类型
  // 并且这个函数没有返回值，所以是void
  ```

- 函数的参数名不需要与接口里定义的名字相匹配

```typescript
interface SearchFunc {
  // 函数定义：2个参数，字符串，返回值为boolean值
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = (sou: string, sub: string): boolean => {
  console.log(sou + sub)
  return 5 > -2
}
mySearch('vunbo', ' yao')
```

## 调用签名

在 JS中，函数除了可以被调用，自己也可以有属性值

```typescript
// 函数的调用签名（从对象的角度来看待这个函数，也可以有其他的属性）
interface iFunc {
  name: string
  age: number
  // 函数可以调用：函数调用签名
  (num: number): number
}
const bar: iFunc = (num: number):number => 123
bar.name = 'bar'
bar.age = 18
```

**开发中如何选择：**

- 如果只描述函数类型本身(函数可以被调用)，使用函数类型表达式(Function Type Expressions)
- 如果在描述函数作为对象可以被调用，同时也有其他属性时，使用函数调用签名(call Signatures)

## 构造签名

JavaScript函数也可以使用new操作符号调用.当被调用的时候，TypeScript会认为这是一个构造函数，因为会产生一个新对象

```typescript
class Person {
  name: string
  constructor(name:string){
    this.name = name
  }
}
interface iPerson {
  // 构造签名
  new (name:string): Person
}
```

## 指定this的类型

在开启``noImplicitThis`的情况下，必须指定this的类型

- 函数的第一个参数可以根据该函数之后被调用的情况，用于声明this的类型（key值必须是this)
- 在后续调用函数传入参数时，从第二个参数开始传递，this会在编译后抹除

```typescript
function foo(this: { name: string }, info: { name: string }) {
	console.log('this', this) // keb
	console.log('info', info) // vunbo
}

foo.call({name: 'keb'}, {name: 'vunbo'})
```

## this相关内置工具

### `ThisParameterType`

- 用于提取一个函数类型**Type**的**this**参数类型
- 如果这个函数类型没有this参数，返回unknow

```typescript
function foo(this: { name: string }, info: { name: string }) {
	console.log('this', this) // keb
	console.log('info', info) // vunbo
}

// {name: string}
type typeThis = ThisParameterType<typeof foo>
```

### `OmitThisParameter`

- 用于移除一个函数类型Type的this参数类型，并且返回当前的函数类型

```typescript
function foo(this: { name: string }, info: { name: string }) {
	console.log('this', this) // keb
	console.log('info', info) // vunbo
}

// info: {name: string}
type OmitThis = OmitThisParameter<typeof foo>
```

### `ThisType`

```typescript
interface iState {
	name: string
	age: number
}

interface iData {
	state: iState
	running: () => void
	eating: () => void
}

// ThisType绑定内部this的上下文：iState是内部函数调用this的上下文
const info: iData & ThisType<iState> = {
	state: { name: 'vunbo', age: 18 },
	running: function () {
		console.log(this.name);
	},
	eating: function () {
		console.log(this.age);
	}
}

info.running.call(info.state)
```

# 泛型

- **如下：*尖括号<>语法给函数定义一个泛型参数 P,并指定 param 参数的类型为P***
- 如果调用泛型函数时受泛型约束的参数有传值，泛型参数可以从参数中进行推导，而无需再现实地指定类型（可缺省）

类型本身可以被定义为拥有不明确的类型参数的泛型，可以接收明确类型作为入参。从而衍生出更具体的类型。

```ts
function reflect<P>(param: P): P {
  return param
}
const reflectFn: <P>(param: P) => P = reflect
```

> 泛型指的是类型参数化，即将原来某种具体的类型进行参数化。和定义函数参数一样，我们可以给泛型定义若干个类型参数，并在调用时给泛型传入明确的类型参数。设计泛型的目的在于有效约束类型成员之间的关系，比如函数参数和返回值、类或者接口成员和方法之间的关系。

定义一个数组，固定长度，可用任意值填充

```typescript
let getArray15 = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value)
}

// let arr15 = getArray15<string>('abc')
let arr15 = getArray15('abc')
// 泛型具体的类型可以不指定， 如果没有指定，那么就会根据传递的泛型参数自动推导出来
// let arr15 = getArray15(5, 3) // [5, 5, 5]
let res15 = arr15.map(item => item.length)
console.log(res15)
```

## 泛型约束

默认情况下我们可以指定泛型为任意类型

但是有些情况下我们需要指定的类型满足特定条件后才能指定

那么这个时候我们就使用泛型约束

> 函数的泛型入参必须和参数/参数成员建立有效的约束关系才有实际意义

```typescript
// 需求：要求指定的泛型类型必须有length属性才可以
interface LengthInterface {
  length: number
}
const getArray16 = <T extends LengthInterface>(value: T, items = 5): T[] => {
  return new Array(items).fill(value)
}

const arr16 = getArray16<string>('abc')
// let arr16 = getArray16<number>(12) // 泛型约束，number类型不满足
// 泛型具体的类型可以不指定， 如果没有指定，那么就会根据传递的泛型参数自动推导出来
// let arr16 = getArray16(5, 3) // [5, 5, 5]
const res16 = arr16.map((item) => item.length)
console.log(res16)
```

## 泛型约束中使用类型参数

一个泛型被另一个泛型约束，就叫做泛型约束中使用类型参数

```typescript
// 需求：定义一个函数用于根据指定的key获取对象的value

// let getProps18 = (obj: object, key: string): any => {
//   return obj[key]
// }

// 指定 K 继承自 T 中存在的 key 值
let getProps18 = <T, K extends keyof T>(obj: T, key: K): any => {
  return obj[key]
}

let obj18 = {
  a: '123',
  b: '456'
}

let res = getProps18(obj18, 'a') // 123
// 代码不够健壮，obj中没有c但这个key没有报错
// let res = getProps18(obj18, 'c') // undefined
```

## 泛型中的类

```typescript
class Person {
  name: string // 和 ES6 的区别，需要先定义实例属性， 才能够使用实例属性
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  // instance method
  say():void {
    console.log(`my name is ${this.name}, my age is ${this.age}`);
  }

  // static key
  static food:string
  static eat():void {
    // this 指向当前类
    console.log(`i am eating ${this.food}`);
  }
}
```

## 泛型类型

**可以把reflectFn的类型注解提取为一个能被复用的类型别名或者接口**

```ts
type ReflectFuncton = <P>(param: P) => P;
interface IReflectFuncton {
  <P>(param: P): P
}

const reflectFn2: ReflectFuncton = reflect;
const reflectFn3: IReflectFuncton = reflect;
```

将**类型入参**的**定义移动到类型别名或者接口名称后**，此时定义的一个**接收具体类型入参**后返回一个新类型的类型就是**泛型类型**

```ts
type GenericReflectFunction<P> = (param: P) => P;
interface IGenericReflectFunction<P> {
  (param: P): P;
}

const reflectFn4: GenericReflectFunction<string> = reflect; // 具象化泛型
const reflectFn5: IGenericReflectFunction<number> = reflect; // 具象化泛型

const reflectFn3Return = reflectFn4('string'); // 入参和返回值都必须是 string 类型
const reflectFn4Return = reflectFn5(1); //  入参和返回值都必须是 number 类型
```

**用类型操作符进行运算表达，使泛型可以根据入参的类型衍生出各异的类型**

- 如果入参是联合类型，则会被拆解成一个个独立的（原子）类型进行类型运算

```ts
type BS = string | boolean
type SONA<E> = E extends string | number ? E[] : E
type SArray = SONA<string> // string[]
type NArray = SONA<number> // number[]
type NeverGot = SONA<boolean> // boolean
type SS = SONA<BS> // boolean | string[]
type BORG = BS extends string | number ? BS[] : BS // string | boolean
```

# 类

## 类属性修饰符

- `public`：在类中、子类、外部均可使用。默认模式
- `protected`：只能在类的内部使用和子类中使用
- `private`：私有的，只能在类的内部使用，不能在外部和子类使用
- `readonly`：只读的。**不能用在static上**

## 类方法修饰符

- `public`:  该方法能在类的内部、子类、外部使用。默认模式
- `protected`： 只能在类的内部使用和子类中使用
- `private`：私有的，只能在类的内部使用。不能在外部和子类使用

```typescript
// 有一个基类，所有的子类都需要继承自这个基类，但是不希望别人能够通过基类来创建对象

class Person21 {
  name: string
  age: number
  gender: string
  protected constructor(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
  say():void {
    console.log(`My name is ${this.name}, age is ${this.age}, gender is ${this.gender}`);
  }
}

class Student21 extends Person21 {
  constructor(name, age, gender) {
    super(name, age, gender)
  }
}

// const p21 = new Person21('yao', 28, 'man') // 不可使用new构建
```

## 类可选属

可选属性同可选参数

```typescript
class Person22 {
  name: string
  age: number
  gender?: string
  say(name: string, age: number, gender?: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
}
```

## 参数属性

```typescript
class Person22 {
  name: string
  age: number
  gender: string
  say(name: string, age: number, gender: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
}

// 简写
class Person22 {
    // 参数属性
  constructor(public name:string,  public age: number, public gender: string) {}
}

let p22 = new Person22('yao', 22, 'man')
console.log(p22);
```

## 类型特性

- 可以创建类对应的实例对象
- 类本身也可以作为这个实例的类型
- 类也可以当作一个有构造签名的函数

## 类存取器

```typescript
class Person23 {
  private _age:number = 0
  set age(val:number) {
    console.log('set age');
    if (val < 0) {
      throw new Error('不能小于零')
    }
    this._age = val
  }

  get age():number {
    console.log('is get age func');
    return this._age
  }
}
```

## 抽象类

专门用于定义哪些不希望被外接直接创建的类。一般用于定义基类

**抽象类和接口的区别**

接口只能定义约束，不能定义具体实现；而抽象类中既可以定义约束，也可以定义具体实现

```typescript
abstract class Person24 {
  abstract name: string
  abstract say(): void
  eat(): void {
    console.log(this.name + '正在吃。。。');
  }
}

class Student24 extends Person24 {
  name: string = 'yyb'
  say():void {
    console.log('my name is ' + this.name);
  }
}
```

## 类和接口

```typescript
// 类实现接口
interface PersonInterface {
  name: string
  say(): void
}

// 实现某一个接口，就必须实现接口中的所有属性和方法

class Person25 implements PersonInterface {
  name:string = 'yyb'
  say(): void {
    console.log(`my name is ${this.name}`);
  }
}
let p25 = new Person25()
p25.say()

// 接口继承类
/* 注意点：
1. 只要一个接口继承了类，那么就会继承这个类中所有的属性和方法。但是只会继承属性和方法的声明，不会继承属性和方法的实现
2. 如果接口继承的类中包含了 protected 的属性和方法，那么就只有这个类的子类才能实现这个接口
*/
 class PersonOne {
   protected name: string = 'yyb'
   age: number = 23
   say(): void {
     console.log(`name = ${this.name}, age = ${this.age}`);
   }
 }

interface PersonOneInterface extends PersonOne {
  gender: string
}
class Student25 extends PersonOne implements PersonOneInterface {
  gender: string = 'male'
  name: string = 'yyb'
  age: number = 18
  say(): void {
    console.log(`my name is ${this.name}, age is ${this.age}, gender is ${this.gender}`)
  }
}
const POI = new Student25()
POI.say()
```

## 泛型类

```typescript
// 泛型类
class Cache26<T>{
  arr: T[] = []
  add(value: T): T {
    this.arr.push(value)
    return value
  }
  all(): T[] {
    return this.arr
  }
}

let cache26 = new Cache26<number>()
cache26.add(1)
cache26.add(3)
cache26.add(5)
cache26.add(1)
console.log(cache26.all());
```

# 类型守卫

触发类型缩小。还可以用来区分类型集合中的不同成员

> 类型集合一般包括联合类型和枚举类型。

## 如何区分联合类型

- switch

- 字面量恒等

- typeof，只能用于`===` 或 `!==`，只能保护 `number/string/boolean/symbol`

- instanceof，针对 object

- in

- 自定义类型守卫

  - 通过类型谓词 is，封装一个 isDog 函数来区分 Dog 和 Cat

    ```ts
    interface Dog {
      wang: string
    }
    interface Cat {
      miao: string
    }
    const isDog = function (animal: Dog | Cat): animal is Dog {
      return 'wang' in animal
    }
    
    const getName = (animal: Dog | Cat) => {
      if (isDog(animal)) {
        return animal.wang
      }
    }
    ```

## 如何区别枚举类型

```ts
enum A {
  one,
  two,
}
enum B {
  one,
  two,
}

const cpWithNumber = (param: A) => {
  if (param === 1) {
    // bad 数字枚举不稳定
    return param
  }
}

const cpWithOtherEnum = (param: A) => {
  if (param === (B.two as unknown as A)) {
    // alter bad 一旦A和B的结构出现了任何差异，会导致异常
    return param
  }
}

const cpWithSelf = (param: A) => {
  if (param === A.two) {
    // good 和自身比较是最合适的。类型缩小
    return param
  }
}
```

# 类型兼容

## 子类型

- 所有的子类型与它的父类型都兼容
- 由子类型组成的**联合类型**也可以兼容它们**父类型组成的联合类型**

```tsx
let ICPar: IPar | CPar;
let ICChild: IChild | CChild;
ICPar = ICChild; // ok
```

## 结构类型

- 如果两个类型的结构一致，则它们是互相兼容的。比如拥有相同类型的属性、方法的**接口类型或类**，则可以互相赋值

- 两个接口类型或者类，如果其中一个类型不仅拥有另外一个类型全部的属性和方法，还包含其他的属性和方法，那么前者可以兼容后者

```ts
interface I1 {
  name: string
}
interface I2 {
  id: number
  name: string
}
class C2 {
  id = 1
  name = '1'
}
let O1: I1
let O2: I2
let InstC2: C2
O1 = O2
O1 = InstC2
```

- 虽然包含多余属性id的变量O2可以赋值给变量O1，但是如果我们直接将一个与变量O2完全一样结构的对象字面量赋值给变量O1，则会提示一个ts(2322)类型不兼容的错误。这就是对面字面的freshness特性。

  **一个对象字面量没有被变量接收时，它将处于一种freshness新鲜的状态。这时TS会对对象字面量的赋值操作进行严格的类型检测，只有目标变量的类型与对象字面量的类型完全一致时，对象字面量才可以赋值给目标变量，否则会提示类型错误**

```tsx
O1 = {
  id: 2, // ts 2322
  name: 'name',
}
const O2 = {
  id: 2,
  name: 'name',
}
O1 = O2 // ok 使用变量接收对象字面量
O1 = {
  id: 2,
  name: 'name',
} as I2 // 类型断言
```

- 判断两个类是否兼容时，可以完全忽略其构造函数及静态属性和方法是否兼容，只需要比较类实例的属性和方法是否兼容即可。如果两个类包含私有、受保护的属性和方法，则仅当这些属性和方法源自同一个类，才兼容

## 可继承和可实现

类型兼容性决定了接口类型和类是否可以通过extends继承另外一个接口类型或者类，以及类是否可以通过 implements实现接口

```ts
interface I1 {
  name: number
}
interface I2 extends I1 {
  // ts(2430) name属性不兼容
  name: string
}
class C1 {
  name = '1'
  private id = 1
}
class C2 extends C1 {
  // ts(2415) 私有属性
  name = '2'
  private id = 1
}
class C3 implements I1 {
  name = '' // ts(2416) 属性冲突
}

```

## 变形

指根据类型之间的子类型关系推断基于它们构造的更复杂类型之间的子类型关系

### 协变

协变也就是说如果 Dog 是 Animal 的子类型，则 F(Dog) 是 F(Animal) 的子类型，这意味着在构造的复杂类型中保持了一致的子类型关系

**接口类型的属性、数组类型、函数返回值的类型都是协变的**

### 逆变

严格模式下，函数参数类型是逆变的。如果 Dog 是 Animal 的子类型，则 F(Dog) 是 F(Animal) 的父类型，这与协变正好反过来

### 双向协变

**非严格模式下**，函数参数类型就是双向协变的。

### 不变

不变即只要是不完全一样的类型，它们一定是不兼容的

## 函数类型兼容性

### 返回值

返回值类型是协变的。所以在参数类型兼容的情况下，函数的子类型关系与返回值子类型关系一致。**返回值类型兼容，则函数兼容**

### 参数类型

参数类型是逆变的。所以在参数个数相同、返回值类型兼容的情况下，函数子类型关系与参数子类型关系是反过来的（逆变）

### 参数个数

在索引位置相同的参数和返回值类型兼容的前提下，函数兼容性取决于参数个数，参数个数少的兼容个数多

（参数少的赋值给参数多的安全。）

```ts
let lessP = (one: number) => void 0
let moreP = (one: number, two: string) => void 0
moreP = lessP // ok
lessP = moreP // ts2322
```

### 可选和剩余参数

可选参数可以兼容剩余参数、不可选参数

# 类型增强系统

## declare 变量

`declare (var|let|const) 变量名称：变量类型`

## 声明函数

声明函数的语法与声明变量类型的语法相同，不同的是 declare 关键字后面需要跟 function 关键字

`declare function toString(x:number):string`

**使用declare关键字时，不需要编写声明的变量、函数、类的具体实现，只需要声明其类型即可**

## 声明类

只需要声明类的属性、方法的类型即可

```ts
declare class Person {
  public name: string
  private age: number
  constructor(name: string)
  getAge(): number
}
```

## 声明枚举

只需要定义枚举的类型，不需要定义枚举的值

## declare 模块

**声明模块的语法**： `declare module '模块名' {}`

在模块声明的内部，只需要使用 export 导出对应库的类、函数即可

## declare 文件

因为TS并不知道我们通过import导入的文件是什么类型，所以需要使用 declare 声明导入的文件类型

```ts
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
```

## declare 命名空间

不同于声明模块，命名空间一般用来表示具有很多子属性或者方法的全局对象变量

**可以将声明命名空间简单看作是声明一个更复杂的变量**

```TS
declare namespace $ {
  const version: number;
  function ajax(settings?: any): void;
}
$.version; // => number
$.ajax();
```

## 声明文件

在TS中，存在类型、值、命名空间这三个核心概念。

### 类型

- 类型别名声明
- 接口声明
- 类声明
- 枚举声明
- 导入的类型声明

### 值

- var, let, const 声明
- namespace、module包含值的说明
- 枚举声明
- 类声明
- 导入的值
- 函数声明

## 合并接口

- 接口的非函数成员类型必须完全一样
- **后面声明的接口具有更高的优先级**

## 不可合并

定义一个类类型，相当于定义了一个类，又定义了一个类的类型。对于这个类既是值又是类型的特殊对象不能合并

# 官方工具

映射类型，可以通过 +/- 来指定添加/删除 只读和可选修饰符

## 接口类型

- `Partial`：所有属性变为可选的。**映射类型**

  ```ts
  type Partial<T> = {
      [P in keyof T]?: T[P]
  }
  ```

- `Required`： 与 `Partial` 相反，所有属性变为必须的

  ```ts
  type Required<T> = {
      [P in keyof T]-?: T[P]
  }
  ```

- `Readonly`： 所有属性设置为只读的。**映射类型**

  ```ts
  type Readonly<T> = {
      readonly [P in keyof T]-?: T[P]
  }
  ```

- `Pick`: 从给定的类型中选取出指定的键值，组成一个新的类型。**映射类型**

  ```tsx
  type Pick<T, K extends keyof T> = {
      [P in K]: T[P]
  }
  ```

- `Omit`：与 `Pick` 类型相反。返回去除指定的键值之后返回的新类型

  ```tsx
  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type NewPerson = Omit<Person, 'name' | 'age'>
  ```

  ```tsx
  type Omit<T, K extends string | number | symbol> = {
      [P in Exclude<keyof T, K>]: T[P]
  }
  ```

## 联合类型

- `Exclude`: 从联合类型中去除指定的类型

  ```tsx
  type Exclude<T, U> = T extends U ? never : T
  ```

  ```TSX
  type NewPerson = Omit<Person, 'weight'>
  // 相当于
  type NewPerson = Pick<Person, Exclude<keyof Person, 'weight'>>
  // 其中
  type ExcludeKeys = Exclude<keyof Person, 'weight'> // name | age
  ```

- `Extract`：与 `Exclude` 相反，从联合类型中提取指定的类型。基于 `Extract` 可实现一个获取接口类型交集的工具类型

  ```tsx
  type Extract<T, U> = T extends U ? T : never
  ```

  **实现一个接口交集**

  ```tsx
  interface Person {
      name: string
      age?: number
      weight?: number
  }
  interface NewPerson {
      name: string
  }
  type Intersect<T, U> = {
      [K in Extract<keyof T, keyof U>]: T[K]
  }
  type T = Intersect<Person, NewPerson> // type T = { name: string }
  ```

- `NonNullable`： 从联合类型中去除 null 或者 undefined

  ```TSX
  type NonNullable<T> = T extends null | undefined ? never : T
  type NonNUllable2<T> = Exclude<T, null | undefined>
  ```

- `Record`：生成接口类型，使用传入的泛型参数分别作为接口类型的属性和值。**将一个类型的所有属性值都映射到另一个类型上并创造出一个新的类型**。`Record` 类型接收两个泛型参数：
  - 第一个参数作为接口类型的属性
  - 第二个参数作为接口类型的属性值
  
  ```tsx
  type Record<K extends string | number | symbol, T> = {
      [P in K]: T
  }
  type MenuKey = 'home' | 'about' | 'more'
  interface Menu {
      label: string
      hidden?: boolean
  }
  const menus: Record<MenuKey, Menu> = {
      about: { label: 'about' },
      home: { label: 'about' },
      more: { label: 'about' },
  }
  ```
  
- `keyof any`： 指代可以作为对象健的属性。`type T = keyof any; => string | number | symbol`

## 函数类型

- `ConstructorParameters`： 用来获取构造函数的构造参数

  ```TSX
  type ConstructorParameters<T extends new (...args: any) => any> =
      T extends new (...args: infer P) => any ? P : never
  class Person {
      constructor(name: string, age?: number) {}
  }
  type T = ConstructorParameters<typeof Person>
  ```

- `Parameters`: 获取函数的参数并返回序对

  ```jsx
  type Parameters<T extends (...args: any) => any> = T extends (
      ...args: infer P
  ) => any
      ? P
  	: never
  type T0 = Parameters<() => void> // []
  type T1 = Parameters<(x: number, y?: string) => void> // [x: number, y?: string | undefined]
  ```

- `ReturnType`：获取函数的返回类型

  ```tsx
  type ReturnType<T extends (...args: any) => any> = T extends (
  	...args: any
  ) => infer R
      ? R
  	: never
  type T0 = ReturnType<() => number> // number
  type T1 = ReturnType<(x: number, y?: string) => void> // void
  ```

- `ThisParameterType`: 获取函数的 **this 参数类型**

  ```tsx
  type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
      ? U
  : unknown
  type T = ThisParameterType<(this: number, x: number) => void> // number
  ```

- `ThisType`: 可以在对象字面量中**指定 this 的类型**

- `OmitThisParameter`: 去除函数类型中的 this 类型

  ```tsx
  type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  	? T
  	: T extends (...args: infer A) => infer R
      ? (...args: A) => R
  	: T
  type T = OmitThisParameter<(this: number, x: number) => string> // (x:number) => string
  ```


## 字符串类型

- `Uppercase`: 转换为大写
- `Lowercase`: 转换为小写
- `Capitalize`: 第一个字母大写
- `Uncapitalize`: 第一个字母小写

# 工具

## keyof

获取某种类型的所有key值集合.**对象属性名、索引名、索引签名的类型**

## extends条件类型（三目运算）

判断前面一个类型是否是后面一个类型或者**能赋值给后面一个类型**

如果是就返回第一个结果，如果不是就返回第二个结果

语法：T **extends** U ? X : Y

## 分配条件类型

- **泛型中：**在条件类型中，如果入参是**联合类型，则会被拆解为一个个独立的原子类型**，然后再进行类型运算

- **非泛型中**，入参会被当成一个整体对待。

  ```tsx
  type BooleanOrString = string | boolean;
  type StringOrNumberArray<E> = E extends string | number ? E[] : E;
  type WhatIsThis = StringOrNumberArray<BooleanOrString>; // boolean | string[]
  type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean
  ```

- 通过某些手段强制类型入参变成一个整体，可以解除类型分配

- **如果分布式条件类型中，T 类型是“裸”类型，即没有被T[], [T], Promise<T\>包装过**，则不会被分解成多个分支进行比较

  ```tsx
  type StringOrNumberArray<E> = [E] extends [string | number] ? E[] : E
  type WhatIsThis = StringOrNumberArray<string | boolean> // string | boolean
  // 使用 [] 将入参 E 包起来，即便入参是联合类型 string | boolean，也会被当成一个整体对待，所以第 2 行返回的是 string | boolean。
  ```

- never 是不能分配的底层类型，如果作为入参以原子形式出现在条件判断 extends 关键字左侧，则实际化得到的类型也是 never

## infer

- `extends` 语句中待推断的类型变量。
- 在条件类型中定义新的类型。
- **条件类型中的类型判断**，前置条件，它一定是出现在条件类型中的
- 如果真实的参数类型和 infer 匹配的一致，就返回匹配到的这个类型
- **仅条件类型的“extends"子语句中才允许“infer“声明**
- infer声明的变量，只能在条件类型的**true分支中可用**

```javascript
type Unpacked<T> =
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U : T

type T0 = Unpacked<string> // string
type T1 = Unpacked<string[]> // string
type T2 = Unpacked<() => string> // string
type T3 = Unpacked<Promise<string>> // string
type T4 = Unpacked<Promise<string>[]> // Promise<string>
type T5 = Unpacked<Unpacked<Promise<string>[]>> // string . 命中第一个数组 => Promise<string> 命中第三个
```

```tsx
type isArray = ElementTypeOfObj<{ name: 'name'; id: 1; age: 30 }> // [name, 1]
type isNever = ElementTypeOfObj<number> // never
```

## typeof

- 表达式上下文中使用时，用来获取表达式值的类型
- 如果在类型上下文中使用，则是**用来获取变量或者属性的类型**。

## in 映射类型

使用索引签名语法和 **in**关键字限定对象属性的范围

```ts
type SpecifiedKeys = 'id' | 'name';
type TargetType = {
  [key in SpecifiedKeys]: any;
}; // { id: any; name: any; }
```

- **只能在类型别名定义中使用 in, 如果在接口中使用，则会提示一个ts(1169)的错误**
- 定义类型时，可以组合使用 `in` 和 `keyof`。基于已有的类型创建一个新类型，**使得新类型与已有类型保持一致的只读、可选特性，这样的泛型被称为映射类型**

 ```ts
 interface SourceInterface {
   readonly id: number;
   name?: string;
 }
 type TargetType = {
   [key in keyof SourceInterface]: SourceInterface[key];
 }; // { readonly id: number; name?: string | undefined }
 type TargetGenericType<S> = {
   [key in keyof S]: S[key];
 };
 type TargetInstance = TargetGenericType<SourceInterface>; // { readonly id: number; name?: string | undefined }
 
 ```

## Merge

基于映射类型将类型入参A和B合并为一个类型的泛型Merge<A,B>

```tsx
type Merge<A, B> = {
  [key in keyof A | keyof B]: key extends keyof A
  	? key extends keyof B
  		? A[key] | B[key]
  		: A[key]
  	: key extends keyof B
  	? B[key]
  	: never
}
type Merged = Merge<{ id: number; name: string }, { id: string; age: number }>
```

## ReturnTypeOfResolved

ReturnTypeOfResolved 和官方 ReturnType 的区别：如果入参 F 的返回类型是泛型 Promise 的实例，则返回 Promise 接收的入参。

```tsx
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type RetrunTypeOfResolved<F extends (...args: any) => any> = F extends (
	...args: any
) => Promise<infer R>
	? R
	: ReturnType<F>
type isNumber = RetrunTypeOfResolved<() => number>
type isString = RetrunTypeOfResolved<() => Promise<string>>
```

# 错误码

- TS2456，由于类型别名循环引用了自身造成的类型错误

- TS2554，由于行参和实参个数不匹配造成的

- TS2794，Promise 构造的 resolve 参数不再是默认可选的，必须传入。如果不需要参数，需要给 Promise 的泛型参数传入 void 即可

  ```tsx
  new Promise((resolve) => {
    resolve(); // TS2794: Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'? 
  });
  
  new Promise<void>((resolve) => {
    resolve();
  });
  ```

- TS1169，在接口类型(interface)定义中由于使用了非字面量或者非唯一 symbol 类型作为属性名造成的

  - **只能在类型别名(type)定义中使用 in, 如果在接口中使用**，会报错

  ```tsx
  interface Obj {
    [key in 'id' | 'name']: any; // TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
  };
  
  type Obj = {
    [key in 'id' | 'name']: any;
  };
  ```

- TS2345，传参时，类型不兼容

- TS2589，泛型实例化递归嵌套过深造成

- TS2322，字符串字面量类型

  ```tsx
  interface CSSProperties {
    display: 'block' | 'flex' | 'grid';
  }
  const style = {
    display: 'flex',
  };
  // TS2322: Type '{ display: string; }' is not assignable to type 'CSSProperties'.
  //  Types of property 'display' are incompatible.
  //   Type 'string' is not assignable to type '"block" | "flex" | "grid"'.
  const cssStyle: CSSProperties = style;
  ```

  style 的类型被自动推断成了 `{display: string}`，string 类型自然无法兼容字符串字面量类型 'block'|'flex'|'grid'，所以变量 style 不能赋值给 cssStyle.

  ```ts
  // 方法 1
  const style: CSSProperties = {
    display: 'flex',
  };
  
  // 方法 2
  const style = {
    display: 'flex' as 'flex',
  };
  // typeof style = { display: 'flex' }
  ```

- TS2352，类型收缩错误

