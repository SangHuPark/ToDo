const User = require('../models/user.js');

async function searchUserInfo(user_id) {
    User.findOne({ where : { user_id: user_id }})
        .then((data) => {
            return data;
        });
}

module.exports = {
    searchUserInfo
};