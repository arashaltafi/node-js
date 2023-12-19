const http = require('http');
var url = require('url');
const port = 8078;

const server = http.createServer((req, res) => {
    console.log('server is creating ...')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('test 3');
    res.write('<h1>Tag H1</h1>');

    var q = url.parse(req.url, true).query;
    var txt = q.name + " " + q.family;
    res.write(txt);

    res.end();
})

server.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
});