const User = require('../models/user');

async function idOverlapCheck(user_id) {
    const idCheck = await User.findOne({ where : {user_id: user_id }})
        .then((data) => {
            if(data) {
                return data;
            }
            else {
                return 0;
            }
        });
}

async function insertUser(newUserInfo) {
    const {
        user_newId, user_newPw, user_newName
    } = newUserInfo;

    const newUser = await User.create({
        user_id: user_newId,
        user_pw: user_newPw,
        user_name: user_newName
    })
    .then((result) => { // 회원 가입 성공 시
        res.send(result);
    })
    .catch((err) => { // 회원 가입 실패 시
        res.send(err);
    });

    return newUser;
}