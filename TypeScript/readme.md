# 基础

## 基础数据类型

- `let val:number`, 定义 number 类型
- `let val2:boolean`, 定义 boolean 类型
- `let val3:string`, 定义 string 类型

## 数组和元素类型

- 定义数组
  - `let arr:Array<number>`, 只能存储数值类型的数组
  - `let arr2:string[]`, 只能存储字符串类型的数组
  - `let arr3:(number|string)[]`, 只能存储字符串类型和数值类型的数组
  - `let arr4:any[]`, 存储任意类型的数据
- 元祖类型: 保存定长定数据类型的数据
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
- 在 TS 中只有 null 和 undefined 可以赋值给 void 类型
- null 和 undefined 是所有类型的子类型，所以可以将 null 和 undefined 赋值给任意类型

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

## never 类型与 object 类型

never 类型表示的是那些永不存在的值的类型;一般用于抛出异常或根本不可能有返回值的函数

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

**企业中使用第二种，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。**

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

让对象属性只能在对象刚刚创建的时候修改

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

TS 内部对只读属性进行了扩展，扩展出来一个只读数组

```typescript
// let arr10:Array<string> = ['a1', 'b1', 'c1']
let arr10: ReadonlyArray<string> = ['a1', 'b1', 'c1']
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
