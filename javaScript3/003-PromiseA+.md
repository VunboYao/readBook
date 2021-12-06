- 一个标准的、可互操作的 JS 开源协议，由社区制定并遵守
- Promise 代表了异步操作的最终结果。与 Promise 交互的主要方法是通过 then 方法，该方法注册回调来接收 Promise 的最终 value 或者失败的 reason
- 本规范描述了 then 方法的行为，通过提供一个可互操作的基础，所有符合 PromiseA+规范的 promise 实现都可以依靠他来实现。因此，该规范应该认为非常稳定。尽管 Promises/A+组织可能偶尔会修订本规范，并进行少量向后兼容的更改，以解决新发现的问题，只有在仔细考虑、讨论和测试之后，我们才会集成大型或向后不兼容的更改。
- 从历史上看，Promises/A+澄清了早期 Promises/A 提案中的行为条款，将其扩展到涵盖事实上的行为，并省略了未指定或有问题的部分。
- 最后，Promises/A+规范没有涉及如何创建、实现或拒绝承诺，而是选择专注于提供可互操作的方法。未来在配套规范中的工作可能涉及这些主题。

## 1.术语

1. “promise”是具有 then 方法的对象或函数，其行为符合本规范
2. “thenable”是一个定义了 then 方法的对象或者函数
3. “value”是任何合法的 JavaScript 值（包阔 undefined，thenable，或者一个 promise）
4. “exception”是通过 throw 语句抛出的值
5. "reason"是表示 promise 为什么 rejected 的值

## 2.必要条件

### 2.1 Promise 状态

Promise 必须是这三个状态之一：pending,fulfilled,rejected

1. 当状态为 pending
   1. promise 可以转为 fulfilled 或 rejected
2. 当状态 fulfilled
   1. 不能转换为其他的 state
   2. 必须有一个 value，且禁止改变
3. 当状态为 rejected
   1. 不能转换为其他的 state
   2. 必须有一个 reason，且禁止改变

这里的“must not change”意味着严等（===），仅限于引用地址不变，不能保证对象内部的数据变动(but does not imply deep immutability)

### 2.2 `then`方法

- Promise 必须提供一个 then 方法来访问当前或最终的 value 或 reason
- Promise 的 then 方法接受两个参数
  - `promise.then(onFulfilled, onRejected)`

1. onFulfilled 和 onRejected 都是可选参数
   1. 如果 onFulfilled 不是一个函数，必须忽略
   2. 如果 onRejected 不是一个函数，必须忽略
2. 如果 onFulfilled 是一个函数
   1. 必须在 promise 的状态是 fulfilled 后被调用，promise 的 value 作为第一个参数
   2. promise 的状态不是 fulfilled 时，禁止调用
   3. 不能被多次调用
3. 如果 onRejected 是一个函数
   1. 必须在 promise 的状态是 rejected 后被调用，promise 的 reason 作为第一个参数
   2. promise 的状态不是 rejected 时，禁止调用
   3. 不能被多次调用
4. onFulfilled 或者 onRejected 必须异步调用
   > Here “platform code” means engine, environment, and promise implementation code. In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack. This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick. Since the promise implementation is considered platform code, it may itself contain a task-scheduling queue or “trampoline” in which the handlers are called.
5. onFulfilled 和 onRejected 必须作为函数调用
   > That is, in strict mode this will be undefined inside of them; in sloppy mode, it will be the global object
6. 同一个 promise 的 then 能够被多次调用
   1. 如果 promise 是 fulfilled，所有对应的 onFulfilled 回调必须按照原始声明顺序依次执行
   2. 如果 promise 是 rejected,所有对应的 onRejected 回调必须按照原始声明依次执行
7. then 必须返回一个 promise
   - `promise2 = promise1.then(onFulfilled, onRejected);`
   1. 如果 onFulfilled 或者 onRejected 返回一个值`x`，运行 Promise Resolution 程序`[[Resolve]](promise2, x)`
   2. 如果 onFulfilled 或者 onRejected 抛出一个异常`e`，`promise2`状态变为 rejected，`e`作为 reason
   3. 如果 onFulfilled 不是一个函数并且`promise1`是 fulfilled，`promise2`必须是 fulfilled 且与`promise1`有相同的值
   4. 如果 onRejected 不是一个函数且`promise1`是 rejected,`promise2`必须是 rejected 且与`promise1`有相同的值

### 3.Promise 解决程序

ResolvePromise 的实现步骤：

1. 如果 promise 和 x 引用同一个对象，则拒绝 promise，原因为 TypeError
2. 如果 x 是一个 promise，跟随其状态
   1. 如果 x 是 pending，promise 必须保持 pending 直到 x 是 fulfilled 或 rejected
   2. 如果 x 是 fulfilled, promise 的 fulfilled 拥有相同的值
   3. 如果 x 是 rejected,promise 的 reject 拥有相同的值
3. 另外，如果 x 是一个 object 或 function
   1. `let then = x.then`
      > This procedure of first storing a reference to x.then, then testing that reference, and then calling that reference, avoids multiple accesses to the x.then property. Such precautions are important for ensuring consistency in the face of an accessor property, whose value could change between retrievals
   2. 如果 x.then 抛出一个异常 e，执行 promise 的 reject 并将 e 作为 reason
   3. 如果 then 是一个函数，以 x 作为 this 调用，第一个参数 resolvePromise,第二个参数 rejectPromise
      1. 如果 resolvePromise 是被 y 调用，运行`[[Resolve]](promise, y)`
      2. 如果 resolvePromise 被 `r` 调用，reject `promise` with `r`
      3. 如果同时调用了 resolvePromise 和 rejectPromise，或者对同一参数进行了多次调用，则第一次调用优先，任何后续调用都将被忽略。
      4. 如果调用 then 时，抛出异常 e
         1. 如果调用了 resolvePromise 或 rejectPromise，请忽略它。
         2. 相反，以 e 为参数调用 reject(e)
   4. 如果 then 不是函数，以 x 为参数调用 resolve(x)
4. 如果 x 不是 object 或 function，调用 resolve(x)
