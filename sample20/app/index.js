const express = require('express');
const controllers = require('./controllers');
const app = express();

module.exports = (port) => {
    controllers(app, port)
}