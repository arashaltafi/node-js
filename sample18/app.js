const express = require('express');
const connectToMongoose = require('./connection_server');
const app = express();
const port = 8080;

app.get('/api/v1/users', async (req, res) => {
    try {
        const db = await connectToMongoose();
        const collection = db.collection('faker');
        const result = await collection.find({}).skip(0).limit(10).toArray();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send('Error in someFunction:', error.message)
    }
});

app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})