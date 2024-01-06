const path = require('path');
const fs = require('fs');

fs.mkdirSync('./sampleFile', { recursive: true });

fs.appendFileSync('./sampleFile/sampleAppend.json', '{ "age": 26 }');