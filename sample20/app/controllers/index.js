const http = require('http');
const socketIO = require('socket.io');
const socketConnection = require('./socket');
const socketConnectionMongo = require('./socket_mongo');

module.exports = (app, port) => {
    const server = http.createServer(app);
    const io = socketIO(server);

    // Socket.IO connection
    io.on('connection', (socket) => {
        socketConnection(socket, io)
        socketConnectionMongo(socket, io)
    });

    server.listen(port, () => {
        console.log(`app is running on port: ${port} ...`);
    });
}