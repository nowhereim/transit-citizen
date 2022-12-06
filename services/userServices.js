const cloudinary = require("cloudinary");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const userRepositories = require("../repositories/userRepositories");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const Token = require("../schemas/token");
const TokenRepository = require("../repositories/token.repository");

class userServices {
  tokenRepository = new TokenRepository();

  constructor() {
    this.userRepositories = new userRepositories();
  }

  createLocalUserInfo = async (snsId, password) => {
    try {
      console.log(snsId);
      console.log("hello");
      await this.userRepositories.createLocalUserInfo_DB(snsId, password);
      return;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  createUserRequiredInfo = async (snsId, nickname, gender) => {
    try {
      await this.userRepositories.createUserInfo_DB(snsId, nickname, gender);
      return;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  };

  getUserRequiredProfile = async (snsId, representProfile) => {
    try {
      if (snsId) {
        const refile = parser.format(".png", representProfile).content;

        cloudinary.v2.uploader.upload(refile, async (error, result) => {
          if (error) {
            throw new Error("이미지 업로드 불가");
          }

          const createdUserInfoData =
            await this.userRepositories.createUserRequiredProfile_DB(
              snsId,
              result.url
            );
          return createdUserInfoData;
        });
      } else {
        throw new Error("snsId 값이 없으면 유저 정보를 조회할 수 없습니다");
      }
    } catch (error) {
      console.log(error);
    }
  };

  checkIsSameUser = async (nickname) => {
    try {
      if (nickname) {
        const data = await this.userRepositories.isSameUser_DB(nickname);
        console.log(`service ${data}`);
        if (data !== null) return false; // 닉네임 중복 O
        return;
      }
    } catch (error) {
      throw new Error("nickname이 정의되지 않았습니다");
    }
  };

  login = async (snsId, password) => {
    const userInfo = await this.userRepositories.getUserInfo(snsId);
    //   console.log("userInfo-->", userInfo);

    if (!userInfo) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    const same = bcrypt.compareSync(password, userInfo.password);
    if (!same) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    const doneAdditionalInfo =
      !userInfo.phoneNumber || !userInfo.nickname || !userInfo.gender
        ? false
        : true;

    const tokenInfo = await this.tokenRepository.getTokenInfo(snsId);

    if (!tokenInfo) {
      // 최초 로그인
      const token = jwt.sign({ snsId: snsId }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
        expiresIn: "240h",
      });
      await this.tokenRepository.createToken(snsId, token, refreshToken);

      return {
        jwtToken: token,
        doneAdditionalInfo: doneAdditionalInfo,
        message: "로그인하였습니다.",
      };
    } else {
      const token = jwt.sign({ snsId: snsId }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
        expiresIn: "240h",
      });
      await this.tokenRepository.updateToken(snsId, token, refreshToken);

      return {
        jwtToken: token,
        doneAdditionalInfo: doneAdditionalInfo,
        message: "로그인하였습니다.",
      };
    }
  };

  checkIsSameUserId = async (snsId) => {
    try {
      const data = await this.userRepositories.isSameUserId_DB(snsId);
      if (data !== null) return false; // 유저 아이디 중복 O
      return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userServices;
