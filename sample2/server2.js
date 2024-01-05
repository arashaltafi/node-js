const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    switch (req.url) {
        case '/':
            res.write(JSON.stringify({
                value: 'Welcome To Home!',
                status: 200
            }));
            break;
        case '/about':
            res.write(JSON.stringify({
                value: 'Welcome To About!',
                status: 200
            }));
            break;
        case '/contact':
            res.write(JSON.stringify({
                value: 'Welcome To Contact!',
                status: 200
            }));
            break;
        default:
            res.write(JSON.stringify({
                value: 'Not Found!',
                status: 404
            }));
            break;
    }
    res.end();
})

server.listen(8080, () => {
    console.log('server is running at port 8080 ...');
});

server.on("connection", () => {
    console.log('new user connected!');
})