Promise 对象不是异步的, 只要创建 Promise 对象就会立即执行存放的代码

Promise 对象三种状态

- pending: 默认状态
- fulfilled(resolved): 调用 resolve 函数, 状态就会变为 fulfilled,  表示操作成功
- rejected: 调用 reject 函数, 状态就会变为 rejected, 表示操作失败
- **状态一旦改变则不可逆**

监听 Promise 状态改变

- resolved => then()
- rejected => catch()

# then 方法

- then 方法接受两个参数
  - 第一个参数是成功回调
  - 第二个参数是失败回调

- 改变 Promise 的状态时, 可以通过 **```resolve(data)/reject(data)```**传递参数给 then 方法中的回调函数

- 同一个 Promise 可以**多次**调用 then 方法
- then 方法每次执行完毕后都会返回一个新的 Promise 对象, **返回新的Promise的状态继承上一个Promise的状态**

- 可以通过上一个 Promise 对象的 then 方法给下一个 Promise 对象的 then 方法传参. `return data`
  - **无论是在上一个 promise 对象的成功回调还是失败回调中传递参数, 都会传递给下一个promise对象的成功回调**
- 如果 then 方法返回的是一个 Promise 对象, 下一个 Promise 对象的状态取决于返回的 Promise 的状态,成功或失败

# catch 方法

- catch 其实是 **`then(undefined, () => {})`** 的语法糖

- catch 方法监听错误, **用链式编程**
  - *如果 Promise 的状态是失败, 但是没有对应失败的监听就会报错*
  - 原因: then 方法返回的 Promise 会继承状态. **失败状态时,如果 Promise 没有方法监听错误, 会报错**.
- **和 then 一样**, 修改 Promise 状态时, 可以传递参数给 catch 方法中的回调函数.
- **和 then 一样**, 同一个 Promise 可以**多次**调用 catch方法
- **和 then 一样**, catch 方法每次执行完毕后都会返回一个新的 Promise 对象.

- **和 then 一样**, **无论在上一个 Promise 的成功回调还是失败回调中传递参数, 都会传入下一个 Promise 的成功回调**
- **和 then 一样**,  catch 方法如果返回一个 Promise 对象,  下一个 Promise 对象的状态取决于返回的 Promise 的状态,成功或失败

- catch 方法可以捕获上一个 Promise 对象 then 方法中的异常

  ```javascript
  const promise = new Promise((resolve, reject) => {
      resolve('OK')
      // reject('ERROR')
  })
  promise.then(res => {
      console.log(res)
      xxx
  }).catch(err => {
      console.log(err) // 捕获XXX的异常
  })
  ```

  

