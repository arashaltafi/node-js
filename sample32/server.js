// GraphQl
// npm i graphql graphql-http

const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { schema } = require('./schema');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'wellcome to graphql api'
    })
})

app.use('/graphql', createHandler({ schema }))

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});