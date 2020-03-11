const http = require('http')
const qs = require('querystring')
const path = require('path')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

const persons = {
	'lisi': {
		name: 'lisi',
		gender: 'male',
		age: '33'
	},
	'zhangsan': {
		name: 'zhangsan',
		gender: 'female',
		age: '24'
	}
}

http.createServer((req, res) => {
	// 获取请求的页面路径与请求方法
	if (req.url.startsWith('/index') && req.method.toLowerCase() === 'get') {
		const obj = url.parse(req.url) // 解析请求对象
		const filePath = path.join(__dirname, obj.pathname) // 拼接路径
		// 读取文件并返回
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				res.writeHead(404, {
					'Content-Type': 'text/plain; charset=utf-8'
				})
				res.end('走远了, NOT FOUND')
			} else {
				res.writeHead(200, {
					'Content-Type': 'text/html; charset=utf-8'
				})
				res.end(data)
			}
		})
		// post 请求与页面路径
	} else if (req.url.startsWith('/info') && req.method.toLowerCase() === 'post') {
		// post 必须拼接获取请求
		let params = ''
		req.on('data', data => {
			params += data
		})
		req.on('end', () => {
			// 通过querystring 解析 post 参数
			const obj = qs.parse(params)
			// 获取用户数据
			const per = persons[obj.userName]
			// 拼接路径
			let filePath = path.join(__dirname, req.url)
			// 读取文件并解析返回
			// fs.readFile(filePath, 'utf8', (err, data) => {
			// 	if (err) {
			// 		res.writeHead(404, {
			// 			'Content-Type': 'text/plain; charset=utf-8'
			// 		})
			// 		res.end('走远了, NOT FOUND')
			// 	} else {
			// 		data = data.replace('!!!name!!!', per.name)
			// 		data = data.replace('!!!gender!!!', per.gender)
			// 		data = data.replace('!!!age!!!', per.age)
			// 		res.end(data)
			// 	}
			// })
			res.writeHead(200, {
				'Content-Type': 'text/html; charset=utf-8'
			})
			let html = template(filePath, per)
			res.end(html)
		})
	}
}).listen(3000)