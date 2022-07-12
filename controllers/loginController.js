const User = require('../models/user.js');

const userService = require('../service/userService.js');
const pwFunc = require('../function/pwFunc.js');
const util = require('../function/replyFunc.js');

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

        const checkPw = pwFunc.decrypt(user_pw, loginCheck.user_pw);
        console.log(checkPw);
        if(checkPw) {
            return res.json(util.makeReply(reply, false, 303, '비밀번호를 확인하세요.'));
        }

        return res.json(util.makeReply(reply, true, 200, '로그인에 성공하였습니다.'));
    } catch (err) {
        console.log(err);
        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}