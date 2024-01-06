const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'sampleFile');
const filePath = path.join(__dirname, 'sampleFile', 'sampleAppend.json');

if (fs.existsSync(directoryPath)) {
    fs.rmSync(directoryPath, { recursive: true });
} else {
    fs.mkdirSync('./sampleFile', { recursive: true });

    fs.appendFileSync(filePath, '{ "version": "0.0.1" }');

    const sampleJson = JSON.parse(fs.readFileSync(filePath));
    sampleJson.version = "0.0.2";
    fs.writeFileSync(filePath, JSON.stringify(sampleJson, null, 2));
}