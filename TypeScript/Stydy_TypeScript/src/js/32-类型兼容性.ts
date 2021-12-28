// 基本兼容性

// 接口与对象兼容

interface TestInterface32 {
  name: string
}

let p1 = {name: 'yyb'}
let p2 = {age: 10}
let p3 = {name: 'yyb', age: 19}

let t: TestInterface32
t = p1
// t = p2 // error
t = p3 // todo:可多不可少


// 嵌套对象

interface TestInterface321 {
  name: string
  children: {
    age: number
  }
}

let p11 = {name: 'yyb', children: {age: 19}}
let p31 = {name: 'yyb', children: {age: '12'}}

let t1: TestInterface321
t1 = p11
// t1 = p31 // todo: 会递归检查
