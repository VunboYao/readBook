
function isPrime(num) {
  // 获取num的平方根
  let temp = parseInt(Math.sqrt(num))

  for (let i = 2; i <= temp; i++) {
    if (num % i === 0) {
      return false
    }
  }

  return true
}



console.log(isPrime(3));
console.log(isPrime(5));
console.log(isPrime(8));
console.log(isPrime(11));
console.log(isPrime(1237));
console.log(isPrime(89));

