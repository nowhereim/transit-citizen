const { default: next } = require("next");
const UserServices = require("../services/userServices");

class userControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  // 로컬 회원가입
  localSignUpInfo = async (req, res, next) => {
    try {
      const { snsId, password, confirmpassword } = req.body;
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
<<<<<<< HEAD
      const { snsId } = res.locals.user;
=======
      console.log(res.locals.user);
      const snsId = res.locals.user.user.snsId;
>>>>>>> 4f172a8 (hotfix 소셜로그인구현 및 프로필,DB연동,미들웨어 수정 및 연동)
      const representProfile = req.file.buffer;
      const { nickname, gender } = req.body;
      if (!snsId)
        return res
          .status(400)
          .send({ error: "아이디 값을 받아올 수 없습니다" });
      const userNicknameCheck = await this.userServices.checkIsSameUser(
        nickname
      );
      if (userNicknameCheck === false)
        return res.status(400).send({ error: "중복된 닉네임 입니다" });
      await this.userServices.getUserRequiredProfile(snsId, representProfile);
      await this.userServices.createUserRequiredInfo(snsId, nickname, gender);
      return res.status(200).send({ msg: "유저 필수 정보가 입력되었습니다." });
    } catch (error) {
      res.status(400).send({ error: "필수 정보를 모두 입력해주세요" });
      next(error);
    }
  };

  nicknameCheck = async (req, res) => {
    try {
      const { nickname } = req.body;
      const userNicknameCheck = await this.userServices.checkIsSameUser(
        nickname
      );
      if (userNicknameCheck === false)
        return res.status(400).send({ error: "중복된 닉네임 입니다." });
      return res.status(200).send({ msg: "사용 가능한 닉네임 입니다." });
    } catch (error) {
      next(error);
    }
  };

  // 아이디 중복 확인
  userIdCheck = async (req, res, next) => {
    try {
      const { snsId } = req.body;
      if (!snsId) return res.status(400).send({ error: "아이디를 입력하세요" });
      const userIdCheck = await this.userServices.checkIsSameUserId(snsId);
      if (userIdCheck === false)
        return res.status(400).send({ error: "중복된 아이디입니다." });
      return res.status(200).send({ msg: "사용 가능한 아이디 입니다." });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res) => {
    try {
      const { userId, password } = req.body;
      // console.log("password-->", password);
      const userData = await this.userServices.login(userId, password);
      res.status(200).send(userData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

module.exports = userControllers;
