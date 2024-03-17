const fs = require('fs')
fs.readFile('./00HelloWorld.js', (error, buf) => {
  // 加密
  const encode = buf.toString("base64")
  // 解密
  const decode = Buffer.from(encode, 'base64').toString()
  console.log(decode)
})
