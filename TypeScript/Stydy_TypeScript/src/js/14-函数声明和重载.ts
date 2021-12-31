// TS函数完整格式
// TODO:TS中函数的完整格式应该是由函数的定义和实现两个部分组成

// 1.定义一个函数
let AddFun: (a: number, b: number) => number
// 2.根据定义实现函数
AddFun = function (x: number, y: number): number {
    return x + y
}
let res14 = AddFun(100, 200)
console.log(res14)

// TODO：一步到位写法
let AddFun2: (a: number, b: number) => number = function (x: number, y: number): number {
    return x * y
}

// TODO：精简版本，根据函数定义，自动推导对应的数据类型
let AddFun3: (a: number, b: number) => number = (x, y) => {
    return x * y
}
console.log(AddFun3(10, 20))

// TODO:TS函数声明
// 声明一个函数
type AddFun4 = (a: number, b: number) => number
// 根据声明去实现这个函数
let add14: AddFun4 = function (x: number, y: number): number {
    return x + y
}
console.log(add14(10, 30))

// TODO：声明简写
type AddFun5 = (a: number, b: number) => number
let add: AddFun5 = function (x, y) {
    return x + y
}
console.log(add(10, 30))

// TODO:TS函数重载: 函数的重载就是同名的函数可以根据不同的参数实现不同的功能
// 定义函数的重载
function getArray(x: number): number[]
function getArray(x: string): string[]
// 实现函数的重载
function getArray(value: any): any[] {
    if (typeof value === 'number') {
        let arr:number[] = []
        for (let i = 0; i < value; i++) {
            arr.push(i)
        }
        return arr
    } else {
        return value.split('')
    }
}

console.log(`getArray(10)`, getArray(10))
console.log(`getArray`, getArray('Vunbo'))
