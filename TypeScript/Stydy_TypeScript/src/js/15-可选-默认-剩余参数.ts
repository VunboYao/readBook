// TODO:可选参数
// 需求：要求定义一个函数可以实现2个数或者3个数的加法

function add15(x: number, y: number = 30, z?: number): number {
  return x + y + (z ? z : 0)
}
console.log(`add15(10, 20)`, add15(10))

// TODO：可选参数配合函数重载一起使用，让函数重载更加强大
function addF15(x: number, y: number, z: number): number
function addF15(x: number, y: number): number
function addF15(x: number, y: number, z?: number): number {
  if (z) {
    return x + y + z
  } else {
    return x * y
  }
}
console.log('函数重载配合可选参数', addF15(1, 2, 3))

// TODO:可选参数后面只能跟可选参数

function sum(...nums: number[]) {
  console.log(nums)
}
sum(30,202,20)
