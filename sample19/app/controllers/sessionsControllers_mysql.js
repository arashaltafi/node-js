const mysql = require('../boot/mysql')
const TokenService = require('../services/TokenService');

const newSession = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const condition = {
            email: email
        };

        const user = await mysql.query("SELECT * FROM users WHERE ?", condition)

        if (user[0] == undefined || user[0] == '' || user[0] == []) {
            return res.status(404).send({
                status: "error",
                code: 404,
                message: "your email or password dose't correct!"
            });
        }

        const token = TokenService.sign({ id: user._id })
        return res.status(200).send({
            status: "success",
            code: 200,
            message: "your are login successfully",
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    newSession
};