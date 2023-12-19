const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log(`a user connected with id : ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`user disconnected with id : ${socket.id}`);
    });

    socket.on('send-message', (message) => {
        console.log("message", message);
        io.emit('receive-message', { message, senderId: socket.id });
    });
});

server.on("error", (err) => {
    console.log("Error opening server", err.message);
});

server.listen(port, () => {
    console.log(`listening on port: ${port}`);
});