const express = require("express");
const router = express.Router();

const KakaoController = require("../controllers/kakao.controller");
const kakaoController = new KakaoController();

router.get("/kakao/callback", kakaoController.getKakaoToken);

router.get("/google/callback", kakaoController.getGoogleToken);

router.get("/naver/callback", kakaoController.getNaverToken);


module.exports = router;
