import { ArrayStack } from "./01-index";


function decimalToBinary(decimal: number): string {
  // 1.创建一个栈来存储余数
  const stack = new ArrayStack<number>()

  // 2.循环：
  // while: 不确定次数，只知道循环结束的条件
  // for：需要知道循环的次数
  while (decimal > 0) {
    const remainder = decimal % 2
    stack.push(remainder)

    decimal = Math.floor(decimal / 2)
  }

  // 3.已经获得所有的余数，遍历从栈顶取出
  let binary = ''
  while (!stack.isEmpty()) {
    binary += stack.pop()
  }

  return binary
}



console.log(decimalToBinary(10))
console.log('------')
console.log(decimalToBinary(100))
