# 基础

## 基础数据类型

- `let val:number`, 定义 number 类型
- `let val2:boolean`, 定义 boolean 类型
- `let val3:string`, 定义 string 类型
- **number和bigint都表示数字，但是这两个类型不兼容**

## 数组和元素类型

1. `[]`定义数组

- `let arr2:string[]`, 只能存储字符串类型的数组
- `let arr3:(number|string)[]`, 只能存储字符串类型和数值类型的数组
- `let arr4:any[]`, 存储任意类型的数据

2. `Array`泛型建立数组

- `let arr:Array<number>`, 只能存储数值类型的数组
- **推荐使用`[]`，一方面可以避免与 JSX 的语法冲突，另一方面可以减少不少代码量**

3. 元祖类型: 保存定长定数据类型的数据

- `let arr5:[string, boolean, number]`, 表示一个可以存放三个元素的数组。分别是字符串、布尔值、数值

## 枚举类型

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

## any、void 类型

1. any 类型

- 表示任意类型，当不清楚某个值的具体类型时使用
- 任何类型数据都可以赋值给 any 类型

```typescript
let value: any // 定义了一个可以保存任意类型数据的变量
value = 123
value = 'abc'
value = true
value = [1, 2, 3]
```

2. void 类型

- void 与 any 正好相反，表示没有任何类型，一般用于函数返回值
- **在 TS 中只有 null 和 undefined 可以赋值给 void 类型**
- **null 和 undefined 是所有类型的子类型，所以可以将 null 和 undefined 赋值给任意类型**

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

与 any 不同的是，unknown 在类型上更安全。比如我们可以将任意类型的值赋值给 unknown，**但 unknown 类型的值只能赋值给 unknown 或 any**

```typescript
let result: unknown;
let num: number = result; // 提示 ts(2322)
let anything: any = result; // 不会提示错误
```

- 使用 unknown 后， TS 会对它做类型检测。但是，如果不缩小（Type Narrowing)，我们对 unknown 执行的任何操作都会出现如下错误

  ```typescript
  let result:unknown
  result.toFixed() // error: ts(2571)
  ```

- 所有类型的缩小手段对 unknown 都有效

## never 类型与 object 类型

never 类型表示的是那些永不存在的值的类型;一般用于抛出异常或根本不可能有返回值的函数

- **never是所有类型的子类型，可以给所有类型赋值**

- 反过来，除了 never 自身以外，其他类型（包括 any 在内的类型）都不能为 never 类型赋值

- 在恒为false的类型守卫条件判断下，变量的类型将缩小为never

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

4. 方式四：非空断言：值后边添加`‘！’`断言操作符。排除值为null、undefined的情况。
   1. 建议使用“类型守卫“代替非空断言

企业中使用第二种，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。**

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

# 空值合并

- `??`是一个逻辑操作符，当左侧的操作数为null和undefined时，返回右侧操作数。否则返回左侧操作数
- 与逻辑或`||`不同，逻辑或会在左侧为**假值**时返回右侧操作数。

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

## 可选属性和索引签名

1. 可选属性：接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在

- 可以对可能存在的属性进行预定义
- 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号
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

2. 索引签名：多一个或多多个如何绕开 TS 检查。用于描述那些 ”通过索引得到” 的类型，比如`arr[0]`或`obj['key']`

- 使用类型断言

  ```typescript
  say9({ firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc' } as FullName)
  ```

- 使用变量（不推荐）

  ```typescript
  let obj9 = { firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc' }
  say9(obj9)
  ```

- 使用索引签名

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

3. 索引签名用于数组

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

## 函数接口

- 一个只有参数列表和返回值类型的函数定义；
- 参数列表里的每个参数都需要名字和类型；
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

- 重复定义的接口类型，会叠加。别名不可以
- 接口类型只能声明对象, 类型别名可以声明元组、联合类型、交叉类型、原始类型，对象等。
- **索引签名**
  - interface：虽然属性可以与索引签名进行混用，但是属性的类型必须是对应的数字索引或字符串索引的类型的子集，否则会出现错误提示

## 联合类型

- 通过“｜”操作符分隔类型的语法表示联合类型。

- 将原始类型string和“string"字面量类型组合成一个联合类型，会类型缩减为原始类型string

## 交叉类型

- 多个类型合并成一个类型，合并后的类型将拥有所有成员类型的特性
- **原始类型、字面量类型、函数类型等原子类型合并成交叉类型，是没有任何用处的。因为任何类型都不能满足同时属于多种原子类型，比如既是 string 类型又是 number 类型。最终为 never**

## 合并接口类型

> 等同接口继承的效果。{} & {}

- 如果同名属性的类型不兼容，number 和 string 两个原子类型的交叉类型，即 never
- 如果同名属性的类型兼容，一个是number，一个是 number 的子类型、数字字面量类型，合并后的类型就是两者中的子类型

## 类型缩减

如果将 string 原始类型和“string字面量类型”组合成联合类型会是什么效果？效果就是类型缩减成 string 了

- TypeScript 对这样的场景做了缩减，它把字面量类型、枚举成员类型缩减掉，只保留原始类型、枚举类型等父类型，这是合理的“优化”

  - 可是这个缩减，却极大地削弱了 IDE 自动提示的能力，如下代码所示

    ```typescript
    type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string; // 类型缩减成 string
    
    // 需要给父类型添加“& {}”
    type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string & {}; // 字面类型都被保留
    ```

- 如何定义如下所示 age 属性是数字类型，而其他不确定的属性是字符串类型的数据结构对象？

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

      

# 泛型

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

```typescript
// 需求：要求指定的泛型类型必须有length属性才可以
interface LengthInterface {
  length: number
}
let getArray16 = <T extends LengthInterface>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value)
}

let arr16 = getArray16<string>('abc')
// let arr16 = getArray16<number>(12) // 泛型约束，number类型不满足
// 泛型具体的类型可以不指定， 如果没有指定，那么就会根据传递的泛型参数自动推导出来
// let arr16 = getArray16(5, 3) // [5, 5, 5]
let res16 = arr16.map(item => item.length)
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

## 类可选属性和参数属性

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

