// 泛型约束
/*
默认情况下我们可以指定泛型为任意类型
但是有些情况下我们需要指定的类型满足特定条件后才能指定
那么这个时候我们就使用泛型约束
*/

// 需求：要求指定的泛型类型必须有length属性才可以
interface LengthInterface {
  length: number
}

let getArray16 = <T extends LengthInterface>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value)
}

let arr16 = getArray16<string>('abc')
// let arr16 = getArray16<number>(12) // 泛型约束，number类型不满足
// 泛型具体的类型可以不指定， 如果没有指定，那么就会根据传递的泛型参数自动推导出来
// let arr16 = getArray16(5, 3) // [5, 5, 5]
let res16 = arr16.map(item => item.length)
console.log(res16)
