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
      await this.userRepositories.createLocalAccount(snsId, password);
      return;
    } catch (error) {
      throw error;
    }
  };

  createUserRequiredInfo = async (snsId, nickname, gender, representProfile) => {
    try {
      const file = parser.format(".png", representProfile).content;
      await this.userRepositories.updateUserInfo(snsId, nickname, gender);
      cloudinary.v2.uploader.upload(file, async (error, result) => {
        if (error) throw new Error("이미지 업로드 불가");
        await this.userRepositories.updateRProfile(snsId, result.url);
      })
    } catch (error) {
      throw error;
    }
  }
  
  login = async (snsId, password) => {
    const userInfo = await this.userRepositories.getUserInfo(snsId);
    // console.log("userInfo-->", userInfo);

    if (!userInfo) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    const same = bcrypt.compareSync(password, userInfo.password);
    if (!same) {
      throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    const donePhoneNumber = !userInfo.phoneNumber ? false : true;

    const doneAdditionalInfo =
      !userInfo.nickname || !userInfo.representProfile ? false : true;

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
        donePhoneNumber: donePhoneNumber,
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
        donePhoneNumber: donePhoneNumber,
        doneAdditionalInfo: doneAdditionalInfo,
        message: "로그인하였습니다.",
      };
    }
  };

  checkIsSameUserId = async (snsId) => {
    try {
      const data = await this.userRepositories.findById(snsId);
      if (data !== null) return false; // 아이디 중복 O
      return;
    } catch (error) {
      throw error;
    }
  };

  checkIsSameNickname = async (nickname) => {
    try {
        const data = await this.userRepositories.findByNickname(nickname);
        if (data !== null) return false; // 닉네임 중복 O
        return;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userServices;
