const zlib = require('zlib')
zlib.deflate('Hello World, i study node.js', function (error, deflate_buf) {
  // 加密,压缩
  console.log(deflate_buf.toString());

  // 解密,解压
  zlib.inflate(deflate_buf, function (error, inflate_buf) {
    console.log(inflate_buf.toString());
  })
})
