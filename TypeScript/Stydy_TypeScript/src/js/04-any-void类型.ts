/*
 * any类型
 * any表示任意类型，当我们不清楚某个值的具体类型的时候就可以使用any
 * 一般用于定义一些通用性比较强的变量，或者用于保存从其他框架中获取的不确定类型的值
 * 在TS中任何数据类型的值都可以负值给any类型
 * */
// 定义了一个可以保存任意类型数据的变量
let value: any
value = 123
value = 'abc'
value = true
value = [1, 2, 3]

// void类型: void于any正好相反，表示没有任何类型，一般用于函数返回值(undefined或者null)
// TODO：在TS中只有null和undefined可以赋值给void类型

function test(): void {
    console.log('hello')
    return undefined
    // return 12 // Error
}

test()

// TODO:定义了一个不可以保存任意类型数据的变量，只能保存null和undefined
let demo: void
// demo = 123 // error
// demo = 'abc' // error
// demo = true // error
demo = undefined
console.log(demo)

// TODO： null 和 undefined 是所有类型的子类型，所以可以将null和undefined赋值给任意类型
