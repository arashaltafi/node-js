require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require('express')

const app = express()
const port = 8080
app.use(express.json())

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_FROM } = process.env;

//setting smtp
const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
    }
});

app.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email || !email.includes('@')) {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا ایمیل خود را وارد کنید'
            });
        }

        transporter.sendMail({
            from: MAIL_FROM,
            to: email,
            subject: 'Test Email Subject',
            text: 'Hello From Node.js!',
            html: '<h1>Hello From Node.js Html!</h1>'
        })
            .then(() => {
                return res.status(200).send({
                    state: 'ok',
                    message: 'عملیات موفق',
                    email: email
                });
            })
            .catch((error) => {
                return res.status(400).send({
                    state: 'err',
                    message: 'خطا در انجام عملیات',
                    error: error.message
                })
            });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
            error: error.message
        })
    }
})


app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})