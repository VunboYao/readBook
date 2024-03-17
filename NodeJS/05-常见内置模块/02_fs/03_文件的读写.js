const assert = require('assert')
const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, 'abc.txt')

const fd = fs.openSync(filePath, 'w+')
const write_buf = Buffer.from('something to write')
fs.writeSync(fd, write_buf, 0, write_buf.length, 0)

const read_buf = Buffer.alloc(write_buf.length)
fs.readSync(fd, read_buf, 0, write_buf.length, 0)

console.log(read_buf.toString());

assert.equal(read_buf.toString(), 1)
fs.closeSync(fd)
