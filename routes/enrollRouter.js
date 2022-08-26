const express = require('express');
const userController = require('../controllers/userController.js');
const { nameValidation } = require('../auth/joi.js');

const router = express.Router();

router.route('/')
    .post(nameValidation, userController.enroll);

module.exports = router;