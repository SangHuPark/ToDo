const Joi = require('joi');
const util = require('../function/replyFunc.js');

exports.nameValidation = async (req, res, next) => {
    const body = req.body.user_name;
    console.log(body);
    const user_name_pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]+$/;
    const nameSchema = Joi.object().keys({
        user_name: Joi.string()
            .max(15)
            .pattern(new RegExp(user_name_pattern))
            .required()
    });

    try {
        await nameSchema.validateAsync(body);

        return next();
    } catch (err) {
        var reply = {};

        console.log(err.message);

        return res.json(util.makeReply(reply, false, 309, "올바른 형식의 이름이 아닙니다."));
    }
}