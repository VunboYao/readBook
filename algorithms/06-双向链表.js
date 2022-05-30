class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null // 尾
    this.length = 0
  }

  append(element) {
    // 1. 创建一个新节点
    const node = new Node(element)
    // 2.判断第一个节点
    if (this.length === 0) {
      this.head = node
    } else {
      // 新节点指向之前的tail
      node.prev = this.tail
      this.tail.next = node // 为下一个新节点的next做处理
    }

    // 尾指向新节点
    this.tail = node
    // !3 length增加
    this.length += 1
  }

  toString() {
    return this.backwordString()
  }
  forwardString() {
    let current = this.tail
    let result = ''

    while (current) {
      result += `${current.data} `
      current = current.prev
    }
    return result
  }
  backwordString() {
    // 1.定义变量
    let current = this.head
    let result = ''

    // 2.循环获取
    while (current) {
      result += `${current.data} `
      current = current.next
    }
    return result
  }

  insert(position, element) {
    // 1.边界判断
    if (position < 0 || position > this.length) return false

    // 2.创建一个新的节点
    let node = new Node(element)

    // 3.初始化为空的
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      if (position === 0) {// 3.1 判断position是否为0
        node.next = this.head // 新的next => 原来的0 === head
        this.head.prev = node // 原来的prev => node
        this.head = node
      } else if (position === this.length) { // 3.2 判断最后一个
        node.prev = this.tail
        this.tail.next = node
        this.tail = node
      } else {
        // 3.3 中间插入：更改新节点对应的前后指针
        let current = this.head
        let index = 0
        // let previous = null
        while (index++ < position) {
          // previous = current
          current = current.next
        }
        /* node.prev = previous // 借用第三变量来处理
        node.next = current
        previous.next = node
        current.prev = node */
        node.next = current
        node.prev = current.prev
        current.prev.next = node
        current.prev = node
      }
    }

    // 4.length + 1
    this.length += 1
    return true
  }

  get(position) {
    // 1.边界判断
    if (position < 0 || position >= this.length) return null

    let middlePos = this.length / 2 > position
    let current
    if (middlePos) {
      // 正向查找
      current = this.head
      let index = 0
      while (index++ < position) {
        current = current.next
      }
    } else {
      // 反向查找
      current = this.tail
      let index = this.length - 1
      while (index-- > position) {
        current = current.prev
      }
    }

    return current.data
  }

  update(position, element) { //同 get，position的一半比较，优化性能
    // 1.边界判断
    if (position < 0 || position >= this.length) return false

    // 2.查找节点
    let current = this.head
    let index = 0
    while (index++ < position) {
      current = current.next
    }
    current.data = element
    return true
  }

  indexOf(element) {
    // 1.定义变量
    let current = this.head
    let index = 0
    // 2.查找
    while (current) {
      if (current.data === element) {
        return index
      }
      current = current.next
      index++
    }
    // 3.没有查找到
    return -1
  }

  removeAt(position) {
    // 1.边界判断
    if (position < 0 || position >= this.length) return null

    // 2.1 只有一个节点
    let current = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      // 2.2 删除第一个
      if (position === 0) {
        this.head.next.prev = null // 取消对其引用
        this.head = this.head.next
      } else if (position === this.length - 1) {
        // 2.3 删除最后一个
        current = this.tail
        this.tail.prev.next = null // 取消对其引用，则删除
        this.tail = this.tail.prev
      } else {
        // 2.4删除中间的某个值
        let index = 0
        while (index++ < position) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }

      // 3.lenth - 1
      this.length -= 1
      return current.data // 返回最后删除的数据
    }
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  isEmpty() {
    return this.length === 0
  }

  size() {
    return this.length
  }

  getHead() {
    return this.head.data
  }

  getTail() {
    return this.tail.data
  }
}

let doublyLink = new DoublyLinkedList()
doublyLink.append('Bob')
doublyLink.append('Anna')
doublyLink.append('Duo')

doublyLink.insert(4, 'Emma')
doublyLink.insert(2, 'Yao')
doublyLink.insert(5, 'Vunbo')

let getData = doublyLink.get(3)
console.log(`get ${getData}`);

let indexOfDemo = doublyLink.indexOf('Anna')
console.log(`indexOf ${indexOfDemo}`);

let updateDemo = doublyLink.update(1, 'Kuo')

let removeAtDemo = doublyLink.removeAt(3)

let removeDemo = doublyLink.remove('Bob')
console.log(`isEmpty:${doublyLink.isEmpty()}`);
console.log(`size:${doublyLink.size()}`);
console.log(`getHead: ${doublyLink.getHead()}`);
console.log(`getTail: ${doublyLink.getTail()}`);
console.log(doublyLink.toString());
console.log(doublyLink.forwardString());
