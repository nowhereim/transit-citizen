const Joi = require('joi');

exports.user = Joi.object({
    snsId: Joi.required(),
    nickname: Joi.string()
                    .min(1)
                    .max(10)
                    .required(),
    phoneNumber: Joi.string()
                    .regex(/^(010)([0-9]{4})([0-9]{4})$/)
                    .messages({ error: '올바르지 않은 형식입니다.'})
                    .required(),
    gender: Joi
            .boolean()
            .required()
});