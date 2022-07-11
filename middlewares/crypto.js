const crypto = require('crypto-js');

async function encrypt(data, key) {
    return crypto.AES.encrypt(data, key).toString();
}

async function decrypt(data, key) {
    return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
};