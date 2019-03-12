const express = require('express');
const app = express();
const webSocket = require('ws')
/*const wss = new webSocket.Server({
    port: 3000
})*/

/*wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});*/


app.get('/',(req, res) => {
    console.log(req.data);
})

app.listen(3000);