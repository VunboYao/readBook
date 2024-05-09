{
  const _items = Symbol('stackItems')
  /* 0.栈 */
  class Stack {
    constructor() {
      this[_items] = [];
    }
    push(element) {
      this[_items].push(element);
    }
    pop() {
      return this[_items].pop();
    }
    peek() {
      return this[_items][this[_items].length - 1];
    }
    isEmpty() {
      return this[_items].length === 0;
    }
    clear() {
      this[_items] = [];
    }
    size() {
      return this[_items].length;
    }
  }

  function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';
    while (number > 0) {
      rem = Math.floor(number % 2);
      remStack.push(rem);
      number = Math.floor(number / 2);
    }

    while (!remStack.isEmpty()) {
      binaryString += `${remStack.pop()}`;
    }

    return binaryString;
  }
  // console.log(decimalToBinary(10));

  function baseConverter(decNumber, base) {
    const remStack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = '';

    if (!(base >= 2 && base <= 36)) {
      return '';
    }

    while (number > 0) {
      rem = Math.floor(number % base);
      remStack.push(rem);
      number = Math.floor(number / base);
    }

    while (!remStack.isEmpty()) {
      baseString += digits[remStack.pop()];
    }

    return baseString;
  }
  // console.log(baseConverter(100345, 16)); // 187F9
}

{
  // 队列
  class Queue {
    constructor() {
      this.count = 0
      this.lowerCount = 0
      this.items = {}
    }

    enqueue(element) {
      this.items[this.count] = element
      this.count++
    }

    dequeue() {
      if (this.isEmpty()) {
        return undefined
      }
      const result = this.items[this.lowerCount]
      delete this.items[this.lowerCount]
      this.lowerCount++
      return result
    }

    peek() {
      if (this.isEmpty()) {
        return undefined
      }
      return this.items[this.lowerCount]
    }

    isEmpty() {
      return this.count - this.lowerCount === 0
    }

    size() {
      return this.count - this.lowerCount
    }

    clear() {
      this.count = 0
      this.lowerCount = 0
      this.items = {}
    }

    toString() {
      if (this.isEmpty()) {
        return ''
      }
      let objString = `${this.items[this.lowerCount]}`
      for (let i = this.lowerCount + 1; i < this.count; i++) {
        objString = `${objString},${this.items[i]}`
      }
      return objString
    }
  }

  /*   const queue = new Queue()
    queue.enqueue('John')
    queue.enqueue('Jack')
    console.log(queue.toString());
    console.log(queue.size());
    console.log(queue.isEmpty());
    console.log(queue.dequeue());
    console.log(queue.toString()); */


  // 击鼓传花
  function hotPotato(elementsList, num) {
    const queue = new Queue()
    const elimitatedList = []

    for (let i = 0; i < elementsList.length; i++) {
      queue.enqueue(elementsList[i])
    }

    // 剩最后一个时候停止
    while (queue.size() > 1) {
      // 通过给定的数字num, 模拟击鼓传花, 达到了次数后, 移除那个节点
      for (let i = 0; i < num; i++) {
        queue.enqueue(queue.dequeue())
      }
      elimitatedList.push(queue.dequeue())
    }

    return {
      eliminated: elimitatedList,
      // 胜利者
      winner: queue.dequeue()
    }
  }

  const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
  const result = hotPotato(names, 2);
  result.eliminated.forEach(name => {
    console.log(`${name}被淘汰`);
  });
  console.log(`胜利者: ${result.winner}`);
}


{
  // 双端队列
  class Deque {
    constructor() {
      this.count = 0
      this.lowerCount = 0
      this.items = {}
    }

    isEmpty() {
      return this.count === this.lowerCount
    }

    clear() {
      this.count = 0
      this.lowerCount = 0
      this.items = {}
    }

    size() {
      return this.count - this.lowerCount
    }

    toString() {
      if (this.isEmpty()) {
        return ''
      }
      let objString = `${this.items[this.lowerCount]}`
      for (let i = this.lowerCount + 1; i < this.count; i++) {
        objString = `${objString},${this.items[i]}`
      }
      return objString
    }

    removeFront() {
      if (this.isEmpty()) {
        return undefined
      }
      const result = this.items[this.lowerCount]
      delete this.items[this.lowerCount]
      this.lowerCount++
      return result
    }

    removeBack() {
      if (this.isEmpty()) {
        return undefined
      }
      const result = this.items[this.count - 1]
      delete this.items[this.count - 1]
      this.count--
      return result
    }

    peekFront() {
      if (this.isEmpty()) {
        return undefined
      }
      return this.items[this.lowerCount]
    }

    addFront(element) {
      // 空时直接添加
      if (this.isEmpty()) {
        this.addBack(element)
      } else if (this.lowerCount > 0) {
        // 第一个元素索引不是0时,减1并赋值
        this.lowerCount--
        this.items[this.lowerCount] = element
      } else {
        // 索引为0, 其他元素往后挪一位, 并为其赋予索引减1的值, 从最后一位开始迭代所有的值
        for (let i = this.count; i > 0; i--) {
          this.items[i] = this.items[i - 1]
        }
        this.count++
        this.lowerCount = 0
        this.items[0] = element
      }
    }

    // 追加元素
    addBack(element) {
      this.items[this.count] = element
      this.count++
    }
  }

  const deque = new Deque();
  // console.log(deque.isEmpty()); // 输出 true
  deque.addBack('John');
  deque.addBack('Jack');
  // console.log(deque.toString()); // John, Jack
  deque.addBack('Camila');
  // console.log(deque.toString()); // John, Jack, Camila
  // console.log(deque.size()); // 输出 3
  // console.log(deque.isEmpty()); // 输出 false
  deque.removeFront(); // 移除 John
  // console.log(deque.toString()); // Jack, Camila
  deque.removeBack(); // Camila 决定离开
  // console.log(deque.toString()); // Jack
  deque.addFront('John'); // John 回来询问一些信息
  // console.log(deque.toString()); // John, Jack


  // 回文检查器
  function palindromeChecker(aString) {
    if (!aString) {
      return false
    }

    const deque = new Deque();
    // 去除空格
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true;
    let firstChar, lastChar;

    for (let i = 0; i < lowerString.length; i++) {
      deque.addBack(lowerString.charAt(i));
    }

    while (deque.size() > 1 && isEqual) {
      firstChar = deque.removeFront();
      lastChar = deque.removeBack();
      // 比较前后的值
      if (firstChar !== lastChar) {
        isEqual = false;
      }
    }

    return isEqual
  }

  console.log('a', palindromeChecker('a'));
  console.log('aa', palindromeChecker('aa'));
  console.log('kayak', palindromeChecker('kayak'));
  console.log('level', palindromeChecker('level'));
  console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
  console.log('Step on no pets', palindromeChecker('Step on no pets'));
}
