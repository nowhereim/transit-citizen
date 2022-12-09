const UserServices = require("../services/userServices");

class userControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  getLocalSignUpInfo = async (req, res, next) => {
    try {
      const { snsId, password, confirmpassword } = req.body;
      if (password.includes(snsId))
        return res.status(400).send({ error: "패스워드에 아이디 값 사용 불가" });
      const userIdCheck = await this.userServices.checkIsSameUserId(snsId);
      if (userIdCheck === false)
        return res.status(400).send({ error: "중복된 아이디 입니다" });
      await this.userServices.createLocalUserInfo(snsId, password);
      return res.status(200).send({ msg: "성공" });
    } catch (error) {
      next(error);
    }
  };

  getRepeuiredUserInfo = async (req, res, next) => {
    try {
      const snsId = res.locals.user.user.snsId;
      const representProfile = req.file.buffer;
      const { nickname, gender } = req.body;
      if (!snsId)
        return res.status(400).send({ error: "아이디 값을 받아올 수 없습니다" });
      const nicknameCheck = await this.userServices.checkIsSameNickname(nickname);
      if (nicknameCheck === false)
        return res.status(400).send({ isSameName: true, error: "중복된 닉네임 입니다" });
      await this.userServices.createUserRequiredInfo(snsId, nickname, gender, representProfile);
      return res.status(200).send({
        msg: "유저 필수 정보가 입력되었습니다.",
        snsId: res.locals.user.user.snsId,
        newtoken: res.locals.user.newToken,
      });
    } catch (error) {
      res.status(400).send({ error: "필수 정보를 모두 입력해주세요" });
      next(error);
    }
  };

  nicknameCheck = async (req, res) => {
    try {
      const { nickname } = req.body;
      const nicknameCheck = await this.userServices.checkIsSameNickname(nickname);
      if (nicknameCheck === false)
        return res.status(400).send({ isSameName: true, error: "중복된 닉네임 입니다." });
      return res.status(200).send({ isSameName: false, msg: "사용 가능한 닉네임 입니다." });
    } catch (error) {
      next(error);
    }
  };

  userIdCheck = async (req, res, next) => {
    try {
      const { snsId } = req.body;
      if (!snsId) return res.status(400).send({ error: "아이디를 입력하세요" });
      const idCheck = await this.userServices.checkIsSameUserId(snsId);
      if (idCheck === false)
        return res.status(400).send({ isSameId: true, error: "중복된 아이디입니다." });
      return res.status(200).send({ isSameId: false, msg: "사용 가능한 아이디 입니다." });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res) => {
    try {
      const { snsId, password } = req.body;
      // console.log("password-->", password);
      const userData = await this.userServices.login(snsId, password);
      res.status(200).send(userData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = userControllers;
