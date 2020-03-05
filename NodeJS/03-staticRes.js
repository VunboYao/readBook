const path = require('path')
const fs = require('fs')
const mime = require('./mime')

function readFile(req, res) {
	const filePath = path.join(__dirname, 'www', req.url)
	/*
	* 加载其他资源不能用 utf-8
	* 如果服务器在响应数据时没有指定响应头, 在其他浏览器上可能无法显示
	* */
	const extName = path.extname(filePath)
	let type = mime[extName]
	if (String(type).startsWith('text')) {
		type += "; charset=utf-8"
	}
	res.writeHead(200, {
		'Content-Type': type
	})
	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.end('Server Error')
		} else {
			res.end(data)
		}
	})
}
module.exports = readFile
