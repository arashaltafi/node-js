const UserModel = require('../models/UserModel');
const TokenService = require('../services/TokenService');

const newSession = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user) {
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