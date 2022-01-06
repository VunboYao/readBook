/*
什么是类型断言？
 TODO:TS中的类型断言和其他编程语言的类型转换很像，可以将一种类型强制转换成另外一种类型类型断言就是告诉编译器，你不要帮我检查了，相信我，我知道自己在做什么。

 例如：我们拿到了一个any类型的变量，但是我们明确知道这个变量中保存的是字符串类型
       此时我们就可以通过类型断言告诉编译器，这个变量是一个字符串类型
       此时我们就可以通过类型断言将any类型转换成string类型，使用字符串类型中相关的方法
*/

let str: any = 'VunboYao'
// 方式一
let len: number = (<string>str).length
console.log(len)

// 方式二：在企业开发中推荐使用as来进行类型转换（类型断言）。
// 第一种在使用到了JSX的时候存在兼容性问题
let len2 = (str as string).padStart(6, '0')
console.log(len2)

{
    // todo：非空类型断言
    function printMsgLen(msg?: string) {
        console.log(msg!.length) // todo:非空类型断言。不可能为null和undefined
    }

    printMsgLen('hello world')
    printMsgLen('')
    printMsgLen() // 空值传入会报错
}
