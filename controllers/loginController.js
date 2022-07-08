const User = require('../models/user');
const crypto = require('crypto');

const userService = require('../service/userService.js');
const util = require('../routes/function.js');

exports.login = async (req, res, next) => {
    
    User.findOne({  where: { user_id: req.body.user_id }})
        .then((data) => {
            console.log(data);
            const { user_id, user_pw, user_name } = data;
        });

    var reply = {};

    if(!user_id || !user_pw)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));

    try {
        var inputInfo = await userService.presentIdCheck(user_id);
        if(inputInfo) {
            return res.json(util.makeReply(reply, false, 301, '존재하지 않는 아이디입니다.')); 
        }

        const hashed_pw = crypto.createHash('sha512').update(user_pw).digest('base64');
        if(inputInfo.user_pw !== hashed_pw) {
            return res.json(util.returnMake(data, false, 302, '비밀번호를 확인하세요.'));
        }

        return res.json(util.makeReply(reply, true, 200, '로그인에 성공하였습니다.'));
    } catch (err) {
        return res.status(500).send('Server error respose');
    }
}