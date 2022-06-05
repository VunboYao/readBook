function isPrime(num) {
  for (let i = 2; i < num; i++) {
    // 如果被 2 到 num-1 之间某个数整除
    if (num % i === 0) {
      return false
    }
    return true
  }
}


console.log(isPrime(3));
console.log(isPrime(5));
console.log(isPrime(8));
console.log(isPrime(11));
console.log(isPrime(1237));
