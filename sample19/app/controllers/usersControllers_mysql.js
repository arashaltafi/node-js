const mysql = require('../boot/mysql')

const usersList = async (req, res, next) => {
    try {
        const perPage = req.query.perPage || 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * perPage;

        const [rows, _] = await mysql.query(`SELECT * FROM users`);

        const usersCount = rows.length;
        const totalPage = Math.ceil(usersCount / perPage);

        const [users, fields] = await mysql.query(`SELECT * FROM users LIMIT ${perPage} OFFSET ${offset}`);

        res.status(200).send({
            success: true,
            message: 'users list successfully created!!!',
            data: {
                users
            },
            meta: {
                totalCount: usersCount,
                pages: totalPage,
                next: `${process.env.APP_URL}/api/v1/users?page=${Number(page) + 1}`
            }
        });
    } catch (error) {
        next(error)
    }
}

const addUser = async (req, res, next) => {
    try {
        const { first_name, last_name, mobile, email } = req.body;
        if (
            first_name == undefined || first_name == "" ||
            last_name == undefined || last_name == "" ||
            mobile == undefined || mobile == "" ||
            email == undefined || email == ""
        ) {
            return res.status(422).send({
                error: true,
                message: 'data input is not valid!'
            })
        }

        const userData = {
            first_name,
            last_name,
            mobile,
            email
        };

        const query = mysql.query(`INSERT INTO users SET ?`, userData)
        query.then(result => {
            return res.status(201).send({
                success: true,
                message: 'user added successfully.',
                userData
            });
        }).catch(error => {
            throw new Error(error.message);
        }).finally();

    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const condition = {
            id: id
        };
        if (id) {
            const user = await mysql.query("SELECT * FROM users WHERE ?", condition)

            if (!user) {
                res.status(404).send({
                    error: true,
                    message: 'user not found!'
                });
            } else {
                const userData = user[0];

                res.status(200).send({
                    success: true,
                    data: {
                        userData
                    }
                });
            }
        } else {
            res.status(404).send({
                error: true,
                message: 'user not found!'
            });
        }
    } catch (error) {
        next(error)
    }
}

const removeUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const condition = {
            id: id
        };

        if (id) {
            await mysql.query("DELETE FROM users WHERE ?", condition)
            res.status(200).send({
                success: true,
                message: 'user deleted successfully'
            });
        } else {
            res.status(404).send({
                error: true,
                message: 'user not found!'
            });
        }
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body;

        if (id && body.first_name !== '' && body.first_name !== undefined) {
            await mysql.query("UPDATE users SET first_name = ? WHERE id = ?", [body.first_name, id])

            res.status(200).send({
                success: true,
                message: 'user updated successfully',
            });
        } else {
            res.status(404).send({
                code: 404,
                error: true,
                message: 'user not found!'
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    usersList, addUser, getUser, removeUser, updateUser
};