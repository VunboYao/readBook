// Never类型
// 表示的是那些永不存在的值的类型
// TODO:一般用于抛出异常或根本不可能有返回值的函数

function Demo(): never {
  throw new Error('has some error')
}

// Demo()

function demo2(): never {
  while (true) {}
}
// demo2()

// Object类型：表示一个对象
let obj: object // 定义了一个只能保存对象的变量
// obj = 1; // error
// obj = '123' // error
// obj = true // error

obj = {
  name: 'yyb',
  age: 12,
}
console.log(obj)
