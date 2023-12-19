const bodyParser = require('body-parser');
const cors = require('cors');
// const notFound = require('./404');

module.exports = (app) => {
    // app.use(cors);
    app.use(bodyParser.json());
    // app.use.use(notFound(app))
}