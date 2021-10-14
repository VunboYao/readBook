// TS中的函数
// TS中的函数大部分和JS相同

// 命名函数
function demo13t(name: string): void {
  console.log(name)
}

// 匿名函数
const a = function(name: string): void {
  console.log(name)
}

// 箭头函数：name可选参数
let arrowF = (name?: string): void => {
  console.log(name)
}

// 剩余参数：定义一个name字符串，剩余参数为字符串，并放到一个数组中
let argument13 = (name: string, ...argument: string[]): string => {
  console.log(name, argument)
  return 'string'
}
argument13('yao', '123', '4444', '122')
