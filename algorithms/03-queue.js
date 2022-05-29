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
    return this.items.shift()
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

/* let queue = new Queue()
queue.enqueue('abc')
queue.enqueue('cba')
queue.enqueue('nba')
queue.enqueue('fba')
console.log(queue.toString());
queue.dequeue()
console.log(queue.toString()); */

// !面试题：击鼓传花
function passGame(nameList, num) {
  // 1.建立队列
  let queue = new Queue()
  // 2.将所有人依次加入到队列中
  nameList && nameList.forEach(name => {
    queue.enqueue(name)
  })
  console.log(queue.toString());
  // 3.开始数数字
  while (queue.size() > 1) {
    for (let i = 0; i < num - 1; i++) {
      // 3.1将num前的删除并加入到末尾
      queue.enqueue(queue.dequeue())
    }
    // 3.2删除对应的num
    let res = queue.dequeue()
  }
  // 4.获取最后一个人
  let endName = queue.front()
  console.log('last Name: ' + endName)
  return nameList.indexOf(endName)
}

let names = ['abc', 'Lil', 'Bob', 'Anna', 'Duo']
// 每次数到3剔除一个
let result = passGame(names, 3)
console.log(result);
