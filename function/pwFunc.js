const crypto = require('crypto');

const User = require('../models/user.js');

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

async function createHashedPassword(user_pw) {
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(user_pw, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ hashed_pw: key.toString('base64'), pw_salt: salt });
        });
    });
}

async function makePasswordHashed (user_id, user_pw) {
    return new Promise(async (resolve, reject) => {
        const pw_salt = await User
            .findOne({
                attributes: ['pw_salt'],
                raw: true,
                where: {
                    user_id: user_id,
                },
            })
            .then((result) => result.pw_salt);

        crypto.pbkdf2(user_pw, pw_salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });
}

module.exports = {
    createHashedPassword,
    makePasswordHashed
};