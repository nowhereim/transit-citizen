const UserServices = require("../services/userServices");

class userControllers {
  constructor() {
    this.userServices = new UserServices();
  }

  // 회원가입
  localSignUpInfo = async (req, res, next) => {
    try {
      const { userId, password, confirmpassword } = req.body;
      await this.userServices.createLocalUserInfo(userId, password);
      return res.status(200).send({ msg: "성공" });
    } catch (error) {
      next(error);
    }
  };

  getRepeuiredUserInfo = async (req, res, next) => {
    try {
      const { snsId } = res.locals.user;
      const representProfile = req.file.buffer;
      const { nickname, gender } = req.body;
      await this.userServices.getUserRequiredProfile(snsId, representProfile);
      await this.userServices.createUserRequiredInfo(snsId, nickname, gender);
      res.status(200).send({ msg: "유저 필수 정보가 입력되었습니다." });
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
      if (userNicknameCheck === false) {
        return res.status(400).send({
          error: "중복된 유저입니다.",
        });
      } else {
        return res.status(200).send({
          msg: "사용 가능한 닉네임 입니다.",
        });
      }
    } catch (error) {
      res.status(400).send({
        error: "예상치 못한 에러 발생",
      });
      console.log(error.name);
      console.log(error.message);
    }
  };

  // 아이디 중복 확인
  userIdCheck = async (req, res) => {
    try {
      const { userId } = req.body;
      const userIdCheck = await this.userServices.checkIsSameUserId(userId);
      if (userIdCheck === false) {
        return res.status(400).send({
          error: "중복된 아이디입니다.",
        });
      } else {
        return res.status(200).send({
          msg: "사용 가능한 아이디 입니다.",
        });
      }
    } catch (error) {
      res.status(400).send({
        error: "예상치 못한 에러 발생",
      });
      console.log(error.name);
      console.log(error.message);
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
