const TokenService = require('../services/TokenService');

module.exports = (req, res, next) => {
    if (!('authorization' in req.headers)) {
        return res.status(401).send({
            status: 'error',
            code: 401,
            message: "your are not authorized!"
        });
    }

    const token = TokenService.verify(req.headers.authorization)
    if (!token) {
        return res.status(401).send({
            status: 'error',
            code: 401,
            message: "your token in not valid!"
        });
    }

    next()
}