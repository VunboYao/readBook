const fs = require('fs');
const rs = fs.createReadStream('z1.png');
const ws = fs.createWriteStream('z2.png');

rs.pipe(ws);

rs.on('error', err => {
  console.log('error');
})

ws.on('finish', () => {
  console.log('success ws');
})
