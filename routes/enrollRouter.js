const express = require('express');
const userController = require('../controllers/userController.js');
const validation = require('../auth/joi.js');

const router = express.Router();

router.route('/')
    .post(validation.enrollValidation, userController.enroll);

module.exports = router;