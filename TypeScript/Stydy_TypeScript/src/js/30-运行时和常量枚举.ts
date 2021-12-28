// 运行时枚举
// todo: 枚举在编译之后是一个真实存储的对象，所以可以在运行时使用，
//  而像接口这种只是用来做约束静态检查的代码，编译之后是不存在的

// 编译后不存在
interface TestInterface30 {
  name: string
  age: number
}

// 编译后存在
enum Gender30 {
  Male,
  Female
}

// 常量枚举
/*
* todo: 普通枚举和常量枚举的区别
*  普通枚举会生成真实存在的对象
*   常量枚举不会生成真实存在的对象，而是利用枚举成员的值直接替换使用到的地方
* */

enum Gender302 {
  Male,
  Female
}

console.log(Gender302.Male === 0)

const enum Gender303 {
  Male,
  Female
}

console.log(Gender303.Male === 0) // console.log(0 === 0)
