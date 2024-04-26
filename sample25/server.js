const ZarinpalPayment = require('zarinpal-pay')
const express = require('express')
const app = express()
const port = 8080

const merchant = '02bd9cac-xxxx-xxxx-xxxx-000c295eb8fc';
const isToman = true
const isSandbox = false
const zarinpal = new ZarinpalPayment(merchant, isToman, isSandbox);

app.use(express.json())

app.get('/', async (req, res) => {
    try {
        const createpay = await zarinpal.create({
            amount: 2000,
            callback_url: "http://localhost:8080/callback",
            mobile: "09187677641",
            email: "arashaltafi1377@gmail.com",
            description: "توضیحات تراکنش",
            order_id: "1010",
        });

        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: createpay.data
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

app.get('/callback', async (req, res) => {
    try {
        const { Authority, Status } = req.query;

        if (Status === "OK") {
            const verifypay = await zarinpal.verify({
                amount: 2000, authority: Authority
            });

            return res.status(200).send({
                state: 'ok',
                message: 'عملیات موفق',
                data: verifypay.data
            });
        } else {
            return res.status(400).send({
                state: 'err',
                message: 'سفارش شما لغو شد'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
            error: error.message
        })
    }
})

app.get('/getAll', async (req, res) => {
    try {
        const unverified = await zarinpal.unverified()

        return res.status(200).send({
            state: 'ok',
            message: 'عملیات موفق',
            data: unverified.data
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