const os = require('os');
const fs = require('fs');

console.log("platform", os.platform());
console.log("homedir", os.homedir());
console.log("hostname", os.hostname());
console.log("freemem", os.freemem());
console.log("totalmem", os.totalmem());
console.log("version", os.version());

console.log('*************************');

fs.readdir('./', (err, files) => {
    if (err) {
        console.log('error readdir', err);
        return;
    }
    console.log('readdir', files);
})

fs.readFile('./sample.json', (err, data) => {
    if (err) {
        console.log('error readFile', err);
        return;
    }
    console.log('readFile', data.toString());
})