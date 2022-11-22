const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const Token = require("../schemas/token");
require("dotenv").config();
const request = require('request-promise');

const KakaoRepository = require("../repositories/kakao.repository");

class KakaoController {
  kakaoRepository = new KakaoRepository();

  // kakaoCallback = async (req, res, next) => {
  //   //카카오 Strategy에서 성공한다면 콜백 실행
  //   // 토큰 생성 및 유저 정보 가공해서 전달하기
  //   console.log('-------------------------------------------');
  //   console.log('여기는 user-provider.js 의 kakaoCallbace!!!!!');
  //   console.log('전달받은 req.user::::::', req.user);
  //   console.log('세션 req.session::::::', req.session);
  //   const accessToken = await req.user;
  //   const decodedId = await jwtService.validateAccessToken(accessToken);

  //   console.log('------------토큰 값 및 디코딩 결과--------------');
  //   console.log('accessToken ::::::::::::', accessToken);
  //   console.log('decodeId ::::::::::::', decodedId);

  //   console.log(
  //     '--------------DB에서 유저 정보 가져와서 보낼 정보 가공 >> 로직 파일 분리 예정--------------'
  //   );
  //   const userInfo = await this.getUserInfo(decodedId, accessToken);
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Authorization', accessToken);
  //   res.status(200).redirect('/user/kakao');
  // };

