const path = require('path');

const str = '/var/local/www/aaa/1.png';

console.log(path.dirname(str));
console.log(path.basename(str));
console.log(path.extname(str));
console.log(path.resolve(str));
