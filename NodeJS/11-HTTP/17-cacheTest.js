const http = require('http')

const server = http.createServer((req, res) => {
	const path = req.url
	if (path === '/cache') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'text/plain',
			'cache-control': 'max-age=100',
			'age': '90'
		})
		res.end('Cache Test')
	}
})

server.listen(1929, () => {
	console.log('server is listening: http://127.0.0.1:1929');
})
