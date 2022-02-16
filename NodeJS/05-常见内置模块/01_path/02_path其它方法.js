const path = require('path')
const filepath = '/user/yyb/abc.txt'

console.log(path.dirname(filepath)) // /user/yyb
console.log(path.basename(filepath)) // abc.txt
console.log(path.extname(filepath)) // .txt
