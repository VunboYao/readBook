const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, 'abc.txt')
fs.open(filePath, (err, fd) => {
	if (err) {
		throw err
	} else {
		fs.fstat(fd, (err, state) => {
			console.log(state);
		})
	}
})
