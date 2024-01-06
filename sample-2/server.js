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
});

console.log('*******************')

fs.readFile('./sample.json', (err, data) => {
    if (err) {
        console.log('error readFile', err);
        return;
    }
    console.log('readFile', data.toString());
});

console.log('*******************')

fs.writeFile('./sampleWrite.json', '{ "name": "Arash" }', (err) => {
    if (err) {
        console.log('error writeFile', err);
        return;
    }
    console.log('writeFile Successfully');
});

console.log('*******************')

fs.appendFile('./sampleAppend.json', '{ "age": 26 }', (err) => {
    if (err) {
        console.log('error appendFile', err);
        return;
    }
    console.log('appendFile Successfully');
});


console.log('*******************')

const sampleJson = JSON.parse(fs.readFileSync('./sample.json').toString());
sampleJson.name = 'Arash Updated';
sampleJson.version = '0.0.2';