/*
* 1.什么是自动类型推断？
* 不用明确告诉编译器具体是什么类型，编译器就知道是什么类型
* */

// todo:1.根据初始值自动推断
// 如果是先定义再初始化，那么是无法自动推断的
let value31
value = 123
value = false
value = 'abc'

// todo: 如果是定义的同时初始化，那么TS就会自动进行类型推荐
let value311 = 123 // let value311:number = 123
value311 = 456
// value311 = false
// value311 = 'abc'

// 联合类型推断
let arr312 = [1, 'a'] // let arr312:(number|string)=[1,'a']
// arr312 = ['a', 'b', 'c', 1, 2, 3, false] // false会报错

// todo:2.根据上下文类型自动推断
window.onclick = ev => {
  console.log(ev.clientX) // 自动推导出事件类型
}
