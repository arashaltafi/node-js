const express = require('express');
const boot = require('./bootstrap');
const app = express();
boot(app);
const port = process.env.APP_PORT;

app.get('/', (req, res) => {
    res.render('main', {
        layout: false,
        userID: 456
    });
})

module.exports = () => {
    app.listen(port, () => {
        console.log(`server is running at port ${port} ...`)
    })
}