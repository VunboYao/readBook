const http = require('http')
const fs = require('fs')

fs.readFile('a.txt', (err, data) => {
    if (!err) {
        console.log(data.toString())
    }
})
fs.writeFile('b.txt', 'yyb', err => {
    console.log(err);
})
/*http.createServer((req, res) => {
    // console.log(req.url);
    res.write('ok')
    res.end()
}).listen(3000, (err) => {
    console.log('listening 3000')
})*/
