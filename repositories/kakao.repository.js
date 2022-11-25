const axios = require("axios");
const User = require("../schemas/user");
const qs = require("qs");
require("dotenv").config();

class KakaoRepository {
  findAllUser = async () => {
    const allUser = await User.find();
    return allUser;
  };

  findOneById = async (id) => {
    const exUser = await User.findOne({ snsId: id });
    return exUser;
  };

  createUser = async (id) => {
    const newUser = await User.create({
      snsId: id,
      provider: "kakao",
    });
    return newUser;
  };

  createUserGoogle = async (id) => {
    const newUser = await User.create({
      snsId: id,
      provider: "google",
    });
    return newUser;
  };

  createUserNaver = async (id) => {
    const newUser = await User.create({
      snsId: id,
      provider: "naver",
    });
    return newUser;
  };

  getKakaoToken = async (code) => {
    const kakaoToken = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        redirectUri: process.env.CALLBACK_URL_LOCAL,
        code: code,
      }),
    });
    return kakaoToken.data.access_token;
  };

  getKakaoUserInfo = async (kakaoToken) => {
    const userInfo = await axios({
      method: "post",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        "content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${kakaoToken}`,
      },
    });
    return userInfo.data;
  };

  getGoogleToken = async (code) => {
    const googleToken = await axios({
      method: "POST",
      url: "https://oauth2.googleapis.com/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },

      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL_LOCAL,
        code: code,
      }),
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  getGoogleUserInfo = async (access_token) => {
    const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`;
    const userInfo = await axios
      .get(googleAPI, { headers: { authorization: `Bearer ${access_token}` } })
      .then((el) => {
        return el.data;
      })
      .catch((err) => {
        console.log("err=", err);
      });
  };

  getNaverToken = async (code, state) => {
    const naverToken = await axios({
      method: "POST",
      url: "https://nid.naver.com/oauth2.0/authorize",
      headers: { "content-type": "application/x-www-form-urlencoded" },

      data: qs.stringify({
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        redirectUri: process.env.NAVER_CALLBACK_URL_LOCAL,
        state: state,
        code: code,
      }),
    });
    return naverToken.data.access_token;
  };

  getNaverUserInfo = async (naverToken) => {
    const userInfo = await axios({
      method: "post",
      url: "https://openapi.naver.com/v1/nid/me",
      headers: {
        "content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${naverToken}`,
      },
    });
    return userInfo.data;
  };
}
module.exports = KakaoRepository;
