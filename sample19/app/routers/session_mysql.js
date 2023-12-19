const express = require('express');
const router = express.Router();
const sessionControllerMysql = require('../controllers/sessionsControllers_mysql');

router.post('/new', sessionControllerMysql.newSession)

module.exports = router;