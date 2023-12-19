const express = require('express');
const authRouter = express.Router();

authRouter.use((req, res, next) => {
    console.log(`from auth path = ${req.path}`);

    next();
})

authRouter.get('/login', (req, res) => {
    res.send({
        message: "Login Form"
    });
})

authRouter.post('/login', (req, res) => {

})

authRouter.get('/register', (req, res) => {
    res.send({
        message: "Register Form"
    });
})

authRouter.post('/register', (req, res) => {

})

authRouter.get('/reset_password', (req, res) => {

})

authRouter.post('/reset_password', (req, res) => {

})

authRouter.get('/activate', (req, res) => {

})

module.exports = authRouter;