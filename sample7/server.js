const http = require('http');
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.write(('Hello World!').toUpperCase())
    res.end();
})

server.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})