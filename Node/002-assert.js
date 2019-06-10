const assert = require('assert');

function sum(a,b) {
  assert(arguments.length == 2, '必须是2个参数');
  assert(typeof a == 'number', '必须为数字');
  assert(typeof b == 'number', '必须为数字');

  return a + b;
}
console.log(sum(3));
