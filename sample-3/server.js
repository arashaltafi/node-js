const fs = require('fs');

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


fs.writeFile('./sampleWrite.json', '{ "name": "Arash" }', (err) => {
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



const sampleJson = JSON.parse(fs.readFileSync('./sample.json').toString());
sampleJson.name = 'Sample Updated';
sampleJson.version = '0.0.2';
fs.writeFileSync('./sample.json', JSON.stringify(sampleJson, null, 2));