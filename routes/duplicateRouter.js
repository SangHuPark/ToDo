const express = require('express');
const userController = require('../controllers/userController.js');
const validation = require('../auth/joi.js');

const router = express.Router();

router.route('/')
    .post(validation.duplicateValidation, userController.duplicateCheck);

module.exports = router;