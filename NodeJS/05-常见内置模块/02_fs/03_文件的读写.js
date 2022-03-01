const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname, 'abc.txt')

fs.writeFile(
	filePath,
	'\nHello Vunbo',
	{
		flag: 'a+',
	},
	err => {
		console.log(err)
	}
)

/* fs.readFile(
	filePath,
	{
		encoding: 'utf-8',
	},
	(err, data) => {
		console.log(data)
	}
)
 */
