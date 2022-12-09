const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middleware");
const AuthControllers = require("../controllers/authControllers");
this.authControllers = new AuthControllers();

// 인증 메시지 보내기
router.post("/phone", this.authControllers.getUserPhoneNumber);

// 인증 번호 검증
router.post("/compare", this.authControllers.compareAuthInputWithOurs);

module.exports = router;
