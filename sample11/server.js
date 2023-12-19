const express = require('express');
const app = express();
const port = 8080;

// GET method route
app.get('/', (req, res) => {
    // res.sendStatus(200)
    // res.send('GET request to the homepage')
    res.status(400).send({
        status: true,
        message: 'Hello From Express'
    })
})

// GET method route From Test
app.get('/test', (req, res) => {
    // res.sendStatus(200)
    // res.send('GET request to the homepage')
    res.send({
        status: true,
        message: 'Hello From Express Test'
    }) 
})

// GET method route From Test
app.get('/profile/:userId', (req, res) => {
    // res.sendStatus(200)
    // res.send('GET request to the homepage')
    res.send({
        status: true,
        message: 'Hello From Express Profile',
        userId: `user id is = ${req.params.userId}`
    })
})

// GET method route From Test
app.get('/request', (req, res) => {
    res.send({
        status: true,
        message: 'Hello From Express Request',
        protocol: req.protocol,
        hostname: req.hostname,
        subdomains: req.subdomains,
        body: req.body,
        cookies: req.cookies,
        headers: req.headers,
        header: req.header('user-agent'),
        ip: req.ip,
        method: req.method,
        url: req.url,
        path: req.path,
        params: req.params,
        query: req.query,
        isAjax: req.xhr,
        isSecure: req.secure,
    })
})

// POST method route
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})

// PATCH method route
app.patch('/', (req, res) => {
    res.send('PATCH request to the homepage')
})

// DELETE method route
app.delete('/', (req, res) => {
    res.send('DELETE request to the homepage')
})

// PUT method route
app.put('/', (req, res) => {
    res.send('PUT request to the homepage')
})

app.all('/', (req, res, next) => {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})