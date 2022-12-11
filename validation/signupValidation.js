const Joi = require("joi");

exports.signup = Joi.object({
  snsId: Joi.string()
    .min(6)
    .max(15)
    .pattern(new RegExp(/^([a-zA-Z0-9]{6,15})$/))
    .required()
    .messages({
      "string.min": "아이디는 6글자 이상이어야 합니다",
      "string.max": "아이디는 15글자 미만이어야 합니다",
      "string.pattern.base": "아이디는 6자 이상의 영문 혹은 영문과 숫자를 조합",
      "string.empty": "아이디는 필수 입력 정보 입니다.",
    }),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
      ),
    )
    .required()
    .messages({
      "string.min": "패스워드는 8글자 이상이어야 합니다",
      "string.max": "패스워드는 20글자 미만이어야 합니다",
      "string.pattern.base":
        "비밀번호는 10글자 이상의 영문/숫자/특수문자의 조합이어야 합니다",
    }),
  confirmpassword: Joi.string().valid(Joi.ref("password")).required(),
});
