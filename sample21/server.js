const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

wss.on('connection', (ws) => {
    console.log('A user connected');

    ws.on('message', (obj) => {
        let object = JSON.parse(obj);
        console.log("object", object);

        if (object.message instanceof Buffer) {
            object.message = message.toString();
        }

        object = JSON.stringify(object);

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(object);
            }
        });
    });

    ws.on('close', (resCode, des) => {
        console.log('User disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server listening on *:8080');
});