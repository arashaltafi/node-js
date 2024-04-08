const express = require('express')
const app = express()
const port = 8080

app.get('/getDateTime', (req, res) => {
    const date = new Date();

    return res.status(200).send({
        time: {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        },
        day: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }
    });
})

app.get('/getDate', (req, res) => {
    const date = new Date();

    return res.status(200).send({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    });
})

app.get('/getTime', (req, res) => {
    const date = new Date();

    return res.status(200).send({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    });
})

app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})