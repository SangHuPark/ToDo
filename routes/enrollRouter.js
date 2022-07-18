const express = require('express');
const enrollController = require('../controllers/enrollController.js');

const User = require('../models/user.js');

const router = express.Router();

router.route('/')
    .post(enrollController.enroll);

module.exports = router;