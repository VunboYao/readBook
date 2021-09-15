// 函数接口
// 除了可以通过接口来限定对象以外，我们还可以使用接口来限定函数
interface SearchFunc {
  // TODO：函数定义：2个参数，数字，返回数字
  (a: number, b: number): number
}

let mySearch: SearchFunc = (x: number, y: number): number => {
  return x + y
}
const res11 = mySearch(10, 1)
console.log(res11)

// TODO：混合类型接口
// TODO： 约定的内容中既有对象属性，又有函数
interface CountInterface {
  (): void
  count: number
}

let CountTest = (function (): CountInterface {
  // CountInterface接口要求：既是一个没有参数返回的函数，又是一个拥有count属性的对象

  // fn作为函数时符合接口定义中函数接口的设定：(): void
  // fn作为对象时符合接口定义中对象属性的设定：count: number

  let fn = <CountInterface>function () {
    // 类型断言
    fn.count++
    console.log(fn.count)
  }
  fn.count = 0
  return fn
})()
CountTest() // 1
CountTest() // 2
CountTest() // 3
