
class HashTable {
  constructor() {
    this.storage = []
    this.count = 0
    this.limit = 7
  }

  hashFunc(str, size) {
    // 1.定义hashCode变量
    let hashCode = 0

    // 2.霍纳算法，计算hashCode的值
    for (let i = 0; i < str.length; i++) {
      hashCode = 37 * hashCode + str.charCodeAt(i)
    }
    // 3.取余操作
    let index = hashCode % size

    return index
  }

  /*
  1.根据key获取索引值
    目的：将数据插入到对应的位置
  2.根据索引值取出bucket
    a.如果桶不存在，创建并放置在该索引的位置
  3.判断新增还是修改
    a.如果已经有值，遍历获取并修改
    b.如果没有值，执行添加操作
  4.新增操作
  */
  put(key, value) {
    // 1.根据key值获取索引 [0,1,2,3]
    const index = this.hashFunc(key, this.limit)

    // 2.根据索引获取对应的bucket
    let bucket = this.storage[index]

    // 3.为空创建 [[], [], []]
    if (!bucket) {
      this.storage[index] = bucket = []
    }

    // 4.遍历判断是否修改数据 [[[k, v],[k, v]], [[k, v]], [[k,v]]]
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }

    // 5.进行添加操作
    bucket.push([key, value])
    this.count += 1
  }

  get(key) {
    // 1.根据key值获取索引 [0,1,2,3]
    const index = this.hashFunc(key, this.limit)
    // 2.查找bucket
    const bucket = this.storage[index]
    // 3.null判断
    if (!bucket) return null
    // 4.线性查找bucket中的内容
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        return tuple[1]
      }
    }
    // 5.没找到
    return null
  }

  remove(key) {
    const index = this.hashFunc(key, this.limit)
    const bucket = this.storage[index]
    if (!bucket) return null
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(i, 1)
        this.count--
        return tuple[1]
      }
    }
    return null
  }

  isEmpty() {
    return this.count === 0
  }

  size() {
    return this.count
  }
}

let ht = new HashTable()

ht.put('Duo', '123')
ht.put('Lily', '456')
ht.put('Ben', '666')
ht.put('Tom', '777')

console.log(ht.get('Duo'));
ht.put('Ben', '999');
console.log(ht.get('Ben'));

ht.remove('Tom')
console.log(ht.get('Tom'));
