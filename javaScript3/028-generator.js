{
  // 迭代器工厂函数
  class Foo {
    [Symbol.iterator]() {
      return {
        next() {
          return {done: false, value: 'foo'}
        }
      }
    }
  }

  // 计数器
  class Counter {
    constructor(limit) {
      this.limit = limit
    }

    [Symbol.iterator]() {
      let count = 1,
          limit = this.limit
      return {
        next() {
          if (count <= limit) {
            return {done: false, value: count++}
          } else {
            return {done: true, value: undefined}
          }
        },

        // 提前终止迭代器【数组的迭代器不可提前关闭】
        // for-of循环通过break，continue, return， throw 提前推出
        // 解构操作并未消费所有的值
        return() {
          console.log('Exiting early')
          return {done: true}
        }
      }
    }
  }

  let counter = new Counter(4)
  for (let i of counter) {
    // 提前终止
    if (i > 2) {
      break
    }
    console.log('...', i)
  }
}


{
  // 生成器作为默认迭代器
  class Foo {
    constructor() {
      this.values = [1, 2, 3]
    }

    * [Symbol.iterator]() {
      yield* this.values
    }

    // 终止迭代
    return(val) {
      return {value: val, done: true}
    }
    throw() {
      throw new Error('generator error')
    }
  }

  const f = new Foo()
  for (let i of f) {
    console.log(i, '...')
  }
}
