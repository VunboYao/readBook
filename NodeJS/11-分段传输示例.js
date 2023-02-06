const http = require('http')

const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds))

const server = http.createServer(async (req, res) => {

	res.write(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<title>Demo Page</title>
		</head>
		<body>
	`)

	await sleep(3000)
	res.write('<h1>Hello, HTTP</h1>')
	await sleep(3000)
	res.write('<div>some text, the page will show after 3s</div>')
	await sleep(3000)
	res.write('<div>some text, the page will show after 3s</div>')
	res.end(`</body></html>`)
})

server.listen(3000)
