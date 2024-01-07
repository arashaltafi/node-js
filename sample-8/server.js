const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./User');
const app = express();
const port = 8080;
const url = "mongodb://root:gy1tIo4FOinBwnFDNqfTDb3K@robin.iran.liara.ir:32179/test?authSource=admin"

// add user
app.get('/addUser', (req, res) => {
    const user = new User({
        name: 'arash 2',
        email: 'arashaltafi1377@gmail.com 2',
        password: '123456'
    });

    user.save().then((result) => {
        console.log('user added successfully ...');
        res.send(result);
    }).catch((error) => {
        console.error('Error occurred while adding user', error.message);
        res.send(error.message);
    });
});

// get all users
app.get('/getUser', (req, res) => {
    User.find({}).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error.message);
    })
});

// delete users
app.get('/deleteUser', (req, res) => {

});

try {
    mongoose.connect(url);
    console.log('MongoDB connected successfully ...');
    app.listen(port, () => {
        console.log(`server is running at port ${port} ...`)
    })
} catch (error) {
    console.error('Error occurred while connecting to MongoDB', error.message);
}
