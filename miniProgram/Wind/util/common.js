const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A','B','C','D','E','F','G','H','I','G','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const random = function generateMixed(n) {
  let res = ''
  for (let i = 0; i < n; i++) {
    // 0-Z 36个数, 第一个数可能是0, 向下取整数
    let id = Math.floor(Math.random() * 36)
    res += chars[id]
  }
  return res
}
export {random}
