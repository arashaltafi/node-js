require('dotenv').config();
const db = require('./db');

const getAll = () => {
    db.query(`SELECT * FROM users`, (error, result, fields) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);
        console.log("fields", fields);

        console.log("-----------------------");
    });
}

const getAllLimit = () => {
    db.query(`SELECT name,family FROM users LIMIT 1`, (error, result, fields) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);

        console.log("-----------------------");
    });
}

const getAllWhere1 = () => {
    const statusId = 1;
    db.query(`SELECT * FROM users WHERE status = ${statusId}`, (error, result, fields) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);
        console.log("-----------------------");
    });
}


const getAllWhere2 = () => {
    const statusId = 0;
    db.query(`SELECT * FROM users WHERE status = ?`, [statusId], (error, result, fields) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);
        console.log("-----------------------");
    });
}

const updateUser = () => {
    const statusId = 1;
    const family = "updatedFamily";
    db.query(`UPDATE users set family = ? WHERE status = ?`, [family, statusId], (error, result, fields) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);
        console.log("-----------------------");
    });
}

const deleteUser = () => {
    const name = 'jafar';
    db.query(`DELETE FROM users WHERE name = ?`, [name], (error, result, filed) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);
        console.log("-----------------------");
    })
}

const insertUser = () => {
    const userData = {
        id: 3,
        name: 'test name insert',
        family: 'test family insert',
        mobile: '0911111111',
        status: 1
    };
    db.query(`INSERT INTO users SET ?`, [userData], (error, result, filed) => {
        if (error) {
            throw new Error(error.message)
        }

        console.log("result", result);
        console.log("-----------------------");
    })
}

insertUser()