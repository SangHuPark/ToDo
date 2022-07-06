const User = require('../models/user');
const crypto = require('crypto');

const loginService = require('../service/loginService.js');
const util = require('../routes/function.js');

exports.login = async (req, res, next) => {
    const {
        user_id, user_pw
    } = req.body;

    var reply = {};

    if(!user_id || !user_pw || !user_name)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));
    if(user_id.length > 15)
        return res.json(util.makeReply(reply, false, 305, '아이디는 최대 15자까지 가능합니다.'));

    try {
        var inputInfo = await loginService.searchUserInfo(user_id);
        if(inputInfo.length < 1) {
            return res.json(util.makeReply(reply, false, 301, '존재하지 않는 아이디입니다.')); 
        }

        const hashed_pw = crypto.createHash('sha512').update(user_pw).digest('base64');
        if(inputInfo.user_pw !== hashed_pw) {
            return res.json(util.returnMake(data, false, 305, '비밀번호가 일치하지 않습니다.'));
        }

        return res.json(util.makeReply(reply, true, 200, '로그인에 성공하였습니다.'));
    } catch (err) {
        return res.status(500).send('Server error respose');
    }
}