const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Users } = require("../models");
const { Tokens } = require("../models");
const jwt = require("jsonwebtoken");
// const authMiddleware = require("../middlewares/authmiddleware");
require("dotenv").config();

router.get("/kakao", passport.authenticate("kakao")); // 화면을 띄워주는 부분

router.get("/kakao/callback", passport.authenticate("kakao", { session: false, failureRedirect: "/", }), // 실제 로그인
  
  async (req, res) => { // 토큰 생성 - 카카오 가입(+로그인) 완료 후 모두 이쪽으로 오게 됨.
    const snsId = req.user.snsId;
    const user = await Users.findOne({ where: { snsId } });
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
    const userinfo = { userId: user.userId, snsId: user.snsId, provider: user.provider };
    const expires = new Date();

    // console.log(token);
    expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
    
    // if (req.user.signup === true) { // 새로 가입을 한 것이라면 이곳으로.
    //   return res.redirect('/');
    // }
    // res.redirect("http://15.164.250.6:3000", {token, userinfo});
    // res.status(200).json({ token, userinfo: { userId: user.userId, snsId: user.snsId, provider: user.provider } });
    // res.status(200).json({ token });
    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, }).redirect('https://chap6-subway.vercel.app/auth/kakao/callback');
    // res.redirect('https://cheolsu.shop/');
    // res.redirect(`http://localhost:3000?token=${token}`);
  }
);

router.get("/naver", passport.authenticate("naver")); // 화면을 띄워주는 부분

router.get("/naver/callback", passport.authenticate("naver", { session: false, failureRedirect: "/", }), // 실제 로그인
  
  async (req, res) => { // 토큰 생성 - 네이버 가입(+로그인) 완료 후 모두 이쪽으로 오게 됨.
    const snsId = req.user.snsId;

    const user = await Users.findOne({ where: { snsId } });
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, { expiresIn: "20s", });
    // const expires = new Date();

    const userId = user.userId;    
    const refresh = await Tokens.findOne({ where: { userId } });

    if (!refresh) {
      const refreshtoken = jwt.sign({  }, process.env.SECRET_KEY, { expiresIn: "24h", });
      await Tokens.create({ userId, refreshtoken });
    }

    console.log(token);
    // expires.setMinutes(expires.getMinutes() + 600);
    // res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
    
    if (req.user.signup === true) {
      return res.redirect("/");
    }

    res.redirect(`http://localhost:3000?token=${token}`);
  }
);


router.get("/google", passport.authenticate("google", { scope: ["profile"] })); // 화면을 띄워주는 부분

router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/", }),
  
  async (req, res) => { // 토큰 생성 - 구글 가입(+로그인) 완료 후 모두 이쪽으로 오게 됨.
    const snsId = req.user.snsId;
    const user = await Users.findOne({ where: { snsId } });
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
    const expires = new Date();

    // console.log(token);
    expires.setMinutes(expires.getMinutes() + 600);
    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expires: expires, });
    
    if (req.user.signup === true) {
      return res.redirect("http://localhost:3000/users");
    }
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

module.exports = router