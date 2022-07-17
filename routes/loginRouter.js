const express = require('express');
const loginController = require('../controllers/loginController.js');
const { authenticate } = require('../auth/authMiddleware.js');

const User = require('../models/user.js');

const router = express.Router();

router.route('/')
    .post(loginController.login);

module.exports = router;