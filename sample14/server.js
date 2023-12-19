require('dotenv').config()

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRouter = require('./authRouter');
const session = require('express-session');
const port = 8080;

const app = express();

//middleware
app.use(session({
    secret: "987s98ef7s8e9f4se4f6s5e4f",
    resave: true,
    saveUninitialized: true,
    name: "arash_session"
}));
app.use(cookieParser());
//for render url code
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//router
app.use('/auth', authRouter)  // "/login" => "auth/login"

app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})

app.get('/error', (req, res) => {
    try {
        throw new Error('error in application');
        res.send({
            message: "Login Form"
        });
    } catch (error) {
        res.send({
            message: `You Have an Error = ${error}`
        });
        console.log(error);
    }
})

app.get('/', (req, res) => {
    console.log(req.session);
    if (req.session.countOfVisit) {
        req.session.countOfVisit++;
        res.send({
            message: `Your Count Of Visit Site is: ${req.session.countOfVisit}`
        });
    } else {
        req.session.countOfVisit = 1;
        res.send({
            message: "Hello Welcome!"
        });
    }
})

app.get('/cookie', (req, res) => {
    //set cookies
    res.cookie('token', 'wsfwefoiwefh238h2893hf', {
        httpOnly: true
    });
    res.send({
        withCookie: true
    });

    //get cookies
    console.log(req.cookies);
})

app.get('/env', (req, res) => {
    res.send({
        env: process.env
    });

    console.log("MYSQL_HOST", process.env.MYSQL_HOST);
    console.log("MYSQL_USER", process.env.MYSQL_USER);
    console.log("MYSQL_PORT", process.env.MYSQL_PORT);
    console.log("MYSQL_DATABASE", process.env.MYSQL_DATABASE);
})