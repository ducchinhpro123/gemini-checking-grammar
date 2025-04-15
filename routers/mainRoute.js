const Controller = require('../controller/mainController');

const express = require('express');

const router = express.Router();

router.get('/', Controller.home);
router.post('/api/check-grammar', Controller.checkGrammar);

module.exports = router;
