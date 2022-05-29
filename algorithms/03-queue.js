class Queue {
  constructor() {
    this.items = []
  }

  // 添加
  enqueue(el) {
    this.items.push(el)
  }

  // 移除
  dequeue() {
    this.items.shift()
  }

  // 返回第一个
  front() {
    return this.items[0]
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  toString() {
    return this.items.toString()
  }
}

let queue = new Queue()
queue.enqueue('abc')
queue.enqueue('cba')
queue.enqueue('nba')
queue.enqueue('fba')
console.log(queue.toString());
queue.dequeue()
console.log(queue.toString());
