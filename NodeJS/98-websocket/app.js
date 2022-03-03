const ws = require('nodejs-websocket')

const server = ws.createServer(conn => {
  conn.on('text', str => {
    let msg = JSON.parse(str)

    switch (msg.type) {
      case 'setname':
        conn.nickname = msg.name
        broadcast(JSON.stringify({ name: msg.name, text: '加入了房间' }))
        break
      case 'chat':
        broadcast(JSON.stringify({ name: conn.nickname, text: msg.text }))
        break
      default:
        break
    }
  })

  conn.on('close', () => {
    broadcast(`${conn.nickname}离开了房间`)
  })


  conn.on('error', err => {
    console.log('err :>> ', err)
  })

}).listen(8000)

// 发送信息
function broadcast(str) {
  server.connections.forEach(conn => {
    conn.sendText(str)
  })
}