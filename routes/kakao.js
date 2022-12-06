const express = require("express");
const router = express.Router();

const KakaoController = require("../controllers/kakao.controller");
const kakaoController = new KakaoController();

router.get("/naver/callback", kakaoController.getNaverToken);

//
module.exports = router;
