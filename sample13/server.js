const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebug = require('debug')('startup');
const path = require('path');
const app = express();
const port = 8080;
const { logger } = require('./middleware');
const bodyParser = require('body-parser');

//middleware body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

//middleware custom
app.use(logger)

app.post('/login', (req, res) => {
    res.send(req.body);
    startupDebug('hello debug !!!')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/redirect', (req, res) => {
    res.redirect('https://arashaltafi.ir')
});

app.get('/download', (req, res) => {
    res.download(path.join(__dirname, 'resume_en.pdf'), (err) => {
        if (err) {
            console.log(err);
        }
    })
});

app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})