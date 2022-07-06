const express = require('express');
const loginController = require('../controllers/loginController.js');

const User = require('../models/user.js');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        User.findAll({
            attributes: ['user_id', 'user_name'] // attributes를 사용해 배열에 리턴받을 컬럼명을 입력
        })
        .then((user) => {
            res.status(200).json(user);
        });
    })
    .post(loginController.login);

module.exports = router;