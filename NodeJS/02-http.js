/* 1. 搭建服务器 */
{
	/*const http = require('http')

	const server = http.createServer()

	server.on('request', (req,res) => {
		// 告诉浏览器返回的数据是什么类型, 返回的数据需要用什么字符来解析
		res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
		res.end('你好')
	})

	server.listen(3000)*/
}

/* 2. 简写搭建服务器 */
{
	/*const http = require('http')
	http.createServer((req, res) => {
		res.writeHead(200, {
			'Content-Type': 'text/plain; charset=utf-8'
		})
		res.end('Hello 姚')
	}).listen(3000, call => {
		console.log('listening on port: 3000')
	})*/
}

/* 3. http 路径请求分发 */
{
	/*const http = require('http')
	http.createServer((req, res) => {
		res.writeHead(200, {
			'Content-Type': 'text/plain; charset=utf-8'
		})
		console.log(req.url, '获取请求的路径')
		if(req.url.startsWith('/index')) {
			res.write('write方法可以多次返回数据, 但不具备结束本次请求的功能, 所以需要手动的调用end方法来结束本次请求')
			res.write('index1')
			res.write('index2')
			res.end()
		} else if (req.url.startsWith('/login')) {
			res.end('end方法返回数据,只会执行一次')
		} else {
			res.end('Hello World')
		}
	}).listen(3000, () => {
		console.log('listening port on 3000')
	})*/
}

/* 4.返回静态界面 */
{
	/*const http = require('http')
	const path = require('path')
	const fs = require('fs')

	http.createServer((req, res) => {
		if (req.url.startsWith('/index')) {
			// const filePath = path.join(__dirname, 'www', 'index.html')
			// const filePath = path.join(__dirname, 'www', req.url + '.html')
			// fs.readFile(filePath, 'utf8', (err, data) => {
			// 	if (err) {
			// 		res.end('Server Error')
			// 	} else {
			// 		res.end(data)
			// 	}
			// })
			readFile(req, res)
		} else if (req.url.startsWith('/login')) {
			// const filePath = path.join(__dirname, 'www', 'login.html')
			// const filePath = path.join(__dirname, 'www', req.url + '.html')
			// fs.readFile(filePath, 'utf8', (err, data) => {
			// 	if (err) {
			// 		res.end('Server Error')
			// 	} else {
			// 		res.end(data)
			// 	}
			// })
			readFile(req, res)
		} else {
			res.writeHead(200, {
				'Content-Type': 'text/plain; charset=utf-8'
			})
			res.end('no anything')
		}
	}).listen(3000)


	function readFile(req, res) {
		const filePath = path.join(__dirname, 'www', req.url + '.html')
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				res.end('Server Error')
			} else {
				res.end(data)
			}
		})
	}*/
}

/* 5. 返回静态界面代码优化 */
{
	const http = require('http')
	const path = require('path')
	const fs = require('fs')

	http.createServer((req, res) => {
		readFile(req, res)
	}).listen(3000)


	function readFile(req, res) {
		const filePath = path.join(__dirname, 'www', req.url + '.html')
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				res.end('Server Error')
			} else {
				res.end(data)
			}
		})
	}
}
