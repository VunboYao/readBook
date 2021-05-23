// 需求：有代码提示，写错后编译时报错

// 定义一个数组，定长，可用任意值填充
/* let getArray15 = (value:any, items:number=5):any[] => {
  return new Array(items).fill(value)
}

// let arr15 = getArray15('abc', 3)
let arr15 = getArray15(5, 3) // [5, 5, 5]
console.log(arr15);
let res15 = arr15.map(item => item.length)
console.log(res15); */

// 泛型
let getArray15 = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value)
}

// let arr15 = getArray15<string>('abc')
let arr15 = getArray15('abc')
// 泛型具体的类型可以不指定， 如果没有指定，那么就会根据传递的泛型参数自动推导出来
// let arr15 = getArray15(5, 3) // [5, 5, 5]
let res15 = arr15.map(item => item.length)
console.log(res15)
