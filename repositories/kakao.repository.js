const axios = require("axios");
const User = require("../schemas/user");
// const Token = require("../schemas/token");
const qs = require("qs");
require("dotenv").config();

class KakaoRepository {
  findAllUser = async () => {
    const allUser = await User.find();
    return allUser;
  };

  // findOneByEmail = async (email) => {
  //   const exUser = await User.findOne({ email });
  //   return exUser;
  // };

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
    console.log("인가>>>>>>>>>" + code + "<<<<<<코드");
    const kakaoToken = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      /* with FE
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID_FRONT,
        client_secret: process.env.CLIENT_SECRET,
        redirectUri: process.env.CALLBACK_URL_LOCAL,
        code: code,
      }),
      */
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_CLIENT_ID,
        redirectUri: process.env.CALLBACK_URL_LOCAL,
        code: code,
      }),
    });
    console.log(">>>>>>>>>" + "kakaoToken data" + "<<<<<<<<<");
    console.log(kakaoToken.data);
    console.log(">>>>>>>>>" + "kakaoToken data" + "<<<<<<<<<");

    console.log(
      "kakaoToken.data.access_token>>>>>>>>>" +
        kakaoToken.data.access_token +
        "<<<<<<<<<"
    );

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

  // getGoogleToken = async (code) => {
  //   const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL_LOCAL}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`

  //   const access_token = await axios
  // .post(url, {headers: { "content-type": "application/x-www-form-urlencoded" },})
  // .then((el) => console.log('-----------------#$#$#$-----------------'+ el)/*{ return el.data.access_token}*/)
  // .catch((err) => {console.log("err=", err)})
  // };

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
    // console.log('--------1----------');
    // console.log(googleToken);
    // return googleToken.data.access_token;
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

  // 네이버
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

  // createNewUser = async (kakaoUserInfo, allUser) => {
  //   let nickNum, nickname, _id;
  //   // DB에 유저가 하나도 없다면 초기값 세팅
  //   if (allUser.length === 0) {
  //     _id = 1;
  //     nickname = 'Agent_001';
  //   } else {
  //     // DB에 유저가 있을 경우
  //     const lastNum = allUser.slice(-1)[0].nickname; // 마지막 document 의 nickname
  //     let n = +lastNum.slice(6) + 1; // nickname 에서 Agent_ 뒷부분만 가져온 후 Number 변환
  //     // n이 1000이상이면 Agent_ 뒤에 그대로 붙이고, 1000보다 작으면 001 의 형태로 붙이기
  //     if (n < 1000) {
  //       nickNum = (0.001 * n).toFixed(3).toString().slice(2);
  //       nickname = `Agent_${nickNum}`;
  //     } else {
  //       nickname = `Agent_${n}`;
  //     }
  //     nickname = nickname;
  //   }
  //   // 위에서 만든 값으로 newUser DB 에 저장하기
  //   const newUser = await User.create({
  //     _id: +nickNum,
  //     nickname,
  //     email: kakaoUserInfo.kakao_account.email,
  //     profileImg: kakaoUserInfo.properties.thumbnail_image
  //       ? kakaoUserInfo.properties.thumbnail_image
  //       : 'default',
  //   });
  //   return newUser;
  // };
}
module.exports = KakaoRepository;
