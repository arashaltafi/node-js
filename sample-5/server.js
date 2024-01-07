const path = require('path');
const http = require('http');
const fs = require('fs');
const port = 8080;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    let pathSwitch = '';
    switch (req.url) {
        case '/':
            pathSwitch = '/index.html';
            break;
        case '/about':
            pathSwitch = '/about.html';
            break;
        case '/contact':
            pathSwitch = '/contact.html';
            break;
        default:
            pathSwitch = '/404.html';
            break;
    }

    const pathName = path.join(__dirname, pathSwitch);

    if (pathSwitch === '/404.html') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>Page Not Found</h1>');
    } else {
        fs.readFile(pathName, (err, data) => {
            res.setHeader('Content-Type', 'text/html');

            if (err) {
                console.log(err);
                res.statusCode = 400;
                return res.end();
            }

            res.statusCode = 200;
            return res.end(data);
        })
    }
})

server.listen(port, () => {
    console.log(`server is running at port ${port} ...`);
})