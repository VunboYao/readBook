// 可选参数
// 需求：要求定义一个函数可以实现2个数或者3个数的加法

function add15(x:number, y:number=30, z?: number): number {
  return x + (y ? y : 0) + (z ? z : 0)
}

console.log(`add15(10, 20)`, add15(10))
