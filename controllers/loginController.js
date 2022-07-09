const User = require('../models/user');
const crypto = require('crypto');

const userService = require('../service/userService.js');
const util = require('../routes/function.js');

exports.login = async (req, res, next) => {
    
    const { user_id, user_pw } = await User.findOne({  where: { user_id: req.body.user_id }})

    var reply = {};

    if(!user_id || !user_pw)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

    try {
        var loginCheck = await userService.duplicateIdCheck(user_id);
        if(!loginCheck) {
            return res.json(util.makeReply(reply, false, 302, '등록되지 않은 회원정보입니다.')); 
        }

        const hashed_pw = crypto.createHash('sha512').update(user_pw).digest('base64');
        console.log(loginCheck.user_pw);
        console.log(hashed_pw);
        if(loginCheck.user_pw !== hashed_pw) {
            return res.json(util.makeReply(reply, false, 303, '비밀번호를 확인하세요.'));
        }

        return res.json(util.makeReply(reply, true, 200, '로그인에 성공하였습니다.'));
    } catch (err) {
        console.log(err);
        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}