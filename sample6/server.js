const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 8080;

const server = http.createServer((req, res) => {
    var q = url.parse(req.url, true);
    var fileName = q.pathname;
    console.log("fileName", fileName);
    fs.readFile(__dirname + fileName, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found!!!");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
})

server.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
});