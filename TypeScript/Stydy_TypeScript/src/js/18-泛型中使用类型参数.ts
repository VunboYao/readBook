/*
 1.在泛型约束中使用类型参数？
 一个泛型被另一个泛型约束，就叫做泛型约束中使用类型参数
*/

// 需求：定义一个函数用于根据指定的key获取对象的value

// let getProps18 = (obj: object, key: string): any => {
//   return obj[key]
// }

// 指定 K 继承自 T 中存在的 key 值
let getProps18 = <T, K extends keyof T>(obj: T, key: K): any => {
  return obj[key]
}

let obj18 = {
  a: '123',
  b: '456'
}

let res = getProps18(obj18, 'a') // 123
// 代码不够健壮，obj中没有c但这个key没有报错
// let res = getProps18(obj18, 'c') // undefined
console.log(res);
