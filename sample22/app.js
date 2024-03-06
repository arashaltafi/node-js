const express = require('express');
const http = require('http');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const server = http.createServer(app);

var options = {
  swaggerOptions: {
    validatorUrl: null
  },
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    url: 'http://petstore.swagger.io/v2/swagger.json'
  }
};

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
app.use('/', swaggerUi.serve, swaggerUi.setup(null, options));

server.listen(8080, () => {
    console.log('Server listening on *:8080');
});