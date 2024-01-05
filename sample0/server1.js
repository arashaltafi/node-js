const path = require('path');
const os = require('os');
const fs = require('fs');

console.log("parse", path.parse(__filename));
console.log("dirname", path.dirname(__filename));
console.log("basename", path.basename(__filename));
console.log("extname", path.extname(__filename));

console.log('********************')

console.log("homedir", os.homedir());
console.log("cpus", os.cpus());
console.log("freemem", os.freemem());
console.log("totalmem", os.totalmem());
console.log("platform", os.platform());
console.log("version", os.version());
console.log("homedir", os.homedir());

console.log('********************')

fs.readdir('./', (err, files) => {
    if (err) {
        console.log('error readdir', err);
        return;
    }
    console.log('readdir', files);
})

fs.readFile('./server.js', (err, data) => {
    if (err) {
        console.log('error readFile', err);
        return;
    }
    console.log('readFile', data.toString());
})