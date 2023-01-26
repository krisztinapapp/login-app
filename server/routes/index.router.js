const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/signup', userCtrl.signup);
router.post('/authenticate', userCtrl.authenticate);

router.get('/getUserInfo', jwtHelper.verifyJwtToken, userCtrl.getUserInfo);

module.exports = router;