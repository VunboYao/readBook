// 左移 一位
console.log(1 << 2);
// 01 => 100 = 4

console.log(8 << 1); // 左移一位意味着 * 2    1000 => 10000 = 16
console.log(8 >> 1); // 右移一位意味着整除 2   1000 => 100 = 4
console.log(9 >> 1); // 1001 => 100 = 4

console.log(2 ^ 2); // 0  10 ^ 10 = 00
console.log(2 ^ 3); // 1  10 ^ 11 = 01

/*
  & 与： 两个同时是 1 的时候，结果是 1 否则是 0
  | 或： 两个同时是 0 的时候是 0， 否则是 1
  ^ 异或运算： 两个数不同，则是 1，相同就是 0
 */

/*
 | 进行授权
 & 进行校验
*/
let STYLE = 1
let CLASS = 1 << 1
let CHILDREN = 1 << 2

// 授权
let vnodeType = STYLE | CLASS

// 判断
console.log(!!(vnodeType & STYLE));
console.log(!!(vnodeType & CLASS));
console.log(!!(vnodeType & CHILDREN));

// 删除
console.log('授权后');
vnodeType = vnodeType ^ CLASS
console.log(!!(vnodeType & STYLE));
console.log(!!(vnodeType & CLASS));
console.log(!!(vnodeType & CHILDREN));
