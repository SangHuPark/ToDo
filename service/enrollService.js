const User = require('../models/user');

async function idOverlapCheck(user_id) {
    User.findOne({ where : { user_id: user_id }})
        .then((data) => {
            return data;
    });
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
    idOverlapCheck,
    insertUser
};