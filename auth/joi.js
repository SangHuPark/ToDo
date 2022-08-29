const Joi = require('joi');
const util = require('../function/replyFunc.js');

exports.enrollValidation = async (req, res, next) => {
    const body = req.body; 
    const user_id_pattern = /^[a-z|A-Z|0-9]+$/;
    const user_pw_pattern = /^[a-z|A-Z|0-9|~!@#$%^&*()_+|<>?:{}]+$/;
    const user_name_pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/;
    const enrollSchema = Joi.object().keys({ 
        user_id: Joi.string()
            .max(15)
            .pattern(new RegExp(user_id_pattern))
            .required(),
        user_pw: Joi.string()
            .min(6)
            .max(15)
            .pattern(new RegExp(user_pw_pattern))
            .required(), 
        user_confirmPw: Joi.string()
            .valid(Joi.in('user_pw')),
        user_name: Joi.string()
            .max(15)
            .pattern(new RegExp(user_name_pattern))
            .required(),
        })
        .with('user_pw', 'user_confirmPw');

    try{
        await enrollSchema.validateAsync(body);

        return next();
    } catch (err) {
        var reply = {};

        console.log(err.message);

        return res.json(util.makeReply(reply, false, 309, "올바른 형식이 아닙니다."));
    }
}

exports.duplicateValidation = async (req, res, next) => {
    var reply = {};

    if(req.body.user_id) {
        const body = req.body;
        const user_id_pattern = /^[a-z|A-Z|0-9]+$/;
        const idSchema = Joi.object().keys({
            user_id: Joi.string()
            .max(15)
            .pattern(new RegExp(user_id_pattern))
            .required()
        })

        try {
            await idSchema.validateAsync(body);

            return next();
        } catch (err) {
            console.log(err.message);

            return res.json(util.makeReply(reply, false, 309, "올바른 형식이 아닙니다."));
        }
    } else if(req.body.user_name) {
        const body = req.body;
        const user_name_pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/;
        const nameSchema = Joi.object().keys({
            user_name: Joi.string()
            .max(15)
            .pattern(new RegExp(user_name_pattern))
            .required()
        })

        try {
            await nameSchema.validateAsync(body);
            
            return next();
        } catch (err) {
            console.log(err.message);

            return res.json(util.makeReply(reply, false, 309, "올바른 형식이 아닙니다."));
        }
    }
}