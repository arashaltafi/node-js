const express = require('express')
const svgCaptcha = require('svg-captcha');
const { Buffer } = require('buffer');

const app = express();
const port = 5000;

app.get('/captcha1', (req, res) => {
    const options = {
        size: 6, // Number of characters
        ignoreChars: '0o1i', // Characters to ignore
        noise: 5, // Number of noise lines
        color: true, // Text color
        background: '#ff0', // Background color
        fontSize: 80, // Font size
        width: 200, // Width
        height: 60, // Height
        mathOperator: '+/-', // Math operator
        charPreset: '0123456789' // Character preset
    };
    const captcha = svgCaptcha.create(options);
    const base64data = Buffer.from(captcha.data).toString('base64');
    res.status(200).json({
        code: captcha.text,
        data: base64data
    });
});

app.get('/captcha2', (req, res) => {
    const options = {
        size: 6, // Number of characters
        ignoreChars: '0o1i', // Characters to ignore
        noise: 5, // Number of noise lines
        color: true, // Text color
        background: '#f00', // Background color
        fontSize: 80, // Font size
        width: 200, // Width
        height: 60, // Height
        mathOperator: '+/-', // Math operator
        charPreset: 'abcdefghijklmnopqrstuvwxyz' // Character preset
    };
    const captcha = svgCaptcha.create(options);
    const base64data = Buffer.from(captcha.data).toString('base64');
    res.status(200).json({
        code: captcha.text,
        data: base64data
    });
});

app.listen(port, () => {
    console.log(`Captcha server running at http://localhost:${port}`);
});