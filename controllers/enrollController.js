const User = require('../models/user');

const userService = require('../service/userService.js');
const pwFunc = require('../function/pwFunc.js');
const util = require('../function/replyFunc.js');

const key = process.env.CRYPTO_SECRET;

exports.enroll = async (req, res, next) => {
    const user_id = req.body.user_newId;
    const user_pw = req.body.user_newPw;
    const user_confirmPw = req.body.user_confirmPw;
    const user_name = req.body.user_newName;

    var reply = {};

    if(!user_id || !user_pw || !user_name || !user_confirmPw)
        return res.json(util.makeReply(reply, false, 400, '입력하지 않은 항목이 존재합니다.'));
    if(user_id.length > 15)
        return res.json(util.makeReply(reply, false, 305, '아이디는 최대 15자까지 가능합니다.'));
    if(user_pw.length < 6 || user_pw.length > 15)
        return res.json(util.makeReply(reply, false, 306, '비밀번호는 6~15자로 입력해야 합니다.'));
    if(user_pw !== user_confirmPw)
        return res.json(util.makeReply(reply, false, 304, '비밀번호가 일치하지 않습니다.'));
    if(user_name.length > 10)
        return res.json(util.makeReply(reply, false, 307, '닉네임은 최대 10자까지 가능합니다.'));

    try {
        var enrollIdCheck = await userService.duplicateIdCheck(user_id);
        if(enrollIdCheck) {
            return res.json(util.makeReply(reply, false, 301, '이미 사용 중인 아이디입니다.')); 
        }
        var nameCheck = await userService.duplicateNameCheck(user_name);
        if(nameCheck) {
            return res.json(util.makeReply(reply, false, 308, '이미 사용 중인 이름입니다.'));
        }

        //const { hashed_pw, pw_salt } = await pwFunc.createHashedPassword(user_pw);
        console.log(await pwFunc.createHashedPassword(user_pw));
        const newUserInfo = { user_id, hashed_pw, pw_salt, user_name };
        const enrollUser = await userService.insertUser(newUserInfo);

        return res.json(util.makeReply(reply, true, 200, '회원가입을 성공하였습니다.'));
    } catch (err) {
        console.log(err);
        return res.json(util.makeReply(reply, false, 500, 'Server error response'));
    }
}