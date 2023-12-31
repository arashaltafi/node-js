const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    app.use(morgan('combined'));
}

app.use((req, res, next) => {
    console.log(`request with method : ${req.method}`);
    console.log(`request with url : ${req.url}`);
    next()
});

app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/about.html', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'about.html'));
});

//redirect
app.get('/about-me', (req, res) => {
    res.status(301)
    res.redirect('/about');
});

app.get('/contact', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'contact.html'));
});

//404
app.use((req, res) => {
    res.status(404)
    res.send('404 Not Found');
})

app.listen(8080, () => {
    console.log('server is running at port 8080 ...')
});