const logger = (req, res, next) => {
    if (req.path == '/error') {
        console.log('There is Was a Error');
        return res.status(403).send({
            status: false,
            message: "You Haven't Access To This Address"
        })
    }

    console.log(req.body);
    console.log(`request with path : ${req.path}`);
    next();
}

module.exports = {
    logger
};