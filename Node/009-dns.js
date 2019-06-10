const dns = require('dns');

dns.resolve('google.com', (err, res) => {
  if (err) {
    console.log('err');
  } else {
    console.log(res);
  }
})
