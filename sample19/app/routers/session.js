const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionsControllers');

router.post('/new', sessionController.newSession)

module.exports = router;