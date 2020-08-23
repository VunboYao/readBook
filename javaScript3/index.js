{
  // 3, 7, 4
  // 宏队列: [5]
  // 微队列: [1, 2]
	/* const first = () => (new Promise((resolve, reject) => {
		console.log(3)
		let p = new Promise(((resolve1, reject1) => {
			console.log(7)
			setTimeout(() => {
				console.log(5)
				resolve(6)
			}, 0)
			resolve1(1)
		}))
		resolve(2)
		p.then(arg => {
			console.log(arg)
		})
	}))
	first().then(arg => {
		console.log(arg)
	})
	console.log(4) */
}
{
  // 第一轮
  // 同步执行: 1 7
  // 宏: [0]
  // 微: [2, 8]

  // 第二轮
  // 同步执行: 1 7 2 3
  // 宏: [0]
  // 微: [8, 4, 6]

  // 第三轮
  // 同步执行: 1 7 2 3 8 4 6 5 0
  // 宏: []
  // 微: []
	/* setTimeout(() => {
		console.log(0)
	}, 0)
	new Promise(((resolve, reject) => {
		console.log(1)
		resolve()
	})).then(() => {
		console.log(2)
		new Promise(((resolve, reject) => {
			console.log(3)
			resolve()
		})).then(() => {
			console.log(4)
		}).then(() => {
			console.log(5)
		})
	}).then(() => {
		console.log(6)
	})

	new Promise(((resolve, reject) => {
		console.log(7)
		resolve()
	})).then(() => {
		console.log(8)
	}) */
}
{
	/*
	* 1. 只要数据实现了 Iterator 接口, 那么这个数据就有一个叫做 [Symbol.iterator] 的属性
	* 2. [Symbol.iterator] 的属性会返回一个函数
	* 3. [Symbol.iterator] 的属性返回的函数执行之后会返回一个对象
	* 4. [Symbol.iterator] 函数返回的对象中有一个叫做 next 的方法
	* 5. next 方法每次执行都会返回一个对象 { value: 1, done: false }
	* 6. 这个对象中存储了当前取出的数据和是否取完了的标记
	* */
	/*class MyArray {
		constructor() {
			for (let i = 0; i < arguments.length; i++) {
				this[i] = arguments[i]
			}
			this.length = arguments.length
		}

		[Symbol.iterator]() {
			let index = 0
			let that = this
			return {
				next() {
					if (index < that.length) {
						return {value: that[index++], done: false}
					} else {
						return {value: that[index], done: true}
					}
				}
			}
		}
	}

	const arr = new MyArray(1, 3, 5)
	// 自定义数组执行 for...of...
	for (let i of arr) {
		console.log(i)
	}*/
	/*const it = arr[Symbol.iterator]()
	console.log(it.next()) // { value: 1, done: false }
	console.log(it.next()) // { value: 3, done: false }
	console.log(it.next()) // { value: 4, done: false }
	console.log(it.next()) // { value: undefined, done: true }*/
}
{
  /* A()
  function A(params) {
    console.log('Start');
    const res = B()
    console.log(res);
    console.log('end');

  }
  function B(params) {
    console.log('B-start');
    return true
  }
  function PA(params) {
    return new Promise((resolve, reject) => {
      console.log('start');
      resolve('OK')
      return
      console.log('end');
      setTimeout(() => {
        console.log('setTimeout');
      }, 1000);
    })
  } */
}
{
  class Person{
    constructor(name) {
      this.name = name
    }

    sayName() {
      console.log(this.name);
    }
    Person() {
      console.log('OK');
    }
  }
}
