const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const userService = require('../service/userService.js');
const pwFunc = require('../function/pwFunc.js');
const util = require('../function/replyFunc.js');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.login = async (req, res, next) => {
    const { user_id, user_pw } = req.body;
    const user_name = await User.findOne({  attributes:['user_name'], where: { user_id: req.body.user_id }})
    console.log(user_name);

    var reply = {};

    if(!user_id || !user_pw)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

    try {
        var loginCheck = await userService.duplicateIdCheck(user_id);
        if(!loginCheck) {
            return res.json(util.makeReply(reply, false, 302, '등록되지 않은 회원정보입니다.')); 
        }

        const checkPw = await pwFunc.makePasswordHashed(user_id, user_pw);
        if(checkPw !== loginCheck.user_pw) {
            return res.json(util.makeReply(reply, false, 303, '비밀번호를 확인하세요.'));
        }

        token = jwt.sign({
            type: 'JWT',
            user_id: user_id
          }, JWT_SECRET_KEY, {
            expiresIn: '15m',
            issuer: user_name.toString(),
          });
        
        return res.status(200).json({
            code: 200,
            message: '토큰이 발급되었습니다.',
            token: token
        });
    } catch (err) {
        console.log(err);
        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}