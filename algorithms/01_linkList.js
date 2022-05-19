
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class LinkNodeList {
  constructor() {
    this.head = null
    this.length = 0
  }
  append(val) {
    let node = new Node(val)
    let p = this.head // 存储this.head，方便后续使用
    if (this.head) {
      // todo:找到最后一个节点，把这个节点的.next属性赋值为node
      while (p.next) {
        p = p.next
      }
      p.next = node
    } else {
      // 如果没有head节点，链表是空的，把要创建的节点，赋值给head
      this.head = node
    }
    this.length++
  }
  print() {
    let p = this.head
    let ret = ''
    if (this.head) {
      do {
        ret += p.val + '=>'
        p = p.next
      } while (p.next)
      ret += p.val // 最后一个p.next不存在，需要单独加上p.val
      console.log(ret);
    } else {
      console.log('empty');
    }
  }
}

let linkList = new LinkNodeList()

linkList.append(1)
linkList.append(2)
linkList.append(3)
linkList.append(4)
linkList.print()
console.log(linkList.length);
