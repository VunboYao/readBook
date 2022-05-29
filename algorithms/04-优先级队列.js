class PriorityQueue {
  constructor() {
    // * 队列声明
    this.items = []
  }

  // 添加
  enqueue(element, priority) {
    // * 1.创建元素
    let queueElement = new QueueElement(element, priority)

    // * 2.第一个为空直接push
    if (this.isEmpty()) {
      this.items.push(queueElement)
    } else {
      // * 2.1 是否添加的标识
      let added = false
      // * 2.2 遍历处理
      for (let i = 0; i < this.items.length; i++) {
        if (queueElement.priority < this.items[i].priority) {
          // *2.3 插入到该索引之前
          this.items.splice(i, 0, queueElement)
          added = true // !已经插入，则退出
          break
        }
      }

      // * 2.4 优先级最低，没有比当前大的，最后push
      if (!added) {
        this.items.push(queueElement)
      }
    }
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
    let result = ''
    this.items.forEach(item => {
      result += ` ${item.element}-${item.priority}`
    })
    return result
  }

}

// 队列元素的封装，保存元素与优先级
class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

let pq = new PriorityQueue()
pq.enqueue('Anna', 111)
pq.enqueue('cba', 200)
pq.enqueue('nba', 50)
pq.enqueue('Duo', 66)
console.log(pq.size())
console.log(pq.toString());
