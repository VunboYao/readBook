const http = require('http')
const url = require('url')
const qs = require('querystring')
const fs = require('fs')

const users = {}

http.createServer((req, res) => {
	// get
	const {query, pathname} = url.parse(req.url, true)

	//post
	let str
	req.on('data', (data) => {
		str += data
	})
	req.on('end', () => {
		const post = qs.parse(str)

		const {user, pass} = query

		switch (pathname) {
			case '/reg': // 注册
				if (!user) {
					res.write('{"err": 1, "msg": "user is required!"}')
				} else if (!pass) {
					res.write('{"err": 1, "msg": "pass is required!"}')
				} else if (!/^\w{8,32}$/.test(user)) {
					res.write('{"err": 1, "msg": "username is invalid!"}')
				} else if (/^['|"]$/.test(pass)) {
					res.write('{"err": 1, "msg": "pass is invalid!"}')
				} else if (users[user]) {
					res.write('{"err": 1, "msg": "username already exist!"}')
				} else {
					users[user] = pass
					res.write('{"err": 0, "msg": "register success!"}')
				}
				res.end()
				break
			case '/login': // 登录
				if (!user) {
					res.write('{"err": 1, "msg": "user is required!"}')
				} else if (!pass) {
					res.write('{"err": 1, "msg": "pass is required!"}')
				} else if (!/^\w{8,32}$/.test(user)) {
					res.write('{"err": 1, "msg": "username is invalid!"}')
				} else if (/^['|"]$/.test(pass)) {
					res.write('{"err": 1, "msg": "pass is invalid!"}')
				} else if (!users[user]) {
					res.write('{"err": 1, "msg": "no this user"}')
				} else if (users[user] !== pass) {
					res.write('{"err": 1, "msg": "username or password is incorrect!"}')
				} else {
					res.write('{"err": 0, "msg": "login success!"}')
				}
				res.end()
				break
			default:
				fs.readFile(`www${pathname}`, (err, data) => {
					if (err) {
						res.writeHead(404)
						res.write('Not Found')
					} else {
						res.write(data)
					}
					res.end()
				})
				break
		}
	})
}).listen(3000, () => {
	console.log('going 3000')
})
