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
// 카카오
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


  // google 구글 google 구글 google 구글
  getGoogleToken = async (code) => {
    const googleToken = await axios({
      method: "POST",
      url: `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL_LOCAL}&grant_type=authorization_code`,
      headers: { "content-type": "application/x-www-form-urlencoded" },

    });
    return googleToken.data.access_token;
  };
 

  getGoogleUserInfo = async (access_token) => {
    const userInfo = await axios({
      method: "GET",
      url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
      headers: {
        // "content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });
    return userInfo.data;
  };

}
module.exports = KakaoRepository;