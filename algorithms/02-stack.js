class Stack {
  constructor() {
    this.items = []
  }
  // 入栈
  push(el) {
    this.items.push(el)
  }
  // 出栈
  pop() {
    return this.items.pop()
  }
  // 查看栈顶
  peek() {
    return this.items[this.items.length - 1]
  }
  // 是否为空
  isEmpty() {
    return !this.items.length
  }
  // 栈中的元素
  size() {
    return this.items.length
  }
  toString() {
    return this.items.join(' ')
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(5)
console.log(stack.peek());
console.log(stack.size());
console.log(stack.toString());
console.log(stack.isEmpty());
console.log(stack.pop());
console.log(stack.size());
console.log(stack.toString());


// 十进制转二进制
function dec2Bin(decNumber) {
  let stack = new Stack()
  while (decNumber > 0) {
    stack.push(decNumber % 2) // 获取余数
    console.log(`stack: ${stack}`);
    decNumber = Math.floor(decNumber / 2) // 向下取整
    console.log(`decNumber: ${decNumber}`);
  }

  let binaryString = ''
  while (!stack.isEmpty()) {
    binaryString += stack.pop() // 从头取出来
  }
  return binaryString
}
console.log(dec2Bin(10))
