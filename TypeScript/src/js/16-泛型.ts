// TODO:什么是泛型？
// 在编写代码的时候，既要考虑代码的健壮性，又要考虑代码的灵活性和可重用性
// 通过 TS 的静态检测能让我们编写的代码变的更加健壮，但是在变的健壮的同时却丢失了灵活性和可重用性
// 所以为了解决这个问题 TS 推出了泛型的概念：通过泛型不仅可以让我们的代码变的更加健壮，还能让我们的代码在变的健壮的同时保持灵活性和可重用性

// 需求：有代码提示，写错后编译时报错

// 定义一个数组，定长，可用任意值填充
let getArrayA15 = (value: any, items: number = 5): any[] => {
  return new Array(items).fill(value)
}

// let arr15 = getArray15('abc', 3)
let arr15A = getArrayA15(5, 3) // [5, 5, 5]
console.log(arr15A)
let res15A = arr15A.map(item => item.length)
console.log(res15A)

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
