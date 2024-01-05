const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(('Hello World!'));
    res.end();
})

server.listen(8080, () => {
    console.log('server is running at port 8080 ...');
});