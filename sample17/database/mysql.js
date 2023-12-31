const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

connection.connect(err => {
    if (err) {
        console.log('connection is failed!', err.message);
        return;
    }

    console.log('mysql server is ok ...');
});

module.exports = connection.promise();