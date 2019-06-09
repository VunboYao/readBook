const http = require('http');
const qs = require('querystring');

http.createServer((req, res) => {
  let str = '';
  req.on('data', data => {
    str += data;
  });

  res.end('end', () => {
    console.log(qs.parse(str));
  }) 
}).listen(3000, ()=> {
  console.log('going 3000');
})
