require('dotenv').config();
const nodemailer = require("nodemailer");
const express = require('express')

const app = express()
const port = 8080
app.use(express.json())

const { MAIL_USER, MAIL_PASS } = process.env;

//setting smtp
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
    debug: true
});

app.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email || email.length <= 0) {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا ایمیل خود را وارد کنید'
            });
        }

        if (Array.isArray(email)) {
            email.forEach((item) => {
                if (!item.includes('@')) {
                    return res.status(400).send({
                        state: 'err',
                        message: 'لطفا ایمیل خود را صحیح وارد کنید'
                    });
                }
            })
        } else {
            if (!email.includes('@')) {
                return res.status(400).send({
                    state: 'err',
                    message: 'لطفا ایمیل خود را صحیح وارد کنید'
                });
            }
        }

        transporter.sendMail({
            from: MAIL_USER,
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