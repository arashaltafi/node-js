const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect(err => {
    if (err) {
        console.log('connection is failed!', err.message);
        return;
    }

    console.log('mysql server is ok ...');
});

module.exports = connection.promise();