  getKakaoToken = async (req, res, next) => {
    // try {
      console.log("------------------------------");
      console.log("여기는 getKakaoToken , 인가 코드 : ", req.query.code);

      const kakaoToken = await this.kakaoRepository.getKakaoToken(req.query.code);

      console.log("kakao에서 받아온 accessToken :::::::::::: ", kakaoToken);
      res.header("Access-Control-Allow-Origin", "*");
      // res.header('Authorization', kakaoToken);
      res.header("Content-Type", "text/html; charset=utf-8");

      const kakaoUserInfo = await this.kakaoRepository.getKakaoUserInfo(kakaoToken);
      console.log(kakaoUserInfo);

      const isUser = await this.kakaoRepository.findOneById(kakaoUserInfo.id);
      console.log('isUser인가요?', isUser);

      // if (!isUser.profileImage || !isUser.phoneNumber || !isUser.nickname || !isUser.gender) { const doneAdditionalForm = 'false' } else { const doneAdditionalForm = 'true' };
      const doneAdditionalInfo = (!isUser || !isUser.profileImage || !isUser.phoneNumber || !isUser.nickname || !isUser.gender) ? false : true;
      console.log('---doneAdditionalInfo--->', doneAdditionalInfo)
      // if (!isUser) {const doneAdditionalInfo = false} elseif (!isUser.profileImage || !isUser.phoneNumber || !isUser.nickname || !isUser.gender) {} 

      if (isUser) { // 기존 유저
        const token = jwt.sign({ snsId: isUser.snsId }, process.env.SECRET_KEY, { expiresIn: "24h" } );
        const refresh = await Token.findOne({ snsId: isUser.snsId });

        if (!refresh) {const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "240h",  });
          await Token.create({ snsId: isUser.snsId, refreshToken: refreshToken });
        }
        console.log(token);
        return res.send({ jwtToken: token, doneAdditionalInfo: doneAdditionalInfo, message: '로그인하였습니다.' });
    //     const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });

      } else { // 새로운 유저
        const newOne = await this.kakaoRepository.createUser(kakaoUserInfo.id);
        console.log('newOne입니다', newOne);
        const newUser = await this.kakaoRepository.findOneById(kakaoUserInfo.id);

        const token = jwt.sign({ snsId: newUser.snsId }, process.env.SECRET_KEY, { expiresIn: "24h" });
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "240h", });
        await Token.create({ snsId: newUser.snsId, refreshToken: refreshToken });

        console.log(token);        
        return res.send({ jwtToken: token, doneAdditionalInfo: doneAdditionalInfo, message: '로그인하였습니다.' });
    //     const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
      }

    // } catch (error) {
    //   res.status(400).json({ error: error.message });
    // }
  };



  getGoogleToken = async (req, res, next) => {
    try {
      console.log("------------------------------");
      console.log("여기는 getGoogleToken , 인가 코드 : ", req.query.code);

      const googleToken = await this.kakaoRepository.getGoogleToken(req.query.code);

      console.log("google에서 받아온 accessToken :::::::::::: ", googleToken);
      res.header("Access-Control-Allow-Origin", "*");
      // res.header('Authorization', kakaoToken);
      res.header("Content-Type", "text/html; charset=utf-8");

      const googleUserInfo = await this.kakaoRepository.getGoogleUserInfo(googleToken);
      console.log(googleUserInfo);

      const isUser = await this.kakaoRepository.findOneById(googleUserInfo.id);
      console.log('isUser인가요?', isUser);

      if (isUser) { // 기존 유저
        const token = jwt.sign({ snsId: isUser.snsId }, process.env.SECRET_KEY, { expiresIn: "24h" } );
        const refresh = await Token.findOne({ snsId: isUser.snsId });

        if (!refresh) {const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "240h",  });
          await Token.create({ snsId: isUser.snsId, refreshToken: refreshToken });
        }
        console.log(token);
        return res.send({ jwtToken: token, message: '로그인하였습니다.' });
    //     const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });

      } else { // 새로운 유저
        const newOne = await this.kakaoRepository.createUserGoogle(googleUserInfo.id);
        console.log('newOne입니다', newOne);
        const newUser = await this.kakaoRepository.findOneById(googleUserInfo.id);

        const token = jwt.sign({ snsId: newUser.snsId }, process.env.SECRET_KEY, { expiresIn: "24h" });
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "240h", });
        await Token.create({ snsId: newUser.snsId, refreshToken: refreshToken });

        console.log(token);        
        return res.send({ jwtToken: token, message: '로그인하였습니다.' });
    //     const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
      }

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  // getNaverToken = async (req, res, next) => {
  //   try {
  //     console.log("------------------------------");
  //     console.log("여기는 getKakaoToken , 인가 코드 : ", req.query.code);

  //     const naverToken = await this.kakaoRepository.getNaverToken(req.query.code, req.query.state);

  //     console.log("naver에서 받아온 accessToken :::::::::::: ", naverToken);
  //     res.header("Access-Control-Allow-Origin", "*");
  //     // res.header('Authorization', kakaoToken);
  //     res.header("Content-Type", "text/html; charset=utf-8");

  //     const naverUserInfo = await this.kakaoRepository.getNaverUserInfo(naverToken);
  //     console.log(naverUserInfo);

  //     const isUser = await this.kakaoRepository.findOneById(naverUserInfo.id);
  //     console.log('isUser입니다' + isUser);

  //     if (isUser) { // 기존 유저
  //       const token = jwt.sign({ snsId: isUser.snsId }, process.env.SECRET_KEY, { expiresIn: "1h" } );
  //       const refresh = await Token.findOne({ snsId: isUser.snsId });

  //       if (!refresh) {const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "24h",  });
  //         await Token.create({ snsId: isUser.snsId, refreshToken: refreshToken });
  //       }
  //       console.log(token);
  //       return res.send({ jwtToken: token });
  //   //     const expires = new Date();
  //   // expires.setMinutes(expires.getMinutes() + 600);
  //   // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });

  //     } else { // 새로운 유저
  //       const newOne = await this.kakaoRepository.createUserNaver(naverUserInfo.id);
  //       console.log('newOne입니다' + newOne);
  //       const newUser = await this.kakaoRepository.findOneById(naverUserInfo.id);

  //       const token = jwt.sign({ snsId: newUser.snsId }, process.env.SECRET_KEY, { expiresIn: "1h" });
  //       const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "24h", });
  //       await Token.create({ snsId: newUser.snsId, refreshToken: refreshToken });

  //       console.log(token);        
  //       return res.send({ jwtToken: token });
  //   //     const expires = new Date();
  //   // expires.setMinutes(expires.getMinutes() + 600);
  //   // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
  //     }

  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // };


  getNaverToken = async (req, res, next) => {
    try {  // 토큰을 발급받으려면 query string으로 넘겨야 할 정보들이다.
    const code = req.query.code;
    const state = req.query.state;
      console.log('code입니다', code);
      console.log('state입니다', state);  
  	// 로그인 API를 사용해 access token을 발급받는다.
    const naver_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&redirect_uri=${process.env.NAVER_CALLBACK_URL_LOCAL}&code=${code}&state=${state}`;
    const options = {
        url: naver_api_url,
        headers: {
          'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 
          'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
        }
    }
    const result = await request.get(options);
      console.log('result입니다', result);
  	// string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
    const token = JSON.parse(result).access_token;
      console.log('access토큰입니다', token);
      
    // 발급 받은 access token을 사용해 회원 정보 조회 API를 사용한다.
    const info_options = {
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {'Authorization': 'Bearer ' + token}
    };

      const info_result = await request.get(info_options);
      console.log('네이버유저 정보입니다1 ', info_result);
       
  	// string 형태로 값이 담기니 JSON 형식으로 parse를 해줘야 한다.
      const naverUserInfo = JSON.parse(info_result).response;
      console.log('네이버유저 정보입니다2');
      console.log(naverUserInfo);

      const isUser = await this.kakaoRepository.findOneById(naverUserInfo.id);
      console.log('isUser인가요?', isUser);

      const doneAdditionalInfo = (!isUser || !isUser.profileImage || !isUser.phoneNumber || !isUser.nickname || !isUser.gender) ? false : true;
      console.log('---doneAdditionalInfo--->', doneAdditionalInfo)

      if (isUser) { // 기존 유저
        const token = jwt.sign({ snsId: isUser.snsId }, process.env.SECRET_KEY, { expiresIn: "24h" } );
        const refresh = await Token.findOne({ snsId: isUser.snsId });

        if (!refresh) {const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "240h",  });
          await Token.create({ snsId: isUser.snsId, refreshToken: refreshToken });
        }
        console.log('jwtToken입니다', token);
        return res.send({ jwtToken: token, doneAdditionalInfo: doneAdditionalInfo, message: '로그인하였습니다.' });
    //     const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });

      } else { // 새로운 유저
        const newOne = await this.kakaoRepository.createUserNaver(naverUserInfo.id);
        console.log('newOne입니다', newOne);
        const newUser = await this.kakaoRepository.findOneById(naverUserInfo.id);

        const token = jwt.sign({ snsId: newUser.snsId }, process.env.SECRET_KEY, { expiresIn: "24h" });
        const refreshToken = jwt.sign({}, process.env.SECRET_KEY, {expiresIn: "240h", });
        await Token.create({ snsId: newUser.snsId, refreshToken: refreshToken });

        console.log('jwtToken입니다', token);        
        return res.send({ jwtToken: token, doneAdditionalInfo : doneAdditionalInfo, message: '로그인하였습니다.' });
    //     const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
      }

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  getKakaoUserInfo = async (req, res, next) => {
    /*
      1. 클라이언트에서 토큰 전달 받음
      2. 토큰으로 카카오에 유저정보 요청
      3. DB의 유저정보와 비교하여 필요시 회원가입
      4. 유저정보 가공하여 클라이언트로 전달
       */
    console.log("-------------------------------------------");
    console.log("여기는 getKakaoUserInfo!!!!!");

    const { authorization } = req.headers;
    const [authType, kakaoToken] = (authorization || "").split(" ");

    // 토큰 카카오에 보내고 유저정보 받아오기
    const kakaoUserInfo = await this.kakaoRepository.getKakaoUserInfo(
      kakaoToken
    );

    console.log("kakaoToken:::::: ", kakaoToken);
    console.log(kakaoUserInfo); // (한 유저의) 정제되지 않은 모든 데이터

    // 카카오에서서 받은 유저정보에서 이메일로 DB에 저장된 유저 확인, 존재한다면 유저정보 가져오기 (undefinded일 수도.)
    // 유저가 존재한다면 전달할 형태로 Refo에서 가공되어져서 받아옴!!
    const isUserInfo = await this.exUserGetToken(kakaoUserInfo);

    // 1. 가입한 유저 => 토큰 + 유저정보 바로 전달
    if (isUserInfo) {
      // console.log('user-route.js 4, exUserInfo:::::', exUserInfo);
      return res.status(200).json(isUserInfo);
    }
    // 2. 미가입 유저 => 회원가입 + 토큰발급 후 토큰 + 유저정보 전달
    const newUserInfo = await this.createUserToken(kakaoUserInfo);
    // console.log('user-provider.js, newUserInfo::::::', newUserInfo);
    res.header("Authorization", `Bearer ${newUserInfo.accessToken}`);
    return res.status(201).json(newUserInfo);
  };

  /*
    ===========================================================================
    */

  // DB에 유저 정보 없음 => DB 저장 / 토큰발급 / 토큰 + 유저 게임정보 리턴
  createUserToken = async (kakaoUserInfo) => {
    const allUser = await this.kakaoRepository.findAllUser();
    const newUser = await this.kakaoRepository.createNewUser(
      kakaoUserInfo,
      allUser
    );

    // 새로 생셩한 newUser에게 _id 값으로 토큰 발급
    const newUserToken = await jwtService.createAccessToken(newUser._id);

    // 클라이언트에 전달하기 위해 유저 정보 가공
    const playRecord = await this.kakaoRepository.getPlayRecord(
      newUser,
      newUserToken
    );

    return playRecord;
  };

  // getUserInfo = async (decodedId, accessToken) => {
  //   const exUser = await findOneById(decodedId);
  //   console.log('-------------------------------------------');
  //   console.log('여기는 user-provider.js 의 getUserInfo!!!!!');
  //   console.log('exUser::::::', exUser);

  //   const playRecord = await this.kakaoRepository.getPlayRecord(exUser, accessToken);
  //   return playRecord;
  // };

  exUserGetToken = async (kakaoUserInfo) => {
    // 존재하는 유저일 경우 토큰 발급하여 가져오기
    // console.log('-------------------------------------------');
    // console.log('여기는 user-provider.js 의 exUserGetToken!!!!!');

    const isUser = await this.kakaoRepository.findOneById(kakaoUserInfo._id);

    if (isUser) {
      const token = jwt.sign({ userId: isUser.userId }, process.env.SECRET_KEY);
      return token;
    } else return;

    // const exUser = await this.kakaoRepository.findOneByEmail(kakaoUserInfo.kakao_account.email);
    // // console.log('exUserGetToken 1, exUser:::::: ', exUser);

    // if (exUser) {
    //   const accessToken = await jwtService.createAccessToken(exUser._id);
    //   // console.log('exUserGetToken 2, accessToken::::::', accessToken);

    //   // const playRecord = await this.kakaoRepository.getPlayRecord(exUser, accessToken);
    //   // return playRecord;
    // } else return;
  };
}

module.exports = KakaoController;
