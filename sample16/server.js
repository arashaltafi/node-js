require('dotenv').config();
const db = require('./db');


const getAll = async () => {
    const [rows, fields] = await db.query(`SELECT * FROM users`)
    return { rows, fields };
}

const insertUser = async () => {
    const newUserData = {
        name: 'test name insert',
        family: 'test family insert',
        mobile: '0911111111',
        status: 1
    };
    const [rows, fields] = await db.query(`INSERT INTO users SET ?` , newUserData)
    console.log("rows", rows);
    console.log("fields", fields);
    console.log("-----------------------");
}

insertUser();

getAll().then(({ rows, fields }) => {
    console.log("rows", rows);
    console.log("fields", fields);
    console.log("-----------------------");
}).catch(error => {
    console.log(error.message)
})
