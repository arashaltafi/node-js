const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 8080;
const dirName = __dirname;
const newFileName = 'test4.txt'
const newFileName2 = 'test5.txt'

console.log("path", path.resolve('test.txt'));

//Create Server
const server = http.createServer((req, res) => {
    // var q = url.parse(req.url, true);
    // var fileName = __dirname + q.pathname;

    //Append File
    fs.appendFile(newFileName, "I LOVE NODEJS", (err) => {
        if (err) {
            console.log("appendFile", `Can Not AppendFile ${newFileName} with This Error: ${err.toString()} in ${dirName}`);
            res.writeHead(404, { 'Content-Type': 'text/*' });
            return res.end(`Can Not AppendFile ${newFileName} with This Error: ${err.toString()} in ${dirName}`);
        }

        console.log('appendFile', `${newFileName} Added successfully in ${dirName}`);
        res.writeHead(200, { 'Content-Type': 'text/*' });
        return res.end(`${newFileName} Added successfully in ${dirName}`);
    })

    //Write File
    fs.writeFile(newFileName2, "I LOVE REACTJS", (err) => {
        if (err) {
            console.log("writeFile", `Can Not writeFile ${newFileName2} with This Error: ${err.toString()} in ${dirName}`);
            res.writeHead(404, { 'Content-Type': 'text/*' });
            return res.end(`Can Not writeFile ${newFileName2} with This Error: ${err.toString()} in ${dirName}`);
        }

        console.log('writeFile', `${newFileName2} Added successfully in ${dirName}`);
        res.writeHead(200, { 'Content-Type': 'text/*' });
        return res.end(`${newFileName2} Added successfully in ${dirName}`);
    })

    //OpenFile
    fs.open(newFileName, 'r', (err, file) => {
        if (err) {
            console.log('openFile', `Can Not OpenFile ${newFileName} with This Error: ${err.toString()} in ${dirName}`);
            res.writeHead(404, { 'Content-Type': 'text/*' });
            return res.end(`Can Not OpenFile ${newFileName} with This Error: ${err.toString()} in ${dirName}`);
        }

        console.log('openFile', `${newFileName} File is: ${file}`);
        res.writeHead(200, { 'Content-Type': 'text/*' })
        return res.end(`${newFileName} File is: ${file}`);
    })

    //ReadFile
    fs.readFile(newFileName, (err, data) => {
        if (err) {
            console.log('readFile', `Can Not ReadFile ${newFileName} with This Error: ${err.toString()} in ${dirName}`);
            res.writeHead(404, { 'Content-Type': 'text/*' });
            return res.end(`Can Not ReadFile ${newFileName} with This Error: ${err.toString()} in ${dirName}`);
        }

        console.log('readFile', `${newFileName} Data is: ${data.toString()}`);
        res.writeHead(200, { 'Content-Type': 'text/*' })
        return res.end(`${newFileName} Data is: ${data.toString()}`);
    })
})

//Listen Server
server.listen(8080, () => {
    console.log(`server is running at port ${port} ...`)
})