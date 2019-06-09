const crypto = require('crypto');

/* {
  const obj = crypto.createHash('md5');

  obj.update('123')

  console.log(obj.digest('hex'));
} */

// 二次MD5加密
function md5(str) {
  const obj = crypto.createHash('md5');
  obj.update(str);
  return obj.digest('hex');
}

// 混淆密文
console.log(md5(md5('123456')+'yyb'));
