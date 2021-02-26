/*
* 接口类型？
* 和 number, string, boolean, enum这些数据类型一样
* 接口也是一种类型，也是用来约束使用者的
* */

// 定义接口类型
interface FullName {
    firstName: string,
    lastName: string
}

let obj8 = {
    firstName: 'Vunbo',
    // lastName: 13,
    lastName: 'Yao'
}
// 需求：要求给一个函数输出一个人完整的姓名，这个人的姓必须是字符串，名也必须是一个字符串
function say({firstName, lastName}:FullName):void {
    console.log(`My Name is ${firstName}_${lastName}`)
}
say(obj8)
