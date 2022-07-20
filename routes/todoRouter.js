const express = require('express');
const { auth } = require('../auth/authMiddleware.js');
const util = require('../function/replyFunc.js');
const todoController = require('../controllers/todoController.js')

const router = express.Router();

router.route('/')
/**
 * 조회하기
 * 사용자가 해당 날짜를 누르면 req 에 date 정보가 담겨있고 토큰이랑 같이 날라옴
 * 07/21 일단 추가부터 되는지 확인하고 결과에 owner_id 보고 그게 user_id 내용이 잘 담겨있으면 그걸로 findAll 해서 끌어오면 될듯~
 * .post(auth, todoController.findTodo)
 * const date = req.body;
 * const user_id = req.decoded.user_id;
 * 
 */
    .get(auth, async (req, res) => {
        const user_id = req.decoded.user_id;
        var tokenReply = {};
        return res.json(util.tokenReply(tokenReply, true, 200, '토큰은 정상입니다.', { user_id }));
    })
    .post(auth, todoController.addTodo)

module.exports = router;