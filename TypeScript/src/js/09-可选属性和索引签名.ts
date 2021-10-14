// 定义一个接口
interface FullName {
  firstName: string
  lastName: string
  middleName?: string
  [propName: string]: any // key为string,value为任意类型
}

// 需求：如果传递了middleName就输出完整名称，如果没有middleName，那么就输出firstName和lastName
function say9({ firstName, lastName, middleName }: FullName): void {
  if (middleName) {
    console.log(`My Name is: ${firstName}_${middleName}_${lastName}`)
  } else {
    console.log(`My Name is: ${firstName}_${lastName}`)
  }
}

// TODO: 如果使用接口来限定了变量或形参，那么在给变量或者形参赋值时，赋予的值就必须和接口限定的一摸一样才可以，多一个或者少一个都不行
say9({ firstName: 'Vunbo', lastName: 'Yao' })
// say9({firstName: 'Vunbo', lastName: 'Yao', middleName: '666'})

/*
 * TODO：但是在企业开发中可能多一个/少一个
 *       少一个或者少多个？ 可选属性"?"
 * */

/*
 * TODO：多一个或者多多个？如何绕开TS检查
 * */

// 方式一：使用类型断言
// say9({firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc'} as FullName)

// 方式二：使用变量
let obj9 = { firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc' }
say9(obj9)

// 方式三：使用索引签名: [propName:string]: any
say9({ firstName: 'Vunbo', lastName: 'Yao', middleName: '666', abc: 'abc', score: 12 })
