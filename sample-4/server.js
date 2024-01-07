const fs = require('fs');
const path = require('path');

const pathName = path.join(__dirname, 'lorem.txt');

const readStream = fs.createReadStream(pathName, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
    console.log('chunk')
    console.log(chunk.toString());
})

readStream.on('end', () => {
    console.log('end event triggered!');
})

readStream.on('error', (err) => {
    console.log('error', err);
})