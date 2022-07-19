const express = require('express');
const { auth } = require('../auth/authMiddleware.js');
const util = require('../function/replyFunc.js');

const router = express.Router();

router.route('/')
    .get(auth, async (req, res) => {
        const user_id = req.decoded.user_id;
        var tokenReply = {};
        return res.json(util.tokenReply(tokenReply, true, 200, '토큰은 정상입니다.', { user_id }));
    })
    .post()

module.exports = router;