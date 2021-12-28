// 泛型类
class Cache26<T>{
  arr: T[] = []
  add(value: T): T {
    this.arr.push(value)
    return value
  }
  all(): T[] {
    return this.arr
  }
}

// 指定必须传入number
let cache26 = new Cache26<number>()
cache26.add(1)
cache26.add(3)
cache26.add(5)
cache26.add(1)
console.log(cache26.all());
