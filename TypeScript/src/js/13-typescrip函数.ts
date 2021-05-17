
function demo13t(name: string): void {
  console.log(name)
}

const a = function name13(name: string): void {
  console.log(name)
}

// name可选参数
let arrowF = (name?:string): void => {
  console.log(name);
}

// 剩余参数：定义一个name字符串，剩余参数为字符串，并放到一个数组中
let argument13 = (name:string, ...argument:string[]): string =>{
  console.log(name, argument);
  return 'string'
}
argument13('yao', '123', '4444', '122')
