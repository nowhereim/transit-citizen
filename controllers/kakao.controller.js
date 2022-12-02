const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const Token = require("../schemas/token");
require("dotenv").config();
const request = require("request-promise");

const KakaoRepository = require("../repositories/kakao.repository");

class KakaoController {
  kakaoRepository = new KakaoRepository();

  getKakaoToken = async (req, res, next) => {
    try {
      const kakaoToken = await this.kakaoRepository.getKakaoToken(
        req.query.code
      );

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Content-Type", "text/html; charset=utf-8");

      const kakaoUserInfo = await this.kakaoRepository.getKakaoUserInfo(
        kakaoToken
      );

      const isUser = await this.kakaoRepository.findOneById(kakaoUserInfo.id);

      const doneAdditionalInfo =
        !isUser || !isUser.phoneNumber || !isUser.nickname || !isUser.gender
          ? false
          : true;

      if (isUser) {
        const token = jwt.sign(
          { snsId: isUser.snsId },
          process.env.SECRET_KEY,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "240h",
        });

        await Token.updateOne(
          { snsId: isUser.snsId },
          { $set: { accessToken: token, refreshToken: refreshToken } }
        );

        return res.send({
          jwtToken: token,
          doneAdditionalInfo: doneAdditionalInfo,
          message: "로그인하였습니다.",
        });
      } else {
        const newUser = await this.kakaoRepository.createUser(kakaoUserInfo.id);

        const token = jwt.sign(
          { snsId: newUser.snsId },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "240h",
        });
        await Token.create({
          snsId: newUser.snsId,
          accessToken: token,
          refreshToken: refreshToken,
        });

        return res.send({
          jwtToken: token,
          doneAdditionalInfo: doneAdditionalInfo,
          message: "로그인하였습니다.",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getGoogleToken = async (req, res, next) => {
    try {
      const code = req.query.code;

      const googleToken = await this.kakaoRepository.getGoogleToken(code);

      const googleUserInfo = await this.kakaoRepository.getGoogleUserInfo(
        googleToken
      );

      const isUser = await this.kakaoRepository.findOneById(googleUserInfo.id);

      const doneAdditionalInfo =
        !isUser || !isUser.phoneNumber || !isUser.nickname || !isUser.gender
          ? false
          : true;

      if (isUser) {
        const token = jwt.sign(
          { snsId: isUser.snsId },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "240h",
        });

        await Token.updateOne(
          { snsId: isUser.snsId },
          { $set: { accessToken: token, refreshToken: refreshToken } }
        );

        return res.send({
          jwtToken: token,
          doneAdditionalInfo: doneAdditionalInfo,
          message: "로그인하였습니다.",
        });
      } else {
        const newUser = await this.kakaoRepository.createUserGoogle(
          googleUserInfo.id
        );

        const token = jwt.sign(
          { snsId: newUser.snsId },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "240h",
        });
        await Token.create({
          snsId: newUser.snsId,
          accessToken: token,
          refreshToken: refreshToken,
        });

        return res.send({
          jwtToken: token,
          doneAdditionalInfo: doneAdditionalInfo,
          message: "로그인하였습니다.",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getNaverToken = async (req, res, next) => {
    try {
      // 토큰을 발급받으려면 query string으로 넘겨야 할 정보들이다.
      const code = req.query.code;
      const state = req.query.state;

      // 로그인 API를 사용해 access token을 발급받는다.
      const naver_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${process.env.NAVER_CALLBACK_URL_LOCAL}&code=${code}&state=${state}`;
      const options = {
        url: naver_api_url,
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
        },
      };
      const result = await request.get(options);

      // string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
      const token = JSON.parse(result).access_token;

      // 발급 받은 access token을 사용해 회원 정보 조회 API를 사용한다.
      const info_options = {
        url: "https://openapi.naver.com/v1/nid/me",
        headers: { Authorization: "Bearer " + token },
      };

      const info_result = await request.get(info_options);

      // string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
      const naverUserInfo = JSON.parse(info_result).response;

      const isUser = await this.kakaoRepository.findOneById(naverUserInfo.id);

      const doneAdditionalInfo =
        !isUser || !isUser.phoneNumber || !isUser.nickname || !isUser.gender
          ? false
          : true;

      if (isUser) {
        const token = jwt.sign(
          { snsId: isUser.snsId },
          process.env.SECRET_KEY,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "240h",
        });

        await Token.updateOne(
          { snsId: isUser.snsId },
          { $set: { accessToken: token, refreshToken: refreshToken } }
        );

        return res.send({
          jwtToken: token,
          doneAdditionalInfo: doneAdditionalInfo,
          message: "로그인하였습니다.",
        });
      } else {
        const newUser = await this.kakaoRepository.createUserNaver(
          naverUserInfo.id
        );

        const token = jwt.sign(
          { snsId: newUser.snsId },
          process.env.SECRET_KEY,
          { expiresIn: "30s" }
        );
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {
          expiresIn: "240h",
        });
        await Token.create({
          snsId: newUser.snsId,
          accessToken: token,
          refreshToken: refreshToken,
        });

        return res.send({
          jwtToken: token,
          doneAdditionalInfo: doneAdditionalInfo,
          message: "로그인하였습니다.",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = KakaoController;
