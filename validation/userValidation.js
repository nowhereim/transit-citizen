const Joi = require("joi");

exports.user = Joi.object({
  nickname: Joi.string().min(1).max(10).required(),
  gender: Joi.boolean().required(),
});
