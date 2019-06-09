const fs = require('fs');

/* {
  fs.readFile('z.txt', (err, data) => {
    if (err) {
      console.log('err');
    } else {
      console.log(data.toString()); // 仅限文字
    }
  })
} */

/* {
  fs.writeFile('z1.txt', 'abcde', err => {
    if (err) {
      console.log(err);
    } else {
      console.log('ok');
    }
  })
} */

{
  fs.readFile('z.txt', (err, data) => {
    if (err) {
      console.log('err');
    } else {
      fs.writeFile('z2.txt', data.toString(), err=> {
        console.log(err);
      })
    }
  })
}
