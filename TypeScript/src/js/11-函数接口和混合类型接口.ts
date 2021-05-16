interface SearchFunc {
  // 函数定义：2个参数，字符串，返回值为boolean值
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = (sou: string, sub: string): boolean => {
  console.log(sou + sub);
  return 5 > -2
}
mySearch('vunbo', ' yao')

interface CountInterface {
  (): void
  count: number
}

let CountTest = (function (): CountInterface {
  // CountInterface接口要求：既是一个没有参数返回的函数，又是一个拥有count属性的对象

  // fn作为函数时符合接口定义中函数接口的设定：(): void
  // fn作为对象时符合接口定义中对象属性的设定：count: number

  let fn = <CountInterface>function () { // 类型断言
    fn.count++
    console.log(fn.count);
  }
  fn.count = 0
  return fn
})()
CountTest() // 1
CountTest() // 2
CountTest() // 3