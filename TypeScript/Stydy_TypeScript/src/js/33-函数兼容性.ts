// 1.参数个数
let fn33a = (x: number, y: number) => {
}
let fn33b = (x: number) => {
}
fn33a = fn33b
// fn33b = fn33a // todo: 可少不可多


// 2.参数类型
let fn33c = (x: number) => {
}
let fn33d = (x: number) => {
}
let fn33e = (x: string) => {
}
fn33c = fn33d
fn33d = fn33c
// fn33c = fn33ex // error
// fn33e = fn33c // error todo: 必须一摸一样


// 3.返回值类型
let fn33f = (): number => 123
let fn33g = (): number => 456
let fn33h = (): string => 'abc'
fn33f = fn33g
fn33g = fn33f
// fn33f = fn33h // error
// fn33h = fn33f // error todo:必须一摸一样


// 4.函数双向协变

// 4.1参数的双向协变
let fn33i = (x: (number | string)) => {
}
let fn33j = (x: number) => {
}
fn33j = fn33i
fn33i = fn33j

// 4.2返回值双向协变
let fn33k = (x: boolean): (number | string) => x ? 123 : 'abc'
let fn33l = (x: boolean): number => 456
fn33k = fn33l // todo:可以将返回值是具体类型的赋值给联合类型
// fn33l = fn33k // error todo:不能将返回值是联合类型的赋值给具体类型


// 5.函数重栽
function add33(x: number, y: number): number
function add33(x: string, y: string): string
function add33(x, y) {
  return x + y
}

function sub33(x: number, y: number): number
function sub33(x, y) {
  return x + y
}

let fn33 = add33
// fn33 = sub33 // error todo:不能将重载少的赋值给重栽多的

let fn33m = sub33
fn33m = add33 // todo：可以将重载多的赋值给重载少的




