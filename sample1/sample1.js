var http = require('http');
var dt = require('./date');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write('<br/>');
    res.write('Hello World!');
    res.write('<br/>');
    res.write(req.url);
    res.write('<br/>');
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.write(txt);
    res.write('<br/>');
    res.end();
}).listen(8085);