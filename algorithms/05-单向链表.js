class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  append(element) {
    const node = new Node(element)

    // 1.head === null，直接添加
    if (this.head === null) {
      this.head = node
    } else {
      // 2.head !== null, 将最后一个节点的 next 指向最新的一个
      let current = this.head
      while (current.next) {
        // 2.1如果next不为空，继续遍历获取最后一个
        current = current.next
      }
      // 2.2最后一个节点指向新创建的节点
      current.next = node
    }
    // 3.长度增加
    this.length += 1
  }
  insert(position, element) {
    // 1.边界判断
    if (position < 0 || position > this.length) return false
    // 2.创建node
    const node = new Node(element)
    // 3判断插入的位置是否是第一个
    if (position === 0) {
      node.next = this.head // 新的指向原来的第一个
      this.head = node // head指向新的
    } else {
      let index = 0
      let current = this.head
      let previous = null // 保存指向新节点的元素
      while (index++ < position) {
        previous = current // 指向前一个
        current = current.next
      }
      previous.next = node
      node.next = current
    }
    // 4.length 增加
    this.length += 1
    return true
  }
  get(position) {
    if (position < 0 || position >= this.length) return null
    let index = 0
    let current = this.head
    while (index++ < position) {
      current = current.next
    }
    return current.data
  }
  indexOf(element) {
    // 1.定义变量
    let current = this.head
    let index = 0
    // 2.查询
    while (current) {
      if (current.data === element) {
        return index
      }
      current = current.next // 指向下一个
      index++
    }
    // 3.没有返回 -1
    return -1
  }
  update(position, newData) {
    // 1.边界判断
    if (position < 0 || position >= this.length) return false

    // 2.查找正确的点
    let index = 0
    let current = this.head
    while (index++ < position) {
      current = current.next
    }

    // 3.改变data
    current.data = newData
    return true
  }
  remove(element) {
    let pos = this.indexOf(element)
    return !!this.removeAt(pos)
  }
  removeAt(position) {
    // 1.边界判断
    if (position < 0 || position >= this.length) return null

    let current = this.head
    // 2.判断第一个节点
    if (position === 0) {
      this.head = this.head.next
    } else {
      let previous = null
      let index = 0
      while (index++ < position) {
        previous = current // 保存前一个
        current = current.next
      }
      // 2.2 前一个节点的 next => current.next
      previous.next = current.next
    }

    // 3.length - 1
    this.length--
    return current.data
  }
  isEmpty() {
    return this.length === 0
  }
  size() {
    return this.length
  }
  toString() {
    let current = this.head
    let result = ''
    // 循环获取
    while (current) {
      result += `${current.data} `
      current = current.next // 更新指向
    }
    return result
  }
}


let linkDemo = new LinkedList()
linkDemo.append('Ben')
linkDemo.append('Anna')
linkDemo.append('Emma')
linkDemo.insert(2, 'Lisa')
linkDemo.insert(0, 'Yao')
let str = linkDemo.toString()
console.log(`length: ${linkDemo.size()}`);
console.log(`toString: ${str}`);
let getData = linkDemo.get(3)
console.log(`get: ${getData}`);
let indexOf = linkDemo.indexOf('Anna')
let indexOf2 = linkDemo.indexOf('Lisa')
console.log('indexOf: ' + indexOf);
console.log('indexOf: ' + indexOf2);

let update = linkDemo.update(2, 'Duo')
console.log(`update: ${update}: `);

let removeAt = linkDemo.removeAt(0)
console.log(`removeAt: ${removeAt}`);

let remove = linkDemo.remove('Anna')
console.log('remove: ' + remove);

console.log(`isEmpty: ${linkDemo.isEmpty()}`);
console.log(linkDemo.toString());
