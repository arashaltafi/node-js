// GraphQl
// npm i graphql graphql-http

const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { schema } = require('./schema');
const connectToMongo = require('./config/mongo')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

connectToMongo();

const PORT = 5000;

app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'wellcome to graphql api'
    })
})

app.use('/graphql', createHandler({ schema, context: (req) => {
    // return req
    return {
        token: req.headers.token,
        theme: req.headers.theme,
    }
} }))

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});