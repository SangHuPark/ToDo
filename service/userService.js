const User = require('../models/user.js');

async function duplicateIdCheck(user_id) {
    const idData = await User.findOne({ where : { user_id: user_id }});
    
    return idData;
}

async function duplicateNameCheck(user_name) {
    const nameData = await User.findOne({ where : { user_name: user_name}});

    return nameData;
}

async function insertUser(newUserInfo) {
    const {
        user_id, hashed_pw, user_name
    } = newUserInfo;

    const newUser = await User.create({
        user_id: user_id,
        user_pw: hashed_pw,
        user_name: user_name
    })
    .then((result) => { // 회원 가입 성공 시
        return result;
    })
    .catch((err) => { // 회원 가입 실패 시
        throw new Error(err);
    });

    return newUser;
}

module.exports = {
    duplicateIdCheck,
    duplicateNameCheck,
    insertUser
};