const express = require('express');
const { create  } = require('express-handlebars');
const path = require('path');

const hbs = create();

module.exports = app => {
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'))
    app.use(express.static(path.join(__dirname, '../../public')))
};