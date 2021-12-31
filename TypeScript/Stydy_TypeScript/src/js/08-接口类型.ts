/*
 * todo:接口类型
 *  和 number, string, boolean, enum这些数据类型一样
 *  接口也是一种类型，也是用来约束使用者的
 * */

// 定义接口类型
interface FullName2 {
  firstName: string
  lastName: string
}

let obj8 = {
  firstName: 'Vunbo',
  age: 20,
  lastName: 'Yao',
}
// 输出一个人的全名，参数必须都是字符串
function say8({ firstName, lastName }: FullName2): void {
  console.log(`My Name is ${firstName}_${lastName}`)
}
say8({ firstName: 'Vunbo', lastName: 'Yao' })
say8(obj8) // todo:直接传入对象的方式可跳过检查
