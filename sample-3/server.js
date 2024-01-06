const fs = require('fs');
const path = require('path');

fs.mkdir('./sampleFile', (err) => {
    console.log('*******************')
    if (err) {
        console.log('error mkdir', err);
        return;
    }
    console.log('mkdir Successfully');
});


fs.rmdir('./sampleFile', (err) => {
    console.log('*******************')
    if (err) {
        console.log('error rmdir', err);
        return;
    }
    console.log('rmdir Successfully');
});


fs.unlink('./sampleDelete.json', (err) => {
    console.log('*******************')
    if (err) {
        console.log('error unlink', err);
        return;
    }
    console.log('unlink Successfully');
})


fs.readdir('./', (err, files) => {
    console.log('*******************')
    if (err) {
        console.log('error readdir', err);
        return;
    }
    console.log('readdir', files);
});


fs.readFile('./sample.json', (err, data) => {
    console.log('*******************')
    if (err) {
        console.log('error readFile', err);
        return;
    }
    console.log('readFile', data.toString());
});


fs.writeFile('./sampleWrite.json', '{ "name": "Arash Write" }', (err) => {
    console.log('*******************')
    if (err) {
        console.log('error writeFile', err);
        return;
    }
    console.log('writeFile Successfully');
});


fs.appendFile('./sampleAppend.json', '{ "age": 26 }', (err) => {
    console.log('*******************')
    if (err) {
        console.log('error appendFile', err);
        return;
    }
    console.log('appendFile Successfully');
});


const pathName = path.join(__dirname, 'sample.json');
const sampleJson = JSON.parse(fs.readFileSync(pathName).toString());
sampleJson.name = 'Sample Updated';
sampleJson.version = '0.0.2';
fs.writeFileSync(pathName, JSON.stringify(sampleJson, null, 2));