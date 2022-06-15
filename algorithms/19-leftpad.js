// 二分思维

function leftpad(str, length, ch) {
  let len = length - str.length
  total = ''
  while (true) {
    // if (len % 2 === 1) {
    if (len & 1) {
      total += ch // 为 1 时，添加
    }
    if (len === 1) { // 只有一个，单独添加
      return total + str
    }

    ch += ch // 二分快速添加
    // len = parseInt(len / 2)
    len = len >> 1
  }
}
// 00000Hello
/*
0
001
0000
00000000Hello
*/
