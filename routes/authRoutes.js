const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/authControllers");
this.authControllers = new AuthControllers();

// 인증 메시지 보내기
router.post("/phone", authMiddleware, this.authControllers.getUserPhoneNumber);

// 인증 번호 검증
router.post(
  "/compare",
  authMiddleware,
  this.authControllers.compareAuthInputWithOurs
);

module.exports = router;
