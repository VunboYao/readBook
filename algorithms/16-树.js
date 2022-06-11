/*
* 数组：
优点：
  - 根据下标访问效率会很高
  - 如果根据元素来查找对应的位置？ 比较好的方式是先对数组进行排序，再二分查找
缺点：
  - 需要对数组先进行排序，生成有序数组，才能提高查找效率
  - 插入和删除数据时，需要大量的位移操作，效率低

* 链表：
优点：
  - 插入和删除效率高
缺点：
  - 查找效率低，需要从头开始依次访问链表中的每个数据项，直到找到
  - 即使插入和删除效率很高，但是如果要插入和删除中间位置的数据，还是需要重头先找到对应的数据

* 哈希表：
优点：
  - 插入/查询/删除效率都很高
缺点：
  - 空间利用率不高，底层使用的是数组，某些单元没有被利用
  - 元素是无序的，不能按照固定的顺序来遍历哈希表中的元素
  - 不能快速查找出哈希表中的最大值/最小值这些特殊的值

* 树结构：
  - 树综合了上面的数据结构的优点，也弥补了上面数据结构的缺点
  - 结构是非线性的，可以表示一对多的关系。如文件的目录结构

! 二叉树
  - 左子树
  - 右子树
  - 一个二叉树第 i 层的最大节点数为： 2^(i-1), i >= 1
  - 深度为 k 的二叉树有最大节点总数为： 2^k - 1, k >= 1
  - 对任何非空二叉树 T，若 n0 表示叶节点的个数，n2是度为2的非叶节点个数，那么 n0 = n2 + 1

! 二叉搜索树
  - 相对较小的值总是保存在左节点上，相对较大的值总是保存在右节点上
*/

class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
class BinarySearchTree {
  constructor(key) {
    this.root = null
    this.result = '' // 记录遍历结果
  }

  insert(key) {
    // 1.创建节点
    let newNode = new Node(key)

    // 2.判断根节点
    if (this.root === null) {
      this.root = newNode
    } else {
      // !递归调用
      this.insertNode(this.root, newNode)
    }
  }

  insertNode(node, newNode) {
    // 左
    if (newNode.key < node.key) {
      // 左为空创建
      if (node.left === null) {
        node.left = newNode
      } else {
        // 否则递归获取
        this.insertNode(node.left, newNode)
      }
    } else {
      // 右
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  search(key) { }

  // !先序遍历 先处理 root
  preOrderTraverse() {
    this.result = ''
    this.preOrderTraverseNode(this.root)
    // 返回结果
    return this.result
  }
  preOrderTraverseNode(node) {
    if (node !== null) {
      // 1.拼接节点
      this.result += ` ${node.key}`
      // 2. 处理所有经过的左子节点
      this.preOrderTraverseNode(node.left)
      // 3. 处理所有经过的右子节点
      this.preOrderTraverseNode(node.right)
    }
  }

  // !中序遍历
  midOrderTraverse() {
    this.result = ''
    this.midOrderTraverseNode(this.root)
    return this.result
  }
  midOrderTraverseNode(node) {
    if (node !== null) {
      // 1.先处理左节点
      this.midOrderTraverseNode(node.left)
      // 2. 处理节点
      this.result += ` ${node.key}`
      // 3.处理右节点
      this.midOrderTraverseNode(node.right)
    }
  }

  // !后序遍历 最后处理 root
  postOrderTraverse() {
    this.result = ''
    this.postOrderTraverseNode(this.root)
    return this.result
  }
  postOrderTraverseNode(node) {
    if (node !== null) {
      // 1.查找左子树节点
      this.postOrderTraverseNode(node.left)
      // 2.查找右子树节点
      this.postOrderTraverseNode(node.right)
      // 3.处理节点
      this.result += ` ${node.key}`
    }
  }

  min() {
    let node = this.root
    while (node.left !== null) {
      node = node.left
    }
    return node && node.key
  }
  
  max() {
    let node = this.root
    while (node.right !== null) {
      node = node.right
    }
    return node && node.key
  }

  remove(key) { }
}

// -----------------------------

// * 创建二叉树
let bst = new BinarySearchTree()
// * 测试插入
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

// *3.测试先序遍历
let pre = bst.preOrderTraverse()
console.log(`pre: ${pre}`);

// *4.中序遍历
let middle = bst.midOrderTraverse()
console.log(`middle: ${middle}`);

// *5.后序遍历
let post = bst.postOrderTraverse()
console.log(`post: ${post}`);

// *6最大、最小值
let min = bst.min()
let max = bst.max()
console.log(`min: ${min}, max: ${max}`);
