const express = require('express');
const { auth } = require('../auth/authMiddleware.js');

const User = require('../models/user.js');

const router = express.Router();

router.route('/')
    .get(auth, async (req, res) => {
        const user_id = req.decoded.user_id;
        return res.status(200).json({
          code: 200,
          message: '토큰은 정상입니다.',
          data: {
            user_id: user_id
          }
        });
    });

module.exports = router